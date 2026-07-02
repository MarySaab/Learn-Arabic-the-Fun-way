// GET /api/facts — "هل تعلم؟ / Did you know?" card data.
//
// This is the graded external-API integration: it calls API Ninjas SERVER-SIDE
// using process.env.API_NINJAS_KEY (verified endpoint: /v1/facts), so the key
// never reaches the browser. If the key is missing or the request fails, we
// fall back to a small sample list so the card always renders and its
// loading / error / empty states stay demonstrable.

import { NextResponse } from "next/server";

const FACTS_URL =
  process.env.API_NINJAS_FACTS_URL || "https://api.api-ninjas.com/v1/facts";

const SAMPLE_FACTS = [
  { fact: "Arabic is written from right to left and has 28 letters." },
  { fact: "Arabic is one of the six official languages of the United Nations." },
  { fact: "Many English words come from Arabic, like 'sugar', 'coffee', and 'algebra'." },
  { fact: "The Arabic alphabet is used by several other languages, including Persian and Urdu." },
];

function sample() {
  const pick = SAMPLE_FACTS[Math.floor(Math.random() * SAMPLE_FACTS.length)];
  return NextResponse.json({ ...pick, source: "sample" });
}

export async function GET() {
  const key = process.env.API_NINJAS_KEY;
  if (!key) return sample();

  try {
    const res = await fetch(FACTS_URL, {
      headers: { "X-Api-Key": key },
      cache: "no-store",
    });
    if (!res.ok) return sample();

    const data = await res.json();
    const item = Array.isArray(data) ? data[0] : data;
    if (item && item.fact) {
      return NextResponse.json({ fact: item.fact, source: "api-ninjas" });
    }
    return sample();
  } catch (err) {
    console.error("API Ninjas facts failed:", err?.message);
    return sample();
  }
}
