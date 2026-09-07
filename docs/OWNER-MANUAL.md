# Daily Departure — Owner Manual

This manual is for the person who now owns and operates the Daily Departure
platform. It explains how the system works, how to run and deploy it, how to
change content, and how to fix the things that go wrong. Read it top to bottom
once, then use the troubleshooting section when you need it.

**Companion document:** `docs/project-closeout.md` (handover record, account
inventory, known limitations).

---

## 1. What This System Is

Daily Departure is a marketing site with one job: turn visitors into enquiries.

- A visitor clicks any button anywhere (Book Now, a deal card, a search, the
  newsletter). There are 21+ such trigger points.
- Every trigger opens the same form: name, email, country code + phone, message.
  The form is pre-filled with context, e.g. "Flight Deal — IndiGo BOM to DXB •
  ₹12,499".
- Submitting posts to `/api/leads`, a server-side function that sends **two
  emails** through the SelfIAM Mailer API:
  1. **Owner notification** to your inbox (full lead detail, reply-to set to
     the customer, so hitting Reply answers them).
  2. **Customer auto-reply** to the visitor (branded, summarizes their request,
     reply-to set to your enquiries inbox).

There is no booking engine. No payments. No database. The enquiries inbox is
where the business value lands.

### Tech stack (one line each)

| Layer | What |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | lucide-react |
| Fonts | Libre Baskerville (serif) + Inter (sans) via Google Fonts |
| Backend | Vercel serverless functions in `/api` |
| Email | SelfIAM Mailer API (`https://mailer.selfiam.site/api/v1/send`) |
| Hosting | Vercel (`dailydeparture.in`) |

---

## 2. How Data Flows (read this once)

```
Any CTA ──▶ openLead(source) ──▶ LeadFormModal (single form)
                                      │  POST /api/leads
                                      ▼
                    dev-server.js (:3001)  or  Vercel function
                                      │
                                      ▼
                       api/leads.js (validates, then sends 2 emails)
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
              Owner notification                 Customer auto-reply
              (OWNER_EMAIL)                      (submitter's email)
```

Key ideas:

- **The form is the only form.** There are no other forms on the site. If you
  need a new "contact us" pathway, route it through `openLead` instead of
  building a second form.
- **The key never reaches the browser.** The SelfIAM API key and your owner
  inbox live only in server-side environment variables. This is deliberate;
  keep it that way.
- **Same-origin calls mean no CORS trouble.** In development the Vite dev
  server proxies `/api` to `dev-server.js` on port 3001 (see
  `vite.config.ts`). In production, Vercel serves the SPA and the functions on
  the same origin.

Main files you will touch as owner:

| File | Purpose |
|---|---|
| `src/data/travelData.ts` | All visible content (see section 6) |
| `src/context/LeadContext.tsx` | Form gateway: `openLead(source)` |
| `src/components/LeadFormModal.tsx` | The enquiry form and success screen |
| `api/leads.js` | Serverless handler (validation, email sends, error codes) |
| `api/emailTemplates.js` | Email HTML and subject lines |
| `src/api/client.ts` | Browser-side submit wrapper |
| `vite.config.ts` | Build + dev proxy (`/api` → `:3001`) |
| `vercel.json` | Deploy settings, rewrites, headers |
| `dev-server.js` | Local API server for development |

---

## 3. Running Locally

Prerequisites: Node.js (the project uses npm; a `bun.lock` exists but `npm` is
the path used for builds).

```bash
npm install
```

Start two terminals because the frontend and the API run separately:

```bash
# Terminal 1 — the API server (reads .env.local). MUST be on port 3001.
npm run api

# Terminal 2 — the Vite dev server.
npm run dev
```

Open **http://localhost:3000**. The Vite proxy forwards `/api/*` to
`http://localhost:3001`.

