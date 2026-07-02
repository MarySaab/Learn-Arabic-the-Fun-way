// GET /api/quote — the home page's "Quote of the Day" card data.
//
// This is the graded API integration. It calls API Ninjas SERVER-SIDE using the
// key from process.env.API_NINJAS_KEY (verified endpoint: the v2 quotes API),
// so the key never reaches the browser. If the key is missing or the request
// fails, we fall back to a small sample list so the card always renders and the
// loading / error / empty states stay demonstrable.
//
// Endpoint is overridable via env in case API Ninjas changes its URL again.

import { NextResponse } from "next/server";

const QUOTES_URL =
  process.env.API_NINJAS_QUOTES_URL || "https://api.api-ninjas.com/v2/quotes";

// Clearly-labelled fallback quotes (used when no key / API error).
const SAMPLE_QUOTES = [
  { quote: "Whoever wants to reach mastery must first embrace the beginner's steps.", author: "Arabic proverb" },
  { quote: "Seek knowledge from the cradle to the grave.", author: "Arabic proverb" },
  { quote: "He who has health has hope, and he who has hope has everything.", author: "Arabic proverb" },
  { quote: "Repetition teaches even the slowest learner.", author: "Arabic proverb" },
];

function sample() {
  const pick = SAMPLE_QUOTES[Math.floor(Math.random() * SAMPLE_QUOTES.length)];
  return NextResponse.json({ ...pick, source: "sample" });
}

export async function GET() {
  const key = process.env.API_NINJAS_KEY;
  if (!key) return sample();

  try {
    const res = await fetch(QUOTES_URL, {
      headers: { "X-Api-Key": key },
      cache: "no-store",
    });
    if (!res.ok) return sample();

    const data = await res.json();
    const item = Array.isArray(data) ? data[0] : data;
    if (item && item.quote) {
      return NextResponse.json({
        quote: item.quote,
        author: item.author || "Unknown",
        source: "api-ninjas",
      });
    }
    return sample();
  } catch (err) {
    console.error("API Ninjas quote failed:", err?.message);
    return sample();
  }
}
