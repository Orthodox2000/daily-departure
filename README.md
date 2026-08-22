# Daily Departure ✈️

**Explore More. Worry Less.**

A premium travel platform for booking flights, hotels, holiday packages, and visa assistance.
Built as a fast, fully client-side React SPA with a lead-capture system that is backend-ready.

---

## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| UI         | React 19 + TypeScript                       |
| Build tool | Vite 6                                      |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)       |
| Icons      | lucide-react                                |
| Fonts      | Libre Baskerville (serif) + Inter (sans)    |
| Hosting    | Vercel (static SPA + serverless API routes) |

---

## Features

### Pages
- **Home** – auto-rotating hero carousel (images pulled from curated packages), centered hero copy,
  overlapping multi-tab search widget (Flights / Hotels / Holidays / Visa), popular destinations,
  featured packages, "Why Choose Us", traveler testimonials and a CTA strip.
- **Flights / Hotels / Holidays / Visa** – listing pages with filters and detail flows.
- **Contact** – office info, contact form and map section.

### Unified Lead Form (all actions funnel here)
Every booking button, inquiry modal and newsletter subscribe across the site is routed to **one
common request-callback form** that collects:

- Full name
- Email address
- Mobile number **with country code** (dropdown)
- Message – **auto-filled** with the context of the button/modal that triggered it
  (e.g. `Flight Booking - IndiGo BOM to DXB (₹24,999)`)

Implementation:
- `src/context/LeadContext.tsx` – app-wide provider exposing `openLead(source)`.
- `src/components/LeadFormModal.tsx` – the unified form UI (+ success note).
- **No data is submitted anywhere yet.** `src/api/client.ts` stubs the network call so the UX works
  end-to-end while the backend is built.

### Backend-Ready API Scaffold
- `api/leads.js` – Vercel serverless function scaffold at **POST `/api/leads`** with CORS headers,
  payload validation and a `501 Not Implemented` response until persistence is written.
  To enable real submissions later:
  1. Implement persistence in `api/leads.js` (DB / CRM / notification).
  2. Uncomment the `fetch(LEADS_ENDPOINT, ...)` block in `src/api/client.ts`.

### Brand Assets
- `public/images/logo-small.jpeg` – compact logo mark (navbar, footer, favicon).
- `public/images/logo-large.jpeg` – large logo variant without company text.
- Originals live in `assets/`; web-friendly copies are served from `public/images/`.

---

## Project Structure

```
├── api/
│   └── leads.js              # Serverless route scaffold (backend pending)
├── public/images/            # Logos & static images served at /images/*
├── src/
│   ├── api/client.ts         # Lead submission client (stubbed fetch)
│   ├── components/           # Navbar, Footer, modals, SearchWidget, LeadFormModal…
│   ├── context/              # LeadContext (unified lead form provider)
│   ├── data/travelData.ts    # All travel content & types
│   └── pages/                # Home, Flights, Holidays, Hotels, Visa, Contact
├── index.html                # Favicon + fonts + meta tags
├── vercel.json               # SPA rewrites + CORS/cache headers
└── vite.config.ts            # Vite + React + Tailwind v4
```

---

## Getting Started

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:3000
npm run build   # production build → dist/
npm run preview # preview the production build locally
npm run lint    # typecheck (tsc --noEmit)
```

## Environment Variables

**None required.** See `.env.example`. If you later add APIs, define them prefixed with `VITE_`
in `.env.local` (never committed).

---

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import it on [Vercel](https://vercel.com) – settings are pre-configured in `vercel.json`
   (framework: Vite, build: `npm run build`, output: `dist`).

### CORS / Routing configuration (`vercel.json`)
| Setting | Purpose |
|---|---|
| `rewrites: /(.*) → /index.html` | SPA fallback – deep links never 404 (static files are served first). |
| `Access-Control-Allow-Origin: *` | All responses are readable cross-origin (useful while the frontend/API are developed separately). |
| `Allow-Methods / Allow-Headers` | GET, HEAD, OPTIONS + JSON/Authorization headers. |
| Cache headers | Immutable long-cache for hashed `/assets/*`, daily cache for `/images/*`. |
| `X-Content-Type-Options` | Basic hardening against MIME sniffing. |

The app itself is fully client-side (only Unsplash imagery via plain `<img>` tags, which do not
require CORS), so no proxying or extra config is needed for the current feature set.

---

## Notes

- Unused legacy code is intentionally **commented out rather than deleted** for reference.
- `ref/` contains the reference homepage/footer design that the current Home page and Footer were synced from.
- Booking/payment flows are simulated; all requests funnel into the unified lead form.
