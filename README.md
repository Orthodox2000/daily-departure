# Daily Departure ✈️

**Explore More. Worry Less.**

A premium travel platform for flights, hotels, holiday packages and visa assistance.
React SPA frontend + Vercel serverless backend, with automated email notifications
powered by the **SelfIAM Mailer API**.

**Live:** https://dailydeparture.in

**Owner docs:** [`docs/OWNER-MANUAL.md`](docs/OWNER-MANUAL.md) (day-to-day
operation) · [`docs/project-closeout.md`](docs/project-closeout.md) (closeout
& handover record)

---

## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| UI         | React 19 + TypeScript                       |
| Build tool | Vite 6                                      |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)       |
| Icons      | lucide-react                                |
| Fonts      | Libre Baskerville (serif) + Inter (sans)    |
| Backend    | Vercel Serverless Functions (`/api`)        |
| Email      | SelfIAM Mailer REST API (`mailer.selfiam.site/api/v1`) |
| Hosting    | Vercel                                      |

---

## Architecture Overview

```
┌─────────────────────────── Browser (SPA) ───────────────────────────┐
│                                                                     │
│  Any CTA on any page ──► openLead(contextString)                    │
│  (21 touchpoints)        src/context/LeadContext.tsx                │
│                                   │                                 │
│                          ONE unified form                           │
│                          LeadFormModal.tsx                          │
│                        name/email/phone/message                     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ POST /api/leads   (same-origin, no CORS)
                     ┌──────────▼──────────┐
                     │  Vite dev proxy or  │
                     │  Vercel serverless  │
                     └──────────┬──────────┘
                                │
              ┌─────────────────▼──────────────────┐
              │  api/leads.js  (+ emailTemplates)  │
              │  validates → builds HTML → sends   │
              └───────┬───────────────────┬────────┘
                      │                   │
         ┌────────────▼─────┐   ┌─────────▼─────────────┐
         │ EMAIL 1: OWNER   │   │ EMAIL 2: CUSTOMER     │
         │ OWNER_EMAIL      │   │ Branded auto-reply    │
         │ full lead detail │   │ logo + request summary│
         │ reply-to=customer│   │ reply-to=REPLY_TO     │
         └──────────────────┘   └───────────────────────┘
                Both via SelfIAM Mailer  POST /api/v1/send
```

**Security model:** the SelfIAM API key lives ONLY in server-side environment
variables. The browser never sees it — it talks to same-origin `/api/leads`.

---

## Unified Enquiry Flow (single form site-wide)

Every button/modal/newsletter on the site calls `openLead(source)` from
`LeadContext`. There are **no other forms** — one modal collects
name / email / country-code+phone / message, then submits once.

### All trigger points (context string sent to owner email)

| Page | Trigger | Context string |
|---|---|---|
| Navbar | Book Now (desktop/mobile drawer) | `<Service> Booking — General Enquiry` |
| Home | Destination card | `Destination Enquiry — <name>, <country> • <duration> • <price>` |
| Home | Featured package card / View Details | `Holiday Package — <title> (<duration>) • <price>` |
| Home | "Plan My Vacation" CTA | `Holiday Package — Plan My Vacation` |
| Home hero | Search widget submit | navigates to the matching page (toast) |
| Flights | Search Flights | `Flight Search — <from> to <to> • <date\|flexible dates> • <pax/class>` |
| Flights | View All | `Flights Enquiry — All Deals` |
| Flights | Deal card | `Flight Deal — <airline> <fromCode> to <toCode> • <price>` |
| Flights | Deals newsletter strip | `Flight Deals Newsletter - <email>` |
| Holidays | Search Holidays | `Holiday Search — <dest> • <pax> • Departing <range\|Anytime> • <duration>` |
| Holidays | Package card | `Holiday Package — <title> (<duration>) • <price>` |
| Holidays | "Start My Holiday Plan" card | `Holiday Enquiry — <dest> • <pax> • Departing <range>` |
| Hotels | Search Hotels | `Hotel Search — <dest> • <check-in> to <check-out> • <guests>` |
| Hotels | Hotel card / View Details | `Hotel Enquiry — <hotel>, <location> • <price>/night` |
| Visa | Check Visa Requirements | `Visa Assistance — <country> • Traveling from <from> • <purpose>` |
| Visa | View All | `Visa Assistance — All Destinations` |
| Visa | Destination card | `Visa Assistance — <country> (<title>)` |
| Contact | Get in Touch form | `Contact Us - <subject>\|"<message>"` |
| Footer | Newsletter subscribe | `Newsletter Subscription - <email>` |

