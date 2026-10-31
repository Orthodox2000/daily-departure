// Vercel Serverless Function: /api/visitors
//   POST { visitorId }  -> registers a unique visitor for today (IST) and returns the count
//   GET                 -> returns today's count
// Counts are kept per calendar day (Asia/Kolkata) and are NEVER reset or deleted:
// every day keeps its own record and an all-time total is maintained.
//
// Storage: if Upstash Redis / Vercel KV is configured (UPSTASH_REDIS_REST_URL +
// UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL + KV_REST_API_TOKEN) counts survive
// restarts. Otherwise they live in server memory (globalThis), which persists for
// as long as the server / warm serverless instance stays alive.

const REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
const ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

function todayIST() {
  // en-CA yields YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

function memStore() {
  if (!globalThis.__dailyDepartureVisitors) {
    globalThis.__dailyDepartureVisitors = { days: new Map(), total: new Set() };
  }
  return globalThis.__dailyDepartureVisitors;
}

async function redis(commands) {
  const r = await fetch(`${REST_URL.replace(/\/+$/, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error(`Redis HTTP ${r.status}`);
  return r.json();
}

async function register(day, visitorId) {
  if (REST_URL && REST_TOKEN) {
    try {
      const key = `dd:visitors:${day}`;
      const cmds = visitorId
        ? [['SADD', key, visitorId], ['SADD', 'dd:visitors:all', visitorId], ['SCARD', key], ['SCARD', 'dd:visitors:all']]
        : [['SCARD', key], ['SCARD', 'dd:visitors:all']];
      const out = await redis(cmds);
      return { today: Number(out[out.length - 2].result) || 0, total: Number(out[out.length - 1].result) || 0 };
    } catch (err) {
      console.warn('[visitors] Redis unavailable, using memory:', err.message);
    }
  }
  const store = memStore();
  if (!store.days.has(day)) store.days.set(day, new Set());
  if (visitorId) {
    store.days.get(day).add(visitorId);
    store.total.add(visitorId);
  }
  return { today: store.days.get(day).size, total: store.total.size };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const day = todayIST();
  let visitorId = '';
  if (req.method === 'POST') {
    const id = String((req.body && req.body.visitorId) || '');
    if (ID_RE.test(id)) visitorId = id;
  }

  try {
    const counts = await register(day, visitorId);
    return res.status(200).json({ success: true, date: day, today: counts.today, total: counts.total });
  } catch (err) {
    console.error('[visitors] error:', err);
    return res.status(500).json({ success: false, error: 'Counter unavailable.' });
  }
}