> **Port warning.** The proxy in `vite.config.ts` hardcodes `localhost:3001`.
> `DEV_SERVER_PORT` in `.env.local` defaults to 3001. If you change one without
> the other, every form submission fails with a proxy 500. Match them.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | TypeScript check only (`tsc --noEmit`), no tests |
| `npm run clean` | Deletes `dist/` and a `server.js` that no longer exists |

### First-time setup

1. Copy `.env.example` to `.env.local`.
2. Fill in at least `SELFIAM_MAILER_API_KEY` and `OWNER_EMAIL`.
3. Keep `.env.local` private. It is gitignored. Never commit it, never paste it
   in a chat, never prefix variables with `VITE_` (that would ship them to the
   browser).

### Quick smoke test without the browser

```powershell
curl.exe -sS --noproxy "*" -X POST http://127.0.0.1:3001/api/leads `
  -H "Content-Type: application/json" `
  --data '{"name":"Test User","email":"you@example.com","countryCode":"+91","phone":"+91 98765 43210","source":"Manual Test","message":"hello"}'
```

Success looks like:

```json
{"success":true,"ownerEmailId":"...","clientEmailId":"...","remaining":N}
```

Check that the owner email arrived in `OWNER_EMAIL` and the auto-reply reached
`you@example.com`.

---

## 4. Environment Variables

Server-side only. Never `VITE_`-prefixed, never committed.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SELFIAM_MAILER_API_KEY` | Yes | — | SelfIAM Mailer Bearer token (`sk_live_…`) |
| `OWNER_EMAIL` | Yes | — | Inbox that receives every enquiry notification |
| `FROM_NAME` | No | `Daily Departures` | Sender display name on both emails |
| `REPLY_TO` | No | `webenquiry@dailydeparture.in` | Reply-to on the customer auto-reply |
| `SITE_URL` | No | `https://dailydeparture.in` | Base URL for the logo inside email HTML |
| `DEV_SERVER_PORT` | No (local only) | `3001` | Port for `npm run api`; keep at 3001 |
| `SELFIAM_MAILER_BASE_URL` | No | `https://mailer.selfiam.site` | Overrides the mailer endpoint for staging |

Where each is set:

- **Vercel:** Project → Settings → Environment Variables. Applies to every
  deployment. This is what production reads.
- **Locally:** `.env.local` (loaded by `dev-server.js`; `.env` is a fallback).

> The values inside the committed `.env.example` (such as `ankitmali50@mail.com`)
> are **test placeholders only**. Live deployments read the real addresses and
> key from the Vercel environment variables, which were set at deployment time.
> No database is used; env vars + email are the whole backend.

---

## 5. Daily Operations

### Checking enquiries

Owner notifications land in `OWNER_EMAIL`. Each email carries: name, email,
phone, country code, "Regarding" (which button/page triggered it), the message,
and a UTC timestamp. The email subject is `New enquiry: <source> — <name>`.

**Reply directly from that notification.** `reply-to` is the customer's own
address, so Reply reaches them. The customer's auto-reply tells them a travel
expert will contact them; closing that loop is the actual business.

### The daily email quota (critical)

SelfIAM's free tier allows **25 emails per day**, and every enquiry consumes
**2** (owner + auto-reply). That means up to **~12 enquiries per day**. The
counter resets at UTC midnight.

- The `remaining` value in every `/api/leads` response (and Vercel function
  logs) tells you how close you are.
- When exhausted, the site returns **HTTP 429 `RATE_001`** and the user sees a
  friendly "try tomorrow or call us" message. The form still works client-side;
  the mail backend is what refuses.

If leads regularly approach 12 a day, upgrade the SelfIAM plan. That is a
dashboard change, not a code change.

### Monitoring

There is no analytics and no alerting. Watch three things manually:

1. The `OWNER_EMAIL` inbox (leads arrive here).
2. Vercel → your project → Functions → Logs for your environment (see error
   codes in section 8).
3. The `remaining` quota in those logs.

---

## 6. Editing Site Content

