"use client";

import { useEffect, useMemo, useState } from "react";
import Celebration from "@/lib/classes/Celebration";
import ProgressTracker from "@/lib/classes/ProgressTracker";

/*
  MarkComplete — a small "I finished this lesson" button used on lesson pages
  whose practice is an embedded game (the game can't tell our site when it's
  done, so the learner marks it). Content lessons complete automatically when
  their quiz finishes (see LessonView).
*/
export default function MarkComplete({ slug }) {
  const tracker = useMemo(() => new ProgressTracker(), []);
  const celebration = useMemo(() => new Celebration(), []);
  const [done, setDone] = useState(false);

  // read after mount (localStorage doesn't exist during server render)
  useEffect(() => {
    setDone(tracker.isComplete(slug));
  }, [tracker, slug]);

  if (done) {
    return (
      <p style={{ textAlign: "center", color: "var(--success)", fontWeight: 800 }}>
        ✓ أكملتَ هذا الدرس — أحسنت!
      </p>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button
        className="btn btn-primary"
        onClick={() => {
          tracker.complete(slug);
          setDone(true);
          celebration.burst(50);
        }}
      >
        أنهيتُ هذا الدرس ✓
      </button>
    </div>
  );
}
