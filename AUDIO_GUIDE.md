# 🎧 Audio Guide — تعلّم مع مريانا

This site plays audio in the **Dictation** section of the placement test
(`/test`). The code is built so audio is **optional**:

- If a matching `.mp3` exists in `public/audio/`, it plays Mariana's real voice.
- If it doesn't, the same text is spoken automatically by the browser's free
  Arabic text-to-speech (the `Speaker` class). So the site already works with no
  recordings — but real recordings sound far better and score higher on polish.

Everything is handled by [`AudioPlayer`](src/lib/classes/AudioPlayer.js), which
looks for the file at `/audio/<name>.mp3`.

---

## ✅ What to record (4 files — required for real audio)

Record each as a separate **MP3** and drop it into the **`public/audio/`** folder
with the **exact file name** below. Speak in clear Modern Standard Arabic, at a
calm pace, in a quiet room. Read exactly the voweled (مشكول) text.

| File name (must match exactly) | What to say (read it aloud, مشكول) | Used in |
|---|---|---|
| `public/audio/dictation-1.mp3` | **مَدْرَسَة** | Test → Dictation, Q1 (easy) |
| `public/audio/dictation-2.mp3` | **ذَهَبَ الوَلَدُ إلى البَيْتِ.** | Test → Dictation, Q2 (medium) |
| `public/audio/dictation-3.mp3` | **شَرِبْتُ ماءً بارِداً.** | Test → Dictation, Q3 (medium) |
| `public/audio/dictation-4.mp3` | **قَرَأَتْ سارَةُ قِصَّةً قَصيرَةً قَبْلَ النَّوْمِ.** | Test → Dictation, Q4 (hard) |

> Say **only** the sentence — no "question 1", no intro. The player lets the
> student replay it and change speed (0.75× / 1× / 1.25×), so record it once at
> normal speed.

### File format tips
- Format: **MP3** (any bitrate; 128 kbps is plenty).
- Keep each clip short — just the word/sentence, trimmed of silence.
- Same voice for all four so it feels consistent.
- File names are **case-sensitive** and must be exactly `dictation-1.mp3` … `dictation-4.mp3`.

---

## 🎙️ How to record (easy, free options)
- **Phone**: use the Voice Memos / Recorder app → share/export as MP3 (or record
  as `.m4a` and convert to `.mp3` with a free online converter).
- **Windows**: the built-in **Voice Recorder** app, then convert to MP3.
- **Online**: any free "voice recorder to MP3" website.

Then copy the four files into `public/audio/` (next to `.gitkeep`).

---

## 🔁 Verifying it worked
1. Put the files in `public/audio/`.
2. Run `npm run dev` and open `http://localhost:3000/test`.
3. Go to the **الإملاء / Dictation** section and press ▶️ — you should hear your
   recording instead of the robotic browser voice.
4. Commit the files (`git add public/audio && git commit`) so they deploy.

---

## Optional (not required)
The **Skills Lab** (`/skills`) listening stories currently use the browser
text-to-speech voice and need no files. If you later want to record those too,
tell me and I'll add named audio keys for them following the same pattern.