Everything visible (except logos and page meta) lives in
`src/data/travelData.ts`. It is a typed dataset of ~680 lines. The types at the
top of the file tell you exactly what each record needs. After editing, run
`npm run lint` to catch a missing field.

What the file holds:

| Name | What it is | Where it shows |
|---|---|---|
| `HERO_CAROUSEL_SLIDES` | Hero background images + captions | Home hero |
| `destinations` / `Destination` | Destination cards | Home |
| `FLIGHT_DEALS` / `FlightDeal` | Deal cards + visible dates/airline | Flights |
| `HOLIDAY_PACKAGES` / `HolidayPackage` | Packages with days/nights, price, rating, highlights, inclusions/exclusions, day-by-day itinerary, gallery | Home + Holidays |
| `HOTELS` / `Hotel` | Hotels/resorts with stars, amenities, room type, gallery | Hotels |
| `VISA_DESTINATIONS` / `VisaDestination` | Visa guides: fees, processing time, validity, document lists, steps | Visa |
| `TESTIMONIALS` / `Testimonial` | Reviews | Home |

**Rules of thumb**

- Every record needs a valid `id` and must satisfy its TypeScript interface.
- Image fields are URLs (most are Unsplash photo URLs) or `/images/*` paths for
  logos.
- There are no hardcoded dates anywhere; all date inputs start empty and users
  choose their own. Keep it that way so content never goes stale.
- Prices are display strings (`price`) plus an `rawPrice` number; some views use
  one, some the other, so keep them consistent.
- To change phone, email, or address, edit `Navbar.tsx`, `Footer.tsx`, and
  `ContactPage.tsx` (the values are duplicated in those three components).

### Brand assets

| File | Where it is used |
|---|---|
| `public/images/logo-small.jpeg` | Navbar, footer, favicon, form modal |
| `public/images/logo-large.jpeg` | Email template header |

The email template references the large logo by absolute URL
(`{SITE_URL}/images/logo-large.jpeg`), so `SITE_URL` must stay correct or email
images break.

---

## 7. Deploying to Vercel

`vercel.json` already configures the framework (`vite`), build command
(`npm run build`), output (`dist`), SPA rewrites, and headers. Deploys happen
on git push to the connected branch (or with the Vercel CLI if you use it).

Standard flow:

1. Commit and push changes to `main`.
2. Vercel builds and deploys; `/api` files become serverless functions
   automatically.
3. Check the deployment URL, then the production domain.

### First deploy or transferring the project

1. Import the GitHub repo on Vercel (`vercel.json` is already in place).
2. Project → Settings → Environment Variables: set `SELFIAM_MAILER_API_KEY`,
   `OWNER_EMAIL`, `FROM_NAME`, `REPLY_TO`, `SITE_URL=https://dailydeparture.in`.
3. Deploy. Frontend rewrites and `/api/leads` both come up together.

### Staging before you trust a change

Because nearly everything on the site is data or copy, a cheap staging loop is:

1. Edit `travelData.ts` and run `npm run lint`.
2. `npm run build` to confirm it compiles.
3. `npm run preview` and click through the changed pages.

---

## 8. Troubleshooting

### Error codes from `/api/leads`

| Code | HTTP | Meaning | Fix |
|---|---|---|---|
| `VAL_002` | 400 | Missing name/email/phone | Browser bug; form validation should stop this. Check the form is sending all fields |
| `VAL_003` | 400 | Email format invalid | Same; check the submitted email |
| `SRV_001` | 500 | Env config missing or unexpected server failure | Verify `SELFIAM_MAILER_API_KEY` and `OWNER_EMAIL` are set in the environment that handled the request |
| `KEY_001` / `AUTH_001` | 500 | SelfIAM rejected the API key | Key wrong, expired, or revoked. Create a new key in the SelfIAM dashboard and update both Vercel env and `.env.local` |
| `RATE_001` | 429 | Daily email quota exhausted | Wait for UTC midnight, or upgrade the SelfIAM plan |
| `SRV_002` | 502 | Both emails failed | Check SelfIAM status; check function logs for the underlying reason. Partial (one of two delivered) still returns `200` with `"partial": true` |

