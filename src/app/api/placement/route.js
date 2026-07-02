// POST /api/placement — saves a placement-test result to the database.
//
// Best-effort by design: if the database isn't configured yet (no DATABASE_URL,
// or the Prisma client hasn't been generated), we DON'T break the user
// experience — the result already renders on the client. We just skip the save
// and report it. When the student isn't logged in, studentId stays null.

import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { level, score, readingGrade, writingGrade, listeningGrade, grammarGrade } =
    body || {};
  if (!level || typeof score !== "number") {
    return NextResponse.json(
      { saved: false, error: "بيانات غير مكتملة" },
      { status: 400 }
    );
  }

  try {
    // Imported lazily so a missing/ungenerated client can't crash the route.
    const { prisma } = await import("@/lib/prisma");
    const result = await prisma.placementResult.create({
      data: {
        level,
        score,
        readingGrade: readingGrade ?? null,
        writingGrade: writingGrade ?? null,
        listeningGrade: listeningGrade ?? null,
        grammarGrade: grammarGrade ?? null,
        studentId: null, // no auth yet (MVP) — anonymous result
      },
    });
    return NextResponse.json({ saved: true, id: result.id });
  } catch (err) {
    console.error("placement save skipped:", err?.message);
    return NextResponse.json({ saved: false, reason: "db-unavailable" });
  }
}
