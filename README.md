# Learn with Mariana | تعلّم مع مريانا

**Student:** Mary Saab
**Course:** Full Stack Development — Final Project 2026
**University:** Lebanese University — Faculty of Engineering, Branch 2 - Roumieh
**Repository:** https://github.com/MarySaab/Learn-Arabic-the-Fun-way
**Live Website:** https://learn-arabic-the-fun-way.vercel.app/
**Teacher Dashboard:** https://learn-arabic-the-fun-way.vercel.app/teacher (passcode-protected)

---

## Description

Learn with Mariana is a full-stack, interactive Arabic learning platform for learners of all levels, from complete beginners to more advanced students. It includes structured lessons, placement tests, grammar, reading, writing, quizzes, games, and progress tracking to provide a complete learning experience. A visitor reads about the teacher (Mariana), takes a short placement test, gets a recommended level highlighted on a learning-journey timeline, and books a session. The site is Arabic-first (`dir="rtl" lang="ar"`) with a button that reveals English glosses in parentheses for foreign learners.

The website:
- teaches Arabic interactively through structured lessons and games
- assesses a learner's level with a placement test
- personalizes the learning journey based on that result
- builds reading, writing, listening, dictation, and grammar skills
- lets visitors book a real session with the teacher

**Why this project:** my mother is an Arabic teacher who teaches students of different levels, both in person and online. Our goal is not only to complete this course project but also to eventually launch it as a real educational platform and online business, so we can reach more students worldwide and encourage them to register for one-on-one lessons with her through a high-quality website experience.

**How the lesson content was built:** the lessons are sourced from real Arabic learning books, not placeholder text. For each one, I scan the lesson, convert it to a PDF, and work through it individually: I use AI tools to help generate an HTML draft of the lesson, then carefully review and correct any Arabic-language and coding mistakes, test the lesson thoroughly, and integrate it into the site. This took several days across many lessons to make sure the content is accurate and everything functions correctly.

---

## Custom UI requirement

> **"Create a timeline-style section using Flexbox or Grid."**

Implemented as the **Learning Journey** on the home page: eight stages (Letters → Mastery) laid out as a horizontal Flexbox track on desktop and a vertical "road" on mobile, correct in RTL. It is **not decorative** — when a visitor finishes the placement test, their recommended level is highlighted on this same timeline with a glowing gold **"أنت هنا (You are here)"** marker. Tapping a stage opens a panel listing its lessons; on mobile the panel automatically scrolls into view so it never opens off-screen.

Marked in the code with:

```js
{/* Custom requirement: Timeline section using CSS Grid/Flexbox */}
```

(see `src/app/page.js` and `src/components/Timeline.js`).

---

## API used

**API Ninjas — Facts endpoint (`/v1/facts`).** https://api-ninjas.com

