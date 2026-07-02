// GET /api/teacher — data for Mariana's private dashboard.
//
// Protected by a simple passcode: the request must send the same value in the
// "x-teacher-code" header as TEACHER_PASSCODE in the environment. This is a
// deliberate lightweight gate for the MVP (full student auth is Future Work);
// the passcode lives only on the server and in Mariana's head.

import { NextResponse } from "next/server";

export async function GET(request) {
  const expected = process.env.TEACHER_PASSCODE;
  if (!expected) {
    return NextResponse.json(
      { error: "لوحة المعلّمة غير مهيّأة بعد", reason: "not-configured" },
      { status: 503 }
    );
  }

  const code = request.headers.get("x-teacher-code");
  if (code !== expected) {
    return NextResponse.json({ error: "رمز الدخول غير صحيح" }, { status: 401 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const [results, bookings] = await Promise.all([
      prisma.placementResult.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
    ]);

    const levelCounts = {};
    for (const r of results) {
      levelCounts[r.level] = (levelCounts[r.level] || 0) + 1;
    }

    return NextResponse.json({
      totals: { tests: results.length, bookings: bookings.length },
      levelCounts,
      results,
      bookings,
    });
  } catch (err) {
    console.error("teacher dashboard query failed:", err?.message);
    return NextResponse.json(
      { error: "قاعدة البيانات غير متاحة", reason: "db-unavailable" },
      { status: 503 }
    );
  }
}
