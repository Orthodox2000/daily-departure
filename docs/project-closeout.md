# Daily Departure — Project Closeout & Handover

**Status:** Closed / Handed over
**Closeout date:** 29 August 2026
**Final build commit:** `874c4b5` ("finale", 24 August 2026)
**Repository:** https://github.com/Orthodox2000/daily-departure (`main`)
**Production URL:** https://dailydeparture.in

This document is the formal closeout record for the Daily Departure project. It
states what was delivered, where everything lives, what is and is not real, and
what the next owner must take over to keep the site running.

---

## 1. Project Summary

Daily Departure is a premium travel platform: flights, hotels, holiday
packages, and visa assistance for the Indian outbound market. The site presents
content and collects enquiries. It does not sell or book; every action funnels
into a single enquiry form, and each submission generates two emails.

**Tagline:** Explore More. Worry Less.
**Brand name:** Daily Departure (email templates use "Daily Departures").

### What was built

| Area | Delivered |
|---|---|
| Frontend | React 19 SPA, 6 pages (Home, Flights, Holidays, Hotels, Visa, Contact), state-based routing, one shared enquiry modal |
| Content | Destinations, flight deals, holiday packages with full itineraries, hotels, visa guides, testimonials, hero carousel: all in `src/data/travelData.ts` |
| Lead capture | 21+ trigger points call `openLead(source)`; a single form collects name / email / country code + phone / message |
| Email | Serverless function sends an owner notification and a branded customer auto-reply through the SelfIAM Mailer API |
| Deployment | Vercel: serverless `/api` + static SPA with SPA rewrites, worked out |

### Commit history

| Commit | Date | What it did |
|---|---|---|
| `ed66044` | 22 Aug 2026 | First commit. SPA contents and structure, original multi-modal booking flows, README |
| `ca29a4a` | 24 Aug 2026 | "email added". Replaced 5 separate booking/payment modals with one unified lead form; wrote `api/leads.js`, `api/emailTemplates.js`, `dev-server.js`, `src/api/client.ts`; added WhatsApp/phone/keys flow docs |
| `874c4b5` | 24 Aug 2026 | "finale". Final polish across SearchWidget, Contact, Holidays, footer/nav copy; README rewritten to match shipping state |

---

## 2. Final Delivered State

### Architecture

```
Browser SPA (React)  ── openLead(context) ──►  LeadFormModal (one form)
                                                    │  POST /api/leads (same-origin)
                                                    ▼
                          Vite dev proxy (:3001)  or  Vercel serverless
                                                    │
                                                    ▼
                                   api/leads.js (validate → send x2)
                                                    │
                        ┌───────────────────────────┴──────────────────────────┐
                        ▼                                                       ▼
              EMAIL 1 owner notification                       EMAIL 2 customer auto-reply
              OWNER_EMAIL, reply-to = customer                 reply-to = REPLY_TO
              (full lead detail + timestamp UTC)               (branded, request summary)
                                  │
                                  ▼
                       SelfIAM Mailer API  POST /api/v1/send
```

Security model: the SelfIAM API key and owner mailbox live only in server-side
environment variables. The browser never receives them; the frontend only posts
to same-origin `/api/leads`, so there is no CORS exposure of secrets.

### Key files

| File | Role |
|---|---|
| `src/context/LeadContext.tsx` | `LeadProvider` + `openLead(source)`; the only gateway to the form |
| `src/components/LeadFormModal.tsx` | The one enquiry modal and its success note |
| `src/api/client.ts` | `submitLead()` fetch wrapper with friendly errors |
| `api/leads.js` | Serverless handler: validation, config guard, dual email send, error-code normalization |
| `api/emailTemplates.js` | Email-safe HTML (table layout, inline CSS, escaped input), shared branded shell |
| `dev-server.js` | Local Express host for `/api/leads` on `:3001` |
| `vite.config.ts` | Vite + React + Tailwind v4; `/api` → `:3001` proxy |
| `vercel.json` | Framework/build/output, SPA rewrites, cache + CORS headers |
| `src/data/travelData.ts` | All site content (700-line typed dataset) |

---

## 3. Handover Inventory

Everything the new owner must gain or keep access to.

