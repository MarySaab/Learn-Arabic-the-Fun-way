// GET /api/word-of-day
//
// STUB for now — returns a random sample word so the home-page "كلمة اليوم"
// card is fully testable (loading / error / empty / ready states all work).
//
// In STEP 6 this becomes a real server-side call to API Ninjas:
//   const res = await fetch("https://api.api-ninjas.com/v1/...", {
//     headers: { "X-Api-Key": process.env.API_NINJAS_KEY },
//   });
// The key is read from the environment on the SERVER, so it never reaches the
// browser. (Verify the exact free endpoint at https://api-ninjas.com/api first.)

import { NextResponse } from "next/server";

const SAMPLE_WORDS = [
  { word: "نُور",  translation: "light",  example: "النُّورُ يملأُ الغرفةَ." },
  { word: "كِتاب", translation: "book",   example: "أقرأُ كِتاباً جميلاً." },
  { word: "سَلام", translation: "peace",  example: "السَّلامُ عليكم." },
  { word: "شَمس",  translation: "sun",    example: "أشرقتِ الشَّمسُ صباحاً." },
  { word: "قَلم",  translation: "pen",    example: "أكتبُ بالقَلمِ على الورقة." },
  { word: "بَحر",  translation: "sea",    example: "البَحرُ واسعٌ وأزرق." },
];

export async function GET() {
  const pick = SAMPLE_WORDS[Math.floor(Math.random() * SAMPLE_WORDS.length)];
  return NextResponse.json(pick);
}