Success returns `200` with `ownerEmailId`, `clientEmailId`, and `remaining`.

### Common symptoms and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Submission returns proxy error / 500 in dev | Vite proxy can't reach `:3001` | `npm run api` running? `DEV_SERVER_PORT` matches the proxy target in `vite.config.ts`? |
| Owner gets email, customer doesn't (or reverse) | Partial delivery | It is logged as `partial: true`. Check the failed side's reason in Vercel logs |
| Branded auto-reply has a broken logo image | `SITE_URL` wrong or logo missing from `public/images/` | Fix env var or restore the file |
| Google fonts look wrong | CDN blocked/offline | Fallback fonts are in `src/index.css` and `index.html` |
| Changes on GitHub don't appear live | Branch not connected, or build failed | Check Vercel deployment status and build logs |
| New enquiry with same content repeatedly | Bot submissions | No rate limiting or CAPTCHA exists. Consider adding bot protection (e.g. Turnstile or Vercel WAF) before the endpoint if abuse appears |

---

## 9. Security Notes

Treat these as rules.

1. **Secrets live server-side only.** `SELFIAM_MAILER_API_KEY`, `OWNER_EMAIL`
   must never appear in `src/`, in git history, in commits, or in the browser.
2. **Never commit `.env.local`.** `.gitignore` already excludes `*.env*`,
   keeping only `.env.example`.
3. **Rotate the API key when ownership changes.** Generate a new SelfIAM key and
   update it in Vercel and `.env.local`. Old keys stay valid until revoked.
4. **The endpoint accepts public POSTs with no CAPTCHA and no limiting.** Low
   traffic makes this tolerable today; add bot protection if abuse appears
   (section 8).
5. **`vercel.json` sends `Access-Control-Allow-Origin: *`.** No secret-bearing
   endpoint is public, so this is currently safe. If you ever add a protected
   API, tighten this header.
6. **Go through `openLead` for new forms.** One entry point means one validation
   path and no accidental new channels that leak or misfire.

---

## 10. FAQ

**Why did only one of the two emails arrive?**
Partial delivery. The response has `"partial": true`. Look at the failed send in
Vercel logs; usually it is quota, a rejected address, or a SelfIAM hiccup.

**How many enquiries can I take per day?**
About 12 on the SelfIAM free tier (25 emails, 2 per enquiry). Upgrade for more.

**Where do leads get stored?**
Nowhere except email. The owner inbox is your lead database. Back it up.

**Can I sell or book flights from this site?**
No, and it is not built to. It captures enquiries; your team closes the sale off
the site.

**The site shows prices and dates that are wrong.**
Those are showcase data in `src/data/travelData.ts`. Update them by hand for
each season.

**Where is my API key stored?**
Vercel environment variables (production) and `dev-server.js` reads `.env.local`
locally. It never ships to the browser.

**How do I change the phone number on the site?**
Edit `Navbar.tsx`, `Footer.tsx`, and `ContactPage.tsx`. It is hardcoded in all
three.

---

## 11. Ownership Quick Reference

| Thing | Where |
|---|---|
| Code | GitHub: `Orthodox2000/daily-departure` |
| Live site | https://dailydeparture.in (Vercel) |
| Email sending | SelfIAM Mailer dashboard (`mailer.selfiam.site`) |
| Enquiries land in | `OWNER_EMAIL` (set in Vercel env vars; `.env.example` only holds a test placeholder) |
| Public contact email | `dailydeparture.in@gmail.com` |
| Public phone | `+91 9766 64040` |
| Address | 123, Travel Street, Andheri (E), Mumbai 400069, India |
| Content | `src/data/travelData.ts` |
| Logos | `public/images/logo-large.jpeg`, `logo-small.jpeg` |

When in doubt, start at section 8 (troubleshooting), then the closeout document
for the full inventory and known limitations.