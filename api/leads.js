// Vercel Serverless Function: POST /api/leads
// Receives a lead from any form on the site and sends TWO emails through the
// SelfIAM Mailer API (https://mailer.selfiam.site/api/v1/send):
//   1. Owner notification  -> OWNER_EMAIL (static, from env) with full details.
//   2. Client auto-reply   -> the submitter's email, branded HTML template.
// All configuration (API key, owner inbox, sender name, reply-to, site URL)
// lives in environment variables - nothing sensitive reaches the browser.
// Same-origin calls mean no CORS issues; OPTIONS is still handled for safety.

import {
  clientEmailHtml,
  clientEmailText,
  clientEmailSubject,
  ownerEmailHtml,
  ownerEmailSubject,
} from './emailTemplates.js';

const MAILER_BASE = (process.env.SELFIAM_MAILER_BASE_URL || 'https://mailer.selfiam.site').replace(/\/+$/, '');
const FROM_NAME = process.env.FROM_NAME || 'Daily Departures';
const MAX_MESSAGE_LENGTH = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/** Calls SelfIAM Mailer POST /api/v1/send and normalizes the result. */
async function sendViaSelfiam({ apiKey, to, subject, body, html, fromName, replyTo }) {
  const response = await fetch(`${MAILER_BASE}/api/v1/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      subject,
      body,
      ...(html ? { html } : {}),
      from_name: fromName,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    // Non-JSON body (e.g. gateway error page) - fall through with empty data.
  }

  return { ok: response.ok && data.success !== false, status: response.status, code: data.code || null, error: data.error || null, emailId: data.emailId || null, remaining: typeof data.remaining === 'number' ? data.remaining : null };
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.SELFIAM_MAILER_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const replyTo = process.env.REPLY_TO || 'webenquiry@dailydepartures.in';

  if (!apiKey || !ownerEmail) {
    console.error('[leads] Missing env config: SELFIAM_MAILER_API_KEY / OWNER_EMAIL');
    return res.status(500).json({
      success: false,
      code: 'SRV_001',
      error: 'Email service is not configured. Please try again later.',
    });
  }

  const raw = req.body || {};
  const name = String(raw.name || '').trim().slice(0, 120);
  const email = String(raw.email || '').trim().slice(0, 254);
  const countryCode = String(raw.countryCode || '').trim().slice(0, 8);
  const phone = String(raw.phone || '').trim().slice(0, 24);
  const source = String(raw.source || 'Website enquiry').trim().slice(0, 200);
  const message = String(raw.message || '').trim().slice(0, MAX_MESSAGE_LENGTH);

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      code: 'VAL_002',
      error: 'Missing required fields: name, email and phone are required.',
    });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({
      success: false,
      code: 'VAL_003',
      error: 'Please provide a valid email address.',
    });
  }

  const lead = { name, email, countryCode, phone, source, message };

  const results = { owner: null, client: null };

  try {
    // Email 1: owner notification (reply-to = customer, so "Reply" targets them).
    results.owner = await sendViaSelfiam({
      apiKey,
      to: ownerEmail,
      subject: ownerEmailSubject(lead),
      body: `New enquiry on Daily Departures\n\nName: ${name}\nEmail: ${email}\nPhone: ${countryCode ? `${countryCode} ` : ''}${phone}\nRegarding: ${source}\nMessage: ${message || '-'}\n`,
      html: ownerEmailHtml(lead),
      fromName: FROM_NAME,
      replyTo: email,
    });

    // Email 2: branded auto-reply confirmation to the customer.
    results.client = await sendViaSelfiam({
      apiKey,
      to: email,
      subject: clientEmailSubject(name),
      body: clientEmailText(lead),
      html: clientEmailHtml(lead),
      fromName: FROM_NAME,
      replyTo,
    });
  } catch (err) {
    console.error('[leads] Unexpected error while sending:', err);
    return res.status(500).json({
      success: false,
      code: 'SRV_001',
      error: 'We could not process your request right now. Please try again.',
    });
  }

  const rateLimited =
    (results.owner?.code === 'RATE_001' || results.client?.code === 'RATE_001');

  if (rateLimited) {
    console.warn('[leads] SelfIAM daily rate limit reached (RATE_001)');
    return res.status(429).json({
      success: false,
      code: 'RATE_001',
      error: 'Our enquiry inbox has reached its daily limit. Please try again tomorrow or call us directly.',
      remaining: results.owner?.remaining ?? results.client?.remaining ?? null,
    });
  }

  const authFailed =
    [results.owner, results.client].some(
      (r) => r && !r.ok && ['AUTH_001', 'KEY_001'].includes(r.code)
    );

  if (authFailed) {
    console.error('[leads] SelfIAM rejected the API key:', results);
    return res.status(500).json({
      success: false,
      code: 'KEY_001',
      error: 'Email service authentication failed. Please contact support.',
    });
  }

  const ownerOk = Boolean(results.owner?.ok);
  const clientOk = Boolean(results.client?.ok);

  if (!ownerOk && !clientOk) {
    console.error('[leads] Both emails failed:', results);
    return res.status(502).json({
      success: false,
      code: 'SRV_002',
      error: 'Your request could not be delivered. Please try again shortly.',
    });
  }

  if (!ownerOk || !clientOk) {
    // Lead was captured by at least one mailbox - accept it but flag partial delivery.
    console.warn('[leads] Partial delivery:', JSON.stringify(results));
    return res.status(200).json({
      success: true,
      partial: true,
      ownerEmailId: results.owner?.emailId || null,
      clientEmailId: results.client?.emailId || null,
      remaining: results.owner?.remaining ?? results.client?.remaining ?? null,
      message: 'Request received.',
    });
  }

  return res.status(200).json({
    success: true,
    ownerEmailId: results.owner.emailId,
    clientEmailId: results.client.emailId,
    remaining: results.owner.remaining ?? results.client.remaining,
    message: 'Enquiry received. A travel expert will contact you shortly.',
  });
}