**Dates are never hardcoded anywhere** — all date inputs start empty; users pick
their own dates (Holidays search supports an optional From→To range).

---

## Email System

### Endpoints used
- `POST https://mailer.selfiam.site/api/v1/send` — Bearer-token auth, JSON body
  (`to`, `subject`, `body`, optional `html`, `from_name`, `reply_to`).

### Files
| File | Purpose |
|---|---|
| `api/leads.js` | Serverless handler: CORS/OPTIONS, validation (`VAL_002`, `VAL_003`), config guard, sends both emails, normalizes SelfIAM error codes (`RATE_001`, `KEY_001`, `SRV_002`…), partial-delivery handling. |
| `api/emailTemplates.js` | Email-client-safe HTML (table layout, inline CSS, HTML-escaped user input). Shared branded shell: white header band + logo, maroon accent bar, navy footer with `REPLY_TO` link. Logo referenced by absolute URL (`SITE_URL/images/logo-large.jpeg`, ~75 KB JPEG — URL-referenced, not attached). |
| `src/api/client.ts` | Frontend fetch wrapper; throws friendly errors parsed from the API response. |
| `dev-server.js` | Express app mounting `api/leads.js` locally with dotenv (`.env.local` first). |

### Delivery rules
1. **Owner notification** → `OWNER_EMAIL`; subject `New enquiry: <source> — <name>`;
   details table (name/email/phone/country/regarding/message/timestamp UTC);
   **reply-to = customer's own address** (hit Reply to answer them).
2. **Customer auto-reply** → submitter; subject `Thank you, <first name>! …`;
   branded template with their request summary; **reply-to = `REPLY_TO`**.

If at least one email is delivered the lead counts as received (`200`,
`partial: true` flag); if both fail → `502 SRV_002`. Rate-limit hits return
`429 RATE_001` with a friendly message.

### Rate limits
SelfIAM default quota is **25 emails/day** and each enquiry consumes **2**
(owner + auto-reply) ⇒ roughly **12 enquiries/day** on the free tier.
Resets midnight UTC. Watch `remaining` in the API response / logs.

---

## Environment Variables

Server-side only — **never** prefix these with `VITE_` and never commit `.env.local`.

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `SELFIAM_MAILER_API_KEY` | ✅ | `sk_live_…` | SelfIAM Mailer API key (Bearer token) |
| `OWNER_EMAIL` | ✅ | `owner@example.com` | Inbox receiving every enquiry |
| `FROM_NAME` | – | `Daily Departures` | Sender display name on both emails |
| `REPLY_TO` | – | `webenquiry@dailydeparture.in` | Reply-To on the customer auto-reply |
| `SITE_URL` | – | `https://dailydeparture.in` | Builds absolute logo URLs inside email HTML |
| `DEV_SERVER_PORT` | – | `3001` | Port for local `npm run api` (**must stay 3001** — matches the Vite proxy) |

See `.env.example` as the canonical reference. Locally copy it to `.env.local`
and fill in values.

---

## Project Structure

