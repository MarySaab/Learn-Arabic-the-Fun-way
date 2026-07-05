// GET /api/dictionary?word=hello — the "English word helper" lookup.
//
// SECOND external, key-based API: it calls API Ninjas' Dictionary endpoint
// SERVER-SIDE using process.env.API_NINJAS_KEY, so the key never reaches the
// browser. Handy for the site's foreign learners who meet an English word in a
// gloss and want its meaning. Returns { word, definition, valid, source }.
//
// If the key is missing or the request fails, it returns a small offline sample
// so the card's loading / error / empty states stay demonstrable.

import { NextResponse } from "next/server";

const ENDPOINT =
  process.env.API_NINJAS_DICTIONARY_URL ||
  "https://api.api-ninjas.com/v1/dictionary";

// A tiny offline fallback so the feature works even without a key.
const SAMPLE = {
  hello: "used as a greeting or to begin a phone conversation.",
  book: "a written or printed work consisting of pages glued or sewn together.",
  learn: "gain or acquire knowledge of or skill in something by study or experience.",
  language: "the method of human communication, either spoken or written.",
};

export async function GET(request) {
  const word = (new URL(request.url).searchParams.get("word") || "")
    .trim()
    .toLowerCase();

  if (!word) {
    return NextResponse.json({ word: "", definition: "", valid: false });
  }

  const key = process.env.API_NINJAS_KEY;
  if (!key) {
    const def = SAMPLE[word] || "";
    return NextResponse.json({
      word,
      definition: def,
      valid: Boolean(def),
      source: "sample",
    });
  }

  try {
    const res = await fetch(`${ENDPOINT}?word=${encodeURIComponent(word)}`, {
      headers: { "X-Api-Key": key },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: true }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({
      word: data.word ?? word,
      definition: data.definition ?? "",
      valid: data.valid ?? Boolean(data.definition),
      source: "api-ninjas",
    });
  } catch (err) {
    console.error("API Ninjas dictionary failed:", err?.message);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
