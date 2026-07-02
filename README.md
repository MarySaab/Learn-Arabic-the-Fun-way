# تعلّم مع مريانا — Learn with Mariana

Your name: **Mary Saab**
Course: Full Stack Development — Final Project 2026
Custom UI requirement: **Timeline-style section using Flexbox/Grid** (the "Learning
Journey" on the home page; ties into the placement-test result).

A private Arabic-tutoring site: a visitor reads about the teacher, takes a
placement test, gets a recommended level highlighted on the learning-journey
timeline, and books a session.

## Tech
- **Next.js (App Router)** + React — deployed on Vercel
- **Hand-written CSS** (CSS Modules + `globals.css` design tokens) — no CSS framework
- Core logic in **ES6 classes**: `PlacementTest`, `LessonCatalog`, `ApiClient`, `FormValidator`
- **Prisma + Neon (PostgreSQL)** for placement results, bookings, and student login
- **API used:** API Ninjas (server-side, key kept in env)

## Run locally
```bash
npm install
cp .env.example .env      # then fill in YOUR values
npx prisma db push        # create the tables in your Neon database
npm run dev               # http://localhost:3000
```

## Environment variables (`.env`, never committed)
- `DATABASE_URL` — Neon pooled connection string
- `DIRECT_URL` — Neon direct connection string (for Prisma)
- `API_NINJAS_KEY` — from https://api-ninjas.com

> Security note: rotate any database password that has ever been shared or pasted
> anywhere, then put the new one only in `.env` (local) and Vercel env vars.

## AI-use appendix (REQUIRED — fill this in honestly as you go)
Tools used:
- Claude — <what you used it for>

Sample prompts (2–3):
1. <prompt>
2. <prompt>

Two+ things the AI got wrong and how you fixed them:
1. <describe the actual issue you hit and your fix>
2. <describe the actual issue you hit and your fix>

_Keep this matched to your real commit history._