```
├── api/
│   ├── leads.js               # POST /api/leads — validation + 2 emails via SelfIAM
│   └── emailTemplates.js      # Owner + branded customer HTML templates
├── public/images/             # Logos (logo-small/large.jpeg) served at /images/*
├── src/
│   ├── api/client.ts          # submitLead() → POST /api/leads (real fetch)
│   ├── components/
│   │   ├── LeadFormModal.tsx  # THE single enquiry form ("Get More Info") + success note
│   │   ├── Navbar.tsx         # Nav + mobile drawer (phone, Book Now)
│   │   ├── Footer.tsx         # Links, contact info, newsletter → openLead()
│   │   ├── SearchWidget.tsx   # Hero multi-tab search (dates user-selected)
│   │   └── Toast.tsx          # Global toast (z-[100], above modals)
│   ├── context/LeadContext.tsx# openLead(source) provider — the only form gateway
│   ├── data/travelData.ts     # All content & types (flights/hotels/packages/visas)
│   ├── pages/                 # Home, Flights, Holidays, Hotels, Visa, Contact
│   ├── App.tsx                # AppShell: routing state + openLead wiring
│   └── main.tsx / index.css   # Bootstrap + Tailwind theme tokens
├── dev-server.js              # Local Express host for /api/leads (:3001)
├── vite.config.ts             # React/Tailwind plugins + /api → :3001 dev proxy
├── vercel.json                # SPA rewrites + /api functions + headers
└── .env.example               # Canonical env var list
```

---

## Getting Started (local development)

```bash
npm install

# Terminal 1 — API server (loads .env.local), MUST be :3001
npm run api

# Terminal 2 — Vite dev server with /api proxy
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build → dist/
npm run preview      # preview production build
npm run lint         # typecheck (tsc --noEmit)
```

> **Port note:** the Vite proxy forwards `/api/*` to `http://localhost:3001`.
> If `DEV_SERVER_PORT` is changed, update `vite.config.ts` too — otherwise every
> submission fails with a proxy 500.

### Quick test without the browser

```powershell
curl.exe -sS --noproxy "*" -X POST http://127.0.0.1:3001/api/leads `
  -H "Content-Type: application/json" `
  --data '{"name":"Test User","email":"you@example.com","countryCode":"+91","phone":"+91 98765 43210","source":"Manual Test","message":"hello"}'
```

Expected: `{"success":true,"ownerEmailId":"…","clientEmailId":"…","remaining":N}`.

---

## Deploying to Vercel

1. Push to Git and import the repo on [Vercel](https://vercel.com)
   (`vercel.json` already sets framework/build/output).
2. **Project → Settings → Environment Variables** — add:
   `SELFIAM_MAILER_API_KEY`, `OWNER_EMAIL`, `FROM_NAME`, `REPLY_TO`,
   `SITE_URL=https://dailydeparture.in`.
3. Redeploy. `/api/leads` deploys automatically as a serverless function;
   the SPA rewrite serves the frontend.

### Response codes you may see in production

| Code | HTTP | Meaning |
|---|---|---|
| `VAL_002` | 400 | Missing name/email/phone |
| `VAL_003` | 400 | Invalid email format |
| `SRV_001` | 500 | Env config missing / unexpected failure |
| `KEY_001` | 500 | SelfIAM rejected the API key |
| `RATE_001` | 429 | Daily email quota exhausted (try after UTC midnight) |
| `SRV_002` | 502 | Both emails failed delivery |

Success returns `200` with `ownerEmailId`, `clientEmailId`, `remaining`
(and `partial: true` if only one mailbox got through).

---

## Brand Assets & Contact Details

- `public/images/logo-small.jpeg` — navbar, footer, favicon, form header.
- `public/images/logo-large.jpeg` — large variant; used in email templates.
- Phone: **+91 9766 64040** · Email: **dailydeparture.in@gmail.com**
- Address: 123, Travel Street, Andheri (E), Mumbai, Maharashtra 400069, India
- Domain: **dailydeparture.in**

---

## Notes

- Booking/payment flows are simulated — everything funnels into the unified
  enquiry form by design (one form, zero chained modals).
- Unused legacy code is intentionally commented out rather than deleted.
- `ref/` holds the original design reference synced into Home/Footer.
