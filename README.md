# تعلّم مع مريانا — Learn with Mariana

**Name:** Mary Saab
**Course:** Full Stack Development — Final Project 2026
**Live URL:** _add your Vercel URL here after deploying_
**Repository:** https://github.com/MarySaab/Learn-Arabic-the-Fun-way

A private Arabic-tutoring site. A visitor reads about the teacher (Mariana), takes
a short **placement test**, gets a **recommended level highlighted on a learning-
journey timeline**, and **books a session**. Arabic-first (`dir="rtl" lang="ar"`)
with a button that reveals English glosses in parentheses for foreign learners.

## Custom UI requirement
> **"Create a timeline-style section using Flexbox or Grid."**

Implemented as the **Learning Journey** on the home page: eight stages (Letters →
Mastery) laid out as a horizontal Flexbox track on desktop and a vertical "road"
on mobile, correct in RTL. It is **not decorative** — when a visitor finishes the
placement test, their recommended level is **highlighted on this same timeline**
with a glowing gold "أنت هنا (You are here)" marker. Marked in the code with:
`{/* Custom requirement: Timeline section using CSS Grid/Flexbox */}`
(see [`src/components/Timeline.js`](src/components/Timeline.js)).

## Tech
- **Next.js (App Router)** + React — deploys on Vercel
- **Hand-written CSS3** (CSS Modules + design tokens in `globals.css`) for the
  whole site; **Bootstrap 5** (CDN) is used for the layout, cards, forms and
  pagination on the **`/facts`** page
- Core logic in **ES6 classes**: `PlacementTest`, `LessonCatalog`, `ApiClient`,
  `AudioPlayer`, `Speaker`, `FormValidator`, plus `ScrollReveal`
- **Prisma + Neon (PostgreSQL)** for placement results and bookings
- **APIs used:** two [API Ninjas](https://api-ninjas.com) endpoints, both called
  **server-side** so the key never reaches the browser — **Facts** (the "هل تعلم؟"
  card + the `/facts` explorer) and **Dictionary** (the English-word lookup on
  `/facts`); the daily Arabic quote is a curated local list

## Pages
| Route | What it does |
|-------|--------------|
| `/` | Hero, bilingual intro, Meet Mariana, the **timeline**, daily quote + **API fact card** (API Ninjas, paged), FAQ, contact |
| `/test` | 16-question placement test in 4 sections (reading, writing, **dictation with audio**, grammar) → overall + per-skill levels (A/B/C/D) highlighted on the timeline |
| `/lessons` | 34 lessons (incl. full 28-letter alphabet chart), live search + level filter, 25 practice games, browser-saved progress |
| `/skills` | Skills Lab: 4 real story suites (listening/dictation, reading, writing) |
| `/facts` | **API showcase (Bootstrap 5):** API Ninjas facts with **search + filter + pagination**, plus an English **dictionary** lookup (2nd API) — all with loading/error/empty states |
| `/book` | Booking form with real-time validation (incl. country) + WhatsApp/email handoff |
| `/teacher` | Passcode-protected dashboard: level distribution, bookings, results |

Rubric features: **two external key-based APIs** (API Ninjas Facts + Dictionary)
with **client-side search, filtering AND pagination over the fetched data** and
**loading/error/empty states** (the `/facts` page; the home "هل تعلم؟" card also
pages through fetched facts) · **Bootstrap 5** on `/facts` · additional
**search + level filter** over the 34 lessons · **15+ real items** (34 lessons) ·
consistent navbar · fully responsive · ES6-class logic.

## Run locally
```bash
npm install
cp .env.example .env      # fill in YOUR values (see below)
npx prisma generate       # generate the Prisma client
npx prisma db push        # (optional) create tables in your Neon database
npm run dev               # http://localhost:3000
```
The app runs **without** a database too — placement/booking saves are best-effort
and skipped gracefully if `DATABASE_URL` isn't set, and the Quote card falls back
to sample quotes if `API_NINJAS_KEY` isn't set.

## Environment variables (`.env`, never committed)
- `DATABASE_URL` — Neon **pooled** connection string
- `DIRECT_URL` — Neon **direct** connection string (for Prisma migrations)
- `API_NINJAS_KEY` — from https://api-ninjas.com

> **Security:** rotate any database password that has ever been pasted or shared,
> then put the new one only in `.env` (local) and Vercel's encrypted env vars.

## Deploy to Vercel
1. Push to GitHub (done).
2. On Vercel: **New Project** → import this repo.
3. Add the three env vars above in **Project → Settings → Environment Variables**.
4. Deploy. Vercel runs `npm run build` (which runs `prisma generate`) automatically.
5. Run `npx prisma db push` once against Neon so the tables exist.
6. Confirm the live URL loads with **no console errors** and works on a phone.

## Project structure
```
src/
  app/            # routes: /, /test, /lessons, /book, /api/*
  components/     # Navbar, Footer, Timeline, QuoteOfDay, LessonsExplorer,
                  # TestRunner, BookingForm, Avatar, Bilingual, ...
  lib/
    classes/      # PlacementTest, LessonCatalog, ApiClient, FormValidator, ScrollReveal
    data/         # lessons, journey stages, test questions
public/games/     # 25 interactive practice pages (from real lesson material)
prisma/           # schema (Student, PlacementResult, Booking, LessonProgress)
```

---

## AI-use appendix
**Tool used:** Claude (Anthropic's Claude Code) — used to scaffold the Next.js
project, build the four pages, write the ES6 classes, author the RTL hand-written
CSS and the Flexbox timeline, wire the API Ninjas integration, and debug setup
issues.

**Sample prompts I used:**
1. "Build a private Arabic-tutoring site 'Learn with Mariana' in Next.js: home
   with a hero, Meet Mariana, a Flexbox/Grid **learning-journey timeline** (my
   custom requirement), a Word/Quote-of-the-Day API card, and testimonials;
   Arabic-first RTL with an English-in-parentheses toggle."
2. "Add a placement test as an **ES6 class** (`PlacementTest`) that tracks
   answers, computes a score and a level, and **highlights the matching stage on
   the same timeline** from the home page."
3. "Make the lessons page render from a `LessonCatalog` **ES6 class** with live
   search by title and filter buttons by level, with loading/empty states."

**Two things the AI got wrong / that didn't work, and how I fixed them:**
1. **Wrong API capability assumption.** The first plan used an "Arabic Word of the
   Day" pulled from API Ninjas, but API Ninjas does **not** serve Arabic
   vocabulary or translations — only English quotes/facts. I found this when
   verifying the endpoint against the live API Ninjas docs, which also showed the
   quotes endpoint is now **`/v2/quotes`**, not the `/v1` the AI first assumed. Fix:
   changed the card to an educational **"Quote of the Day"** using the verified
   `/v2/quotes` endpoint, and added a **sample-quote fallback** so the card still
   renders (and its loading/error/empty states stay demonstrable) when the key is
   missing or the request fails.
2. **First Git commit captured only one file.** Git was initialized in a parent
   folder, so the "initial commit" contained a single stray file instead of the
   project. I found this when the pushed repo was almost empty. Fix: initialized a
   **fresh, clean repository inside the project folder** and re-committed the real
   source, then built up the project in **separate, descriptive commits** (home,
   lessons, test, booking, API) — visible in the commit history.

_These reflect real issues from this project's build and match the commit history.
Add any further issues you hit when running `npm run dev` locally — those make the
strongest appendix entries._
