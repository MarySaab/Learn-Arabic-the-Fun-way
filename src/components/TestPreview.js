"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./TestPreview.module.css";

/*
  TestPreview — a single sample question on the home page so visitors feel the
  placement test before committing to it. Answering gives instant feedback and
  a CTA to the full 16-question, 4-skill test.
*/
const SAMPLE = {
  prompt: "سؤال تجريبي: كم عددُ حروف الأبجدية العربية؟",
  options: ["٢٦", "٢٨", "٣٠"],
  answer: 1,
};

export default function TestPreview() {
  const [picked, setPicked] = useState(null);

  return (
    <div className={styles.card}>
      <p className={styles.kicker}>✨ جرّب الآن</p>
      <h3 className={styles.prompt}>{SAMPLE.prompt}</h3>

      <div className={styles.options}>
        {SAMPLE.options.map((opt, i) => {
          let cls = styles.option;
          if (picked !== null) {
            if (i === SAMPLE.answer) cls += ` ${styles.correct}`;
            else if (i === picked) cls += ` ${styles.wrong}`;
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className={styles.after}>
          <p className={styles.feedback}>
            {picked === SAMPLE.answer
              ? "✓ أحسنت! هذا سؤال واحد من ستة عشر."
              : "الإجابة الصحيحة: ٢٨ حرفاً — ولهذا نبدأ من الأساس!"}
          </p>
          <Link href="/test" className="btn btn-primary">
            خذ الاختبار الكامل — ٤ مهارات
          </Link>
        </div>
      )}
    </div>
  );
}