Chosen because it requires a registered API key (the assignment's key-based API requirement) and returns short facts that fit naturally into a "Did you know?" section on an educational site.

It powers the **"هل تعلم؟ / Did you know?"** explorer on the `/facts` page:

- Called through my own server route `src/app/api/facts/route.js`, using `process.env.API_NINJAS_KEY`, so the key is never exposed in the browser.
- The free tier returns one fact per request, so the route fires a small batch of calls in parallel and keeps the unique results to build a list.
- The `FactsExplorer` component displays the list in a **Bootstrap 5** card grid with:
  - **Live client-side search** over the fetched facts
  - **Pagination** through the results
- Handles all four states: **loading**, **error** (with retry), **empty**, and **ready**.
- If the key is missing or every request fails, the route returns a curated sample list so the card still works for demo purposes (the response's `source` field says `"api-ninjas"` or `"sample"`).

> The Arabic **"اقتباس اليوم / Quote of the Day"** is a separate, local, curated feature (`src/app/api/quote/route.js`) — not the graded API — since API Ninjas only serves English content.

---

## Tech

- **Next.js (App Router) + React**
- **Hand-written CSS3** (CSS Modules + design tokens) using **Flexbox and CSS Grid**
- **Bootstrap 5** for the `/facts` page components
- **Core logic in ES6 classes:** `PlacementTest`, `LessonCatalog`, `ApiClient`, `FormValidator`, plus `ScrollReveal`, `ProgressTracker`, `AudioPlayer`, `Speaker`, `Celebration`
- **Prisma + Neon (PostgreSQL)** — stores bookings, placement results, and lesson progress

## Pages

| Route | What it does |
|-------|--------------|
| `/` | Hero, bilingual intro, Meet Mariana, the timeline, daily quote, FAQ, contact |
| `/facts` | The graded API Ninjas "Did you know?" explorer — search + pagination + loading/error/empty states |
| `/test` | Placement test (reading, writing, dictation, grammar) → per-skill levels highlighted on the timeline |
| `/lessons` | 18 lessons (incl. full alphabet chart), live search + level filter, practice games, saved progress |
| `/lessons/[slug]` | Individual lesson page (learn + quiz) |
| `/skills` | Skills Lab: listening/dictation, reading, and writing story suites |
| `/book` | Booking form with real-time validation + WhatsApp/email handoff |
| `/teacher` | Passcode-protected dashboard: level distribution, bookings, results |

### Teacher Dashboard (`/teacher`)

A passcode-protected page (`TEACHER_PASSCODE` env var) built for Mariana herself, not for students. It reads live from the Neon database and shows:

- **Level distribution** — how many students placed into each level (A–D), so she can see where her student base sits overall
- **Bookings** — every session request submitted through `/book`, with the student's name, country, level, and preferred time
- **Placement results** — each completed test with its per-skill and overall scores

It exists so Mariana can check new bookings and placement results without needing any technical access to the database herself — the dashboard is the only interface she needs.

### Dictation audio

The dictation exercises in the Skills Lab (`/skills`) use the browser's built-in text-to-speech (the Web Speech API) to read Arabic words and sentences aloud. This works reliably wherever the browser/OS has an Arabic text-to-speech voice installed — it's the same feature that reads text aloud in phone accessibility settings. Most phones ship with Arabic TTS voices out of the box, which is why dictation audio worked immediately there; some laptops/desktop browsers don't have an Arabic voice installed by default, so the audio can be silent until one is added (e.g. via the OS's language/speech settings) or a browser that ships its own Arabic voice is used.

---

**Rubric coverage:** key-based external API (API Ninjas) with client-side search + pagination and all four states · Bootstrap 5 alongside hand-written Flexbox/Grid CSS · search + filter over 18 curated lessons (above the 15+ minimum) · consistent navbar on every page · fully responsive · all logic in ES6 classes.

---

## AI-use appendix

Tools used:


Claude (Fable 5 and Opus 4.8, Anthropic) — scaffolded the Next.js project, built the pages, wrote the ES6 classes, authored the RTL hand-written CSS and the Flexbox/Grid timeline, wired the API Ninjas integration and its search/pagination, added Bootstrap 5 to the facts page, generated HTML drafts of individual lessons from my scanned book PDFs, and helped debug setup issues.
Z.ai — also used to help generate HTML drafts of individual lessons from my scanned book PDFs, cross-checked against Claude's output.
ChatGPT — used for additional debugging help and second opinions on Arabic wording during content review.


Main prompts used:
Prompt 1:

I need your help in my university project (full stack development course). It has to be deployable as a static site on Vercel. The project should include a timeline-style section using Flexbox or Grid. 
Website idea: The website I want to build is called "Learn with Mariana" (in Arabic: تعلّم مع مريانا). It's for a private Arabic teacher. The slogan in English is "Your Journey to Mastering Arabic Begins Here" and in Arabic "رحلتك نحو إتقان اللغة العربية تبدأ من هنا". I want it to feel warm and premium, like a boutique online tutor, not like a school template or a generic Bootstrap landing page.
Placement: The whole idea is simple: a visitor comes to the site, reads about the teacher, takes a short placement test, gets their recommended Arabic level, and then based on the level the groups open online meeting every week on google meet. That's it. No real lesson player (for now, after the placement test and everything done there is), no games, no fake student accounts. just landing, test, book.
The student should enter on the website -> see what activities and learn how he will learn -> if he likes it he should do a placement test and gets their recommended Arabic level, -> based on that the students -> placed in groups with a grading (A,B,C…) for each listening writing reading and then he will learn every week 1 or more times and practice on the website, the website will include grammar and little reading and games on the text and after each level completed on the website the student should pass a fun and interactive test to pass to the level above.
The website should include API (daily Arabic quotes, translation of words if possible,… or both and add what we can do and it is logical for my assignment)  and should create an account and save accounts in database so he can log in. The teacher should be able to track the progress of all the students. I uploaded some lectures Arabic you can help yourself with.
The website should be all in Arabic and it should be a button that will make appear the English language in parentheses so the foreign students can understand
I want lectures for several levels pls and then tell me what should I upload or do.
 
Format and Website Design: For the language, The website should be all in Arabic and it should be a button that will make appear the English language in parentheses so the foreign students can understand,with RTL direction (so use dir="rtl" and lang="ar" on the html tag), but I want English shown in parentheses next to the main labels and headings so it stays bilingual. For example "الدروس (Lessons)" or "ابدأ الآن (Start Now)". Please use a Google Font that looks good for Arabic, Cairo or Tajawal for the body text would work well. Make sure the Flexbox and Grid layouts look right in RTL (the timeline direction, arrows, alignment, everything).
Coding and Language: For the tech stack: semantic HTML5, hand-written CSS3 (the core design has to be mine, but I can use Bootstrap 5 for some components and grid), Flexbox, fully responsive for mobile/tablet/desktop, and all JavaScript must be written using ES6 classes only, no jQuery, no var, no old syntax. The only external network call should be the one public API I describe below.
Website Flow: I need 4 pages with a consistent navbar on all of them:
1.	Page 1 is the Home page (home.html). I want a hero section with overlay text and a clear call-to-action button that says something like "ابدأ الاختبار (Start the Test)". Then a short "Meet Mariana" intro block with a photo placeholder. Then the most important section, the Learning Journey timeline (this is my professor's custom requirement for me, more details below). Then a "Word of the Day" card pulled from the API with loading, error, and empty states properly handled. Next is a testimonials section using Bootstrap cards with 3 or 4 quote. Finally, a footer with social links and contact info.

2.	Page 2 is the Placement Test (test.html). It should have multiple-choice questions covering Arabic letters, vocabulary, grammar, and reading comprehension at mixed difficulty. Show one question per screen with a progress bar at the top (like "Question 3 of 10"). Build the logic with an ES6 class called Placement Test that tracks answers and computes a score. When the user submits, show them their recommended level (Beginner, Elementary, Intermediate, or Advanced), highlight where they land on the timeline from the home page, and show a "Book a Session" button that takes them to the booking page. 

3.	Page 3 is the Lessons page (lessons.html). This is where I satisfy the "15+ real items" requirement from the rubric. I need a grid of at least 15 lessons that you  will write and you cacn use the attached files with real titles and descriptions, things like "الحروف الأبجدية (Arabic Alphabet)", "التحية والتعريف (Greetings & Introductions)", "الأرقام ١-١٠ (Numbers 1–10)", "أفراد العائلة (Family Members)", "الفعل المضارع (Present Tense)" and so on. Each card needs a title, short description, level tag, and a topic icon. I want a real-time search bar that filters by lesson title as the user types, plus filter buttons by level (Beginner, Elementary, Intermediate, Advanced). The loading, error, and empty states all have to be visible, for example when search returns nothing show "لا توجد نتائج (No results found)". The lessons should render from a JavaScript data array through an ES6 class called LessonCatalog, not hardcoded into the HTML.

4.	Page 4 is the Booking page (book.html). A contact form with fields for name, email, phone, recommended level (auto-filled from a URL parameter if the user comes from the test), preferred time, and a message. Add real-time validation as the user types. When they submit, show a success message and a button that opens WhatsApp or mail to with a pre-filled message.
Custom Requirement: Now for my custom requirement, which the professor assigned specifically to me: "Create a timeline-style section using Flexbox or Grid." I want this to be the Learning Journey on the home page showing the stages: Letters -> Words -> Sentences -> Basic Grammar -> Writing -> Reading -> Advanced Grammar -> Mastery (with Arabic labels and English in parentheses for each stage). Build it with Flexbox or CSS Grid, horizontal on desktop, vertical and stacked on mobile. Each stage should be a card or node with an icon, Arabic label, English label, and a short description. Please add an HTML comment marking it clearly like <!-- Custom requirement: Timeline section using CSS Grid/Flexbox --> so my professor can find it easily when grading.
Linking the test with custom requirement: Here's the important part I want you to add: when the user finishes the placement test and sees their recommended level, that level should be highlighted on this same timeline (a glowing border or a "You are here / أنت هنا" marker). This way my custom requirement isn't just decoration, it ties directly into the placement test flow. 
APIs: For the API, use API Ninjas (it requires an API key which you register for free at api-ninjas.com, this satisfies the "API that requires registration / API key" requirement from the rubric). Use the Quotes endpoint filtered by an education-related category, or the Facts endpoint for a "Did You Know?" block, whichever feels more educational. Display the result in a styled card on the home page. Store the API key in a separate js/config.js file and also if you have any other recommendation tell me like if the student can translate automatically from thewebsite or etc…
The search and filter requirement from the rubric I'll satisfy through the lessons page (search by title + filter by level), since that's more visible than filtering the API results.
Loading Animations: For loading state put a spinner or skeleton card. For error state show "حدث خطأ، حاول مرة أخرى (Something went wrong)" with a retry button. For empty state show "لا توجد نتائج (No results found)".

Also some notes:
put on any action an interaction for the user
do classes and well organized and well divided
the buttons text should be visually good and brief but still comprehensible 
the buttons should have a good background assigned 
titles should be specific and well assigned
the colors assigned correspondigky it should be a color contrast
we can use maximum 2 fonts and for the text you can use 2 colors
also create next.js 
hosting platform is vercel
and neon as database
you can also use several type tools like typescript, react, tailwind, prisma...
and i should also do local .env file that would include the database url and direct url
in vercel the variables would be encrypted

ANOTHER PROMPT


Additional prompts were used throughout development for debugging, styling, and refactoring; only representative prompts are included here.

Things the AI got wrong, and how I found and fixed them:


Arabic content was frequently inaccurate. Even when I gave the AI a full lesson from A to Z, the generated Arabic text often had translation errors, wrong grammar, or wording that didn't match the source book — the AI's Arabic was noticeably less reliable than its English or its code. I found this by reading every generated lesson myself against the original scanned book, since I'm a native/fluent Arabic reader and could catch mistakes a non-Arabic-speaking reviewer would miss. Fix: I went through every single lesson line by line and corrected the Arabic text manually before publishing it — this is why lesson content took several days per batch rather than being usable straight out of the AI's output.
Buttons and interactive elements didn't work properly after generation. Several AI-generated lesson pages had quiz buttons, "next/check answer" controls, or toggle buttons that looked correct but didn't actually respond to clicks or updated the wrong state. I found this by clicking through every lesson myself after integration. Fix: I tested each lesson's interactive elements individually and had the AI (or I, directly in the code) fix the event handlers and state bindings one lesson at a time until every button worked as expected.
Wrong assumption about what the API could provide. The first plan pulled an "Arabic Word of the Day" from API Ninjas, but API Ninjas serves English content only — it has no Arabic vocabulary or translations. I found this when the endpoint returned English text instead of Arabic. Fix: made the graded feature the English "Did you know?" facts card, and kept the Arabic "اقتباس اليوم" as a separate curated local list instead of an API call.
Dynamically-added content stayed invisible because of a scroll-reveal bug. A scroll-reveal IntersectionObserver hid elements until they scrolled into view, but content added after the observer was set up — like the placement-test result and new lesson cards — never got observed, so it stayed invisible. I found this when my test result simply didn't appear. Fix: re-attached the reveal logic for dynamically-added elements and treated already-visible content as revealed.
Timeline panel opened off-screen on mobile. On the vertical mobile layout, tapping a stage near the top opened its lessons panel far below, off-screen — it looked like nothing happened. I found this testing on my own phone. Fix: the panel now calls scrollIntoView({ block: "nearest" }) when it opens, without disturbing the desktop layout.