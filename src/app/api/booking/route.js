// POST /api/booking — saves a session-booking request to the database.
//
// Best-effort like /api/placement: if the DB isn't set up yet, the booking
// still "succeeds" from the user's point of view (they also get the
// WhatsApp/email handoff on the client), we just skip the DB write.

import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { name, email, phone, level, preferredTime, message } = body || {};
  if (!name || !email || !phone) {
    return NextResponse.json(
      { saved: false, error: "الاسم والبريد والهاتف مطلوبة" },
      { status: 400 }
    );
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        level: level || null,
        preferredTime: preferredTime || null,
        message: message || null,
        studentId: null,
      },
    });
    return NextResponse.json({ saved: true, id: booking.id });
  } catch (err) {
    console.error("booking save skipped:", err?.message);
    return NextResponse.json({ saved: false, reason: "db-unavailable" });
  }
}