| Asset | Location / value | Notes |
|---|---|---|
| Source code | GitHub `Orthodox2000/daily-departure`, branch `main` | Transfer repo owner access or clone |
| Live site | `dailydeparture.in` on Vercel | Transfer Vercel team/project access |
| Domain | `dailydeparture.in` | Registrar + Vercel DNS. Confirm who holds the registrar account |
| Email sender | SelfIAM Mailer account (dashboard at `mailer.selfiam.site`) | Holds the `SELFIAM_MAILER_API_KEY` |
| Enquiries inbox | `OWNER_EMAIL` (set in Vercel env vars; configured at deployment) | This mailbox is the de-facto leads database. No DB is used by design |
| Customer-facing inbox | `REPLY_TO` → `webenquiry@dailydeparture.in` | Reply-to on customer auto-replies. Confirm it is monitored |
| Business Google account | `dailydeparture.in@gmail.com` | Public contact email. Transfer ownership |
| Public phone | `+91 9766 64040` | Hardcoded in `Navbar.tsx`, `Footer.tsx`, `ContactPage.tsx` |
| Brand assets | `public/images/logo-small.jpeg` (~126 KB), `logo-large.jpeg` (~76 KB) | Also duplicated under `assets/` from commit 1; `public/images` is the live source |

### Environment variables (server-side, never in the browser)

Set identically in Vercel (Project → Settings → Environment Variables) and in
local `.env.local`. `.env.example` is the canonical template and is committed.
**Its values are test placeholders** (e.g. `ankitmali50@mail.com`); production
reads the real addresses and keys from Vercel's environment variables, applied
at deployment. No DB is involved; all configuration is env vars + email.

| Variable | Required | In `.env.example` |
|---|---|---|
| `SELFIAM_MAILER_API_KEY` | Yes | empty (fill me) |
| `OWNER_EMAIL` | Yes | `ankitmali50@mail.com` |
| `FROM_NAME` | No | `Daily Departures` |
| `REPLY_TO` | No | `webenquiry@dailydeparture.in` |
| `SITE_URL` | No | `https://dailydeparture.in` |
| `DEV_SERVER_PORT` | No, local only | `3001` |
| `SELFIAM_MAILER_BASE_URL` | No | optional override |

`.env.local` exists on the development machine but is gitignored (`*.env*` is
ignored except `.env.example`). It was never committed.

---

## 4. What Is Real vs Simulated

The split matters for whoever owns this next.

**Real**
- All site content and visuals.
- Lead capture end to end: form → serverless → two emails delivered through SelfIAM.
- Owner notification content (exact page and offer the visitor saw).
- Vercel hosting, headers, caching, SPA routing.
- Local dev parity (`npm run api` + `npm run dev`).

**Simulated**
- Booking and payment. No reservations, no payments, no invoices, no PNRs. The
  original repo had five payment-style modals (flight/holiday/hotel/visa/
  universal); commit `ca29a4a` removed them and unified everything into the
  enquiry form by design.
- Flight dates, prices, itineraries, ratings and reviews in `travelData.ts` are
  showcase data, not live inventory from any GDS or airline API.
- Search widgets filter/contact the site; they do not query live fares or rooms.

---

## 5. Known Limitations & Technical Debt

Documented so the next owner does not rediscover them the hard way.

1. **Email quota ceiling.** SelfIAM free tier is 25 emails/day; each enquiry
   burns 2 (owner + auto-reply), so roughly **12 enquiries/day**. Resets at UTC
   midnight. The API returns `remaining`; the site correctly returns HTTP
   `429 RATE_001` when exhausted. Exceeding scale requires a paid SelfIAM tier.
2. **The inbox is the database.** Leads are not stored anywhere except email.
   There is no CRM, admin panel, spreadsheet export, or backup. If the owner
   mailbox is lost or compromised, historical leads are gone.
3. **No tests.** `npm run lint` is a TypeScript check (`tsc --noEmit`). There is
   no unit or integration test suite.
4. **No analytics or observability.** No tracking script, no Sentry, no logging
   service. Delivery failures appear only in Vercel function logs.
5. **Unused dependency.** `@google/genai` is declared in `package.json`
   (`allowScripts` reflects version `2.18.0`). Nothing imports it; it is a
   leftover from the original AI Studio scaffold (`ref/`). Safe to remove.
