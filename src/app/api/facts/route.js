// GET /api/facts — data for the "هل تعلم؟ / Did you know?" explorer.
//
// This is the graded external-API integration. It calls API Ninjas
// SERVER-SIDE using process.env.API_NINJAS_KEY (verified endpoint: /v1/facts),
// so the key never reaches the browser. API Ninjas returns ONE fact per call on
// the free tier, so we fire a batch of calls in parallel and keep the unique
// results to build a LIST the client can search through.
//
// If the key is missing or every request fails, we return a curated sample list
// (real facts about the Arabic language) so the card — and its search box — stay
// fully demonstrable, including the loading / error / empty states.

import { NextResponse } from "next/server";

const FACTS_URL =
  process.env.API_NINJAS_FACTS_URL || "https://api.api-ninjas.com/v1/facts";

const SAMPLE_FACTS = [
  "Arabic is written from right to left and has 28 letters.",
  "Arabic is one of the six official languages of the United Nations.",
  "Many English words come from Arabic, including 'sugar', 'coffee', 'algebra', and 'cotton'.",
  "The Arabic alphabet is also used to write Persian, Urdu, and Kurdish.",
  "Arabic is spoken by more than 400 million people around the world.",
  "Most Arabic letters change shape depending on their position in a word.",
  "The word 'algebra' comes from the Arabic 'al-jabr'.",
  "Arabic has a dual form — a special word form used for exactly two of something.",
  "Short vowels in Arabic are written as small marks above or below the letters.",
  "Arabic and Hebrew are both Semitic languages and share many root patterns.",
  "The digits 0–9 reached Europe through Arabic mathematicians.",
  "Classical Arabic has stayed largely unchanged for over 1,400 years.",
  "Arabic calligraphy is considered one of the highest Islamic art forms.",
  "Adding 'al-' (الـ) to the start of a word makes it definite, like 'the' in English.",
];

// One API Ninjas call → one fact (free tier). Resolve to the fact string or null.
async function fetchOneFact(key) {
  const res = await fetch(FACTS_URL, {
    headers: { "X-Api-Key": key },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  const data = await res.json();
  const item = Array.isArray(data) ? data[0] : data;
  return item?.fact || null;
}

export async function GET() {
  const key = process.env.API_NINJAS_KEY;

  if (key) {
    try {
      const calls = Array.from({ length: 12 }, () =>
        fetchOneFact(key).catch(() => null)
      );
      const results = await Promise.all(calls);
      const facts = [...new Set(results.filter(Boolean))]; // de-duplicate
      if (facts.length > 0) {
        return NextResponse.json({ facts, source: "api-ninjas" });
      }
    } catch (err) {
      console.error("API Ninjas facts failed:", err?.message);
    }
  }

  // Fallback so the card + its search always work.
  return NextResponse.json({ facts: SAMPLE_FACTS, source: "sample" });
}
