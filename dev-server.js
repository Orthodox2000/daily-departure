// Local API dev server: mounts the Vercel serverless handlers on Express so
// `npm run api` + the Vite proxy (see vite.config.ts) give a zero-CORS setup
// identical to production. Usage: npm run api  (listens on :3001)

import dotenv from 'dotenv';
import express from 'express';
import leadsHandler from './api/leads.js';

// .env.local takes priority; falls back to .env (matches Vercel conventions).
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const app = express();
app.use(express.json({ limit: '64kb' }));

app.use('/api/leads', (req, res) => leadsHandler(req, res));

const port = Number(process.env.DEV_SERVER_PORT) || 3001;
app.listen(port, () => {
  console.log(`[api] Dev server ready at http://localhost:${port}`);
});
