// Vercel Serverless Function (route scaffold): POST /api/leads
// Backend implementation PENDING. For now it validates the payload shape and
// responds 501 Not Implemented so clients can detect that persistence is not
// wired up yet. CORS headers included so the endpoint can also be called from
// other origins during development.

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { name, email, countryCode, phone, source } = req.body || {};

  if (!name || !email || !phone || !source) {
    return res.status(400).json({
      error: 'Missing required fields: name, email, phone and source are required.',
    });
  }

  // TODO(backend): persist the lead (DB / CRM / notification) and return 201.
  return res.status(501).json({
    error: 'Backend not implemented yet.',
    received: { name, email, countryCode, phone, source },
  });
}
