// Email HTML templates for Daily Departure.
// Email-client safe: table-based layout, inline CSS only, no external stylesheets,
// no scripts, images referenced by absolute URL (kept small - logo is ~75KB JPEG).
// All user-supplied content is HTML-escaped before interpolation.

const MAROON = '#800020';
const NAVY = '#1a2b48';
const CREAM = '#f5f1ea';
const BORDER = '#e6e2da';
const MUTED = '#6b7280';

const SITE_URL = (process.env.SITE_URL || 'https://dailydeparture.in').replace(/\/+$/, '');
const LOGO_URL = `${SITE_URL}/images/logo-large.jpeg`;
const REPLY_TO = process.env.REPLY_TO || 'webenquiry@dailydeparture.in';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Wraps page content in the shared branded shell (header logo + navy footer). */
function shell({ title, preheader, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${CREAM};font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${CREAM};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BORDER};">
<tr><td align="center" style="background-color:#ffffff;padding:22px 32px 16px;">
  <img src="${LOGO_URL}" width="170" alt="Daily Departures" style="display:block;width:170px;height:auto;border:0;">
</td></tr>
<tr><td height="3" style="background-color:${MAROON};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:30px 36px 8px;font-size:20px;line-height:28px;font-weight:bold;color:${NAVY};">${escapeHtml(title)}</td></tr>
${bodyHtml}
<tr><td style="padding:26px 36px 34px;color:${MUTED};font-size:11px;line-height:17px;text-align:center;border-top:1px solid ${BORDER};margin-top:18px;">
  <strong style="color:${NAVY};">Daily Departures</strong> &mdash; Flights &bull; Hotels &bull; Holidays &bull; Visa Assistance<br>
  Questions? Write to <a href="mailto:${REPLY_TO}" style="color:${MAROON};text-decoration:none;">${REPLY_TO}</a> and our team will get back to you.<br>
  &copy; ${new Date().getFullYear()} Daily Departures. All rights reserved.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** Auto-reply sent to the customer who submitted any form on the site. */
export function clientEmailHtml({ name, source, phone, message }) {
  const firstName = String(name || 'there').trim().split(/\s+/)[0] || 'there';
  const rows = [
    ['Regarding', source],
    ['Your number', phone],
    message ? ['Your message', message] : null,
  ].filter(Boolean);

  const detailsRows = rows
    .map(
      ([label, value]) => `<tr>
  <td style="padding:9px 14px;color:${MUTED};font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.4px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
  <td style="padding:9px 14px;color:${NAVY};font-size:13px;line-height:19px;">${escapeHtml(value)}</td>
</tr>`
    )
    .join('\n');

  const bodyHtml = `<tr><td style="padding:0 36px;">
  <p style="margin:0 0 14px;color:#374151;font-size:14px;line-height:22px;">Hi <strong>${escapeHtml(firstName)}</strong>,</p>
  <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:22px;">
    Thank you for reaching out to <strong>Daily Departures</strong>. We have received your request and one of our
    travel experts will contact you shortly with the best options tailored for you.
  </p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;overflow:hidden;margin-bottom:20px;">
    <tr><td colspan="2" style="padding:11px 14px;background-color:${CREAM};color:${NAVY};font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid ${BORDER};">Your request summary</td></tr>
${detailsRows}
  </table>
  <p style="margin:0 0 6px;color:#374151;font-size:14px;line-height:22px;">Meanwhile, feel free to explore our latest flight deals, holiday packages and hotel offers on our website.</p>
  <p style="margin:0;color:${NAVY};font-size:14px;line-height:22px;font-weight:bold;">Warm regards,<br>The Daily Departures Team</p>
</td></tr>`;

  return shell({
    title: 'We have received your request!',
    preheader: `Thanks ${firstName}! Our travel expert will contact you shortly.`,
    bodyHtml,
  });
}

/** Plain-text fallback of the customer auto-reply. */
export function clientEmailText({ name, source, phone, message }) {
  return [
    `Hi ${String(name || 'there').trim()},`,
    '',
    'Thank you for reaching out to Daily Departures. We have received your request and one of our travel experts will contact you shortly.',
    '',
    'Your request summary:',
    `- Regarding: ${source}`,
    `- Your number: ${phone}`,
    message ? `- Your message: ${message}` : null,
    '',
    `Questions? Write to ${REPLY_TO}.`,
    `© ${new Date().getFullYear()} Daily Departures. All rights reserved.`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

/** Internal notification sent to the owner inbox with the full lead details. */
export function ownerEmailHtml(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', `<a href="mailto:${escapeHtml(lead.email)}" style="color:${MAROON};">${escapeHtml(lead.email)}</a>`],
    ['Phone', escapeHtml(lead.phone)],
    ['Country code', escapeHtml(lead.countryCode || '-')],
    ['Regarding', escapeHtml(lead.source)],
    ['Message', lead.message ? escapeHtml(lead.message) : '<span style="color:#9ca3af;">—</span>'],
    ['Received (UTC)', new Date().toISOString().replace('T', ' ').slice(0, 19)],
  ];

  const bodyHtml = `<tr><td style="padding:0 36px;">
  <p style="margin:0 0 18px;color:#374151;font-size:14px;line-height:22px;">A new enquiry was submitted on the website.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;overflow:hidden;">
${rows
  .map(
    ([label, value]) => `<tr>
  <td width="130" style="padding:9px 14px;color:${MUTED};font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.4px;vertical-align:top;background-color:#fafaf7;border-bottom:1px solid ${BORDER};white-space:nowrap;">${escapeHtml(label)}</td>
  <td style="padding:9px 14px;color:${NAVY};font-size:13px;line-height:19px;border-bottom:1px solid ${BORDER};word-break:break-word;">${value}</td>
</tr>`
  )
  .join('\n')}
  </table>
  <p style="margin:18px 0 0;color:${MUTED};font-size:12px;line-height:18px;">Reply directly to this email to respond to the customer.</p>
</td></tr>`;

  return shell({
    title: `New enquiry — ${lead.name}`,
    preheader: `${lead.source} • ${lead.phone}`,
    bodyHtml,
  });
}

/** Subject lines for both emails. */
export function ownerEmailSubject(lead) {
  const cleanSource = String(lead.source || 'Website enquiry').replace(/\s+/g, ' ').trim();
  return `New enquiry: ${cleanSource} — ${lead.name}`;
}

export function clientEmailSubject(name) {
  const firstName = String(name || '').trim().split(/\s+/)[0] || '';
  return firstName ? `Thank you, ${firstName}! We have received your request` : 'Thank you! We have received your request';
}