6. **Lockfile duplication.** Both `bun.lock` and `package-lock.json` are commit-
   ted; the project builds with `npm`.
7. **`ref/` folder.** Holds the original AI Studio / Gemini scaffold with the
   five legacy modals and a `GEMINI_API_KEY` reference. Not part of the build.
   Kept as the design reference; can be archived or deleted.
8. **Comment-stripped legacy code.** Several page files keep legacy code
   commented out rather than deleted (e.g. `ContactPage.tsx`, `HomePage.tsx`).
9. **Large logos committed twice.** `public/images/*.jpeg` (~200 KB total) are
   duplicated as committed binaries under `assets/`. Harmless, wasteful.
10. **CORS headers are open.** `vercel.json` sets `Access-Control-Allow-Origin:
    *` site-wide. Harmless because no secret-bearing endpoint is public, but
    tighter is better if third parties ever read data from this origin.
11. **External font dependency.** UI fonts (Libre Baskerville, Inter) load from
    Google Fonts CDN in `index.html`. If offline, text falls back to system
    serif/sans.

---

## 6. Risk Register (open items for the owner)

| Risk | Severity | Mitigation |
|---|---|---|
| SelfIAM free-tier quota blocks new enquiries for a day | Medium (common) | Monitor `remaining`; upgrade tier if leads approach the ceiling |
| `SELFIAM_MAILER_API_KEY` leaks or expires | High | Keep it only in Vercel env + `.env.local`; rotate on any suspicion; keys stay server-side by design |
| Owner mailbox becomes a dead end | High | Confirm `OWNER_EMAIL` is staffed; replies reach the customer via reply-to on the owner notification |
| Domain `dailydeparture.in` ownership | High | Confirm registrar account and whether DNS is on Vercel or a registrar. No fallback domain configured |
| Third-party outages (SelfIAM, Google Fonts, Unsplash images) | Medium | SPA stays up; only email or imagery degrades |
| No content freshness process | Low–Medium | Deals/prices go stale; no CI flags it. Schedule manual edits to `travelData.ts` |

---

## 7. Owner Readiness Checklist

The new owner should be able to tick every box before taking over.

- [ ] Push/pull access to the GitHub repository.
- [ ] Access to the Vercel project (and ability to change env vars).
- [ ] SelfIAM Mailer dashboard access and knowledge of the key in env.
- [ ] Control of the `dailydeparture.in` domain (registrar + DNS).
- [ ] Access to `dailydeparture.in@gmail.com` and the `OWNER_EMAIL` inbox.
- [ ] Local dev runs: `npm install`, `npm run api`, `npm run dev`.
- [ ] A lead submitted on staging reaches the owner inbox and a test mailbox.
- [ ] Awareness of the 12-enquiry/day ceiling and the `RATE_001` response.
- [ ] Reviewed this closeout and `docs/OWNER-MANUAL.md`.

---

## 8. Continuous Operation Recommendations

1. **Read the email quota** from the `remaining` field in every `/api/leads`
   success/429 response (Vercel function logs).
2. **Back up leads monthly.** Export the owner mailbox, or add a CSV/Google
   Sheets archive job. Today leads exist only in email.
3. **Refresh showcase data** in `src/data/travelData.ts` before a new season
   (prices, durations, visa fees, testimonials).
4. **Add basic observability** when budget allows: an analytics script and a
   delivery-error alert on `SRV_002`/`KEY_001` logs.
5. **Rotate secrets on handover.** Regenerate the SelfIAM key after ownership
   changes and re-set both Vercel env vars and `.env.local`.
6. Keep `.env.local` personal and never commit it; `.gitignore` already excludes
   it (`*.env*` except `.env.example`).

---

## 9. Acceptance

Project closed on **29 August 2026** at the `874c4b5` state. The system is
delivered, self-consistent, and documented. Remaining work is operational, not
developmental.

| Role | Name | Signed |
|---|---|---|
| Handed over by | | |
| Received by | | |

---

_See `docs/OWNER-MANUAL.md` for day-to-day operation. This closeout and the
manual are the living documentation of the handover._