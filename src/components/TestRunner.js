"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Bilingual from "./Bilingual";
import Timeline from "./Timeline";
import PlacementTest from "@/lib/classes/PlacementTest";
import Celebration from "@/lib/classes/Celebration";
import { testQuestions, levelMessages } from "@/lib/data/testQuestions";
import { levels } from "@/lib/data/lessons";
import { stageIdForLevel } from "@/lib/data/journey";
import { toArabicDigits } from "@/lib/format";
import styles from "./TestRunner.module.css";

/*
  TestRunner — drives the PlacementTest class through the UI:
    - one question per screen with a progress bar (السؤال 3 من 10)
    - Previous / Next navigation
    - on submit: computes the level, shows encouraging micro-copy, HIGHLIGHTS
      the matching stage on the same Timeline from the home page, and links to
      /book?level=<level>
    - best-effort save of the result to the database (POST /api/placement)
*/
const SKILL_LABELS = {
  letters:    { ar: "الحروف",   en: "Letters" },
  vocabulary: { ar: "المفردات", en: "Vocabulary" },
  grammar:    { ar: "القواعد",  en: "Grammar" },
  reading:    { ar: "القراءة",  en: "Reading" },
};

export default function TestRunner() {
  const test = useMemo(() => new PlacementTest(testQuestions), []);
  const celebration = useMemo(() => new Celebration(), []);
  const [index, setIndex] = useState(0);
  const [, setTick] = useState(0); // force re-render when an answer changes
  const [submitted, setSubmitted] = useState(false);

  const current = testQuestions[index];
  const chosen = test.getAnswer(current.id);
  const progress = ((index + 1) / test.total) * 100;

  const choose = (optionId) => {
    test.answer(current.id, optionId);
    setTick((t) => t + 1);
  };

  const saveResult = (level, score, readingGrade) => {
    // Best-effort: if the DB isn't configured, the result still shows fine.
    fetch("/api/placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, score, readingGrade }),
    }).catch(() => {});
  };

  const submit = () => {
    setSubmitted(true);
    const level = test.level();
    const breakdown = test.skillBreakdown();
    const reading = breakdown.reading;
    const readingGrade = reading
      ? PlacementTest.grade(reading.correct, reading.total)
      : null;
    saveResult(level, test.correctCount(), readingGrade);
    celebration.burst(70);
    // Remember the level so the booking page can pre-fill it even without the URL.
    if (typeof window !== "undefined") {
      localStorage.setItem("lwm-level", level);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restart = () => {
    test.reset();
    setIndex(0);
    setSubmitted(false);
    setTick((t) => t + 1);
  };

  // -------------------- RESULT VIEW --------------------
  if (submitted) {
    const level = test.level();
    const levelInfo = levels.find((l) => l.id === level);
    const breakdown = test.skillBreakdown();
    const stageId = stageIdForLevel(level);

    return (
      <div className={styles.result}>
        <div className={styles.resultCard} data-reveal>
          <p className={styles.resultKicker}>
            <Bilingual ar="نتيجتك" en="Your result" />
          </p>
          <h2 className={styles.levelName}>
            <Bilingual ar={levelInfo?.ar} en={levelInfo?.en} />
          </h2>
          <div
            className={styles.starRow}
            aria-label={`${test.correctCount()} إجابة صحيحة من ${test.total}`}
          >
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={
                  test.correctCount() / test.total >= n / 3
                    ? styles.starOn
                    : styles.starOff
                }
                style={{ animationDelay: `${n * 0.15}s` }}
              >
                ★
              </span>
            ))}
          </div>
          <p className={styles.score}>
            {toArabicDigits(test.correctCount())} / {toArabicDigits(test.total)}
          </p>
          <p className={styles.message}>{levelMessages[level]}</p>

          {/* per-skill grades */}
          <div className={styles.grades}>
            {Object.entries(breakdown).map(([skill, { correct, total }]) => (
              <div key={skill} className={styles.gradeItem}>
                <span className={styles.gradeLetter}>
                  {PlacementTest.grade(correct, total)}
                </span>
                <span className={styles.gradeSkill}>
                  <Bilingual ar={SKILL_LABELS[skill]?.ar} en={SKILL_LABELS[skill]?.en} />
                </span>
              </div>
            ))}
          </div>

          <div className={styles.resultActions}>
            <Link href={`/book?level=${level}`} className="btn btn-gold">
              احجز حصّة
            </Link>
            <button className="btn btn-ghost" onClick={restart}>
              أعد الاختبار
            </button>
            <button className="btn btn-ghost" onClick={() => window.print()}>
              اطبع النتيجة
            </button>
          </div>
        </div>

        {/* The SAME timeline from the home page, with the learner's stage lit up */}
        <div className={styles.timelineWrap}>
          <h3 className={styles.timelineTitle}>
            <Bilingual ar="أنت هنا في رحلتك" en="You are here on your journey" />
          </h3>
          <Timeline highlightStageId={stageId} />
        </div>
      </div>
    );
  }

  // -------------------- QUESTION VIEW --------------------
  return (
    <div className={styles.quiz}>
      <div className={styles.progressHead}>
        <span>
          السؤال {toArabicDigits(index + 1)} من {toArabicDigits(test.total)}
        </span>
        <span>{toArabicDigits(test.answeredCount())} / {toArabicDigits(test.total)}</span>
      </div>
      <div className={styles.progressBar}>
        <i style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.question} key={current.id}>
        <h2 className={styles.prompt}>{current.prompt}</h2>
        <div className={styles.options}>
          {current.options.map((opt) => (
            <button
              key={opt.id}
              className={`${styles.option} ${chosen === opt.id ? styles.optionChosen : ""}`}
              onClick={() => choose(opt.id)}
              aria-pressed={chosen === opt.id}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.nav}>
        <button
          className="btn btn-ghost"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          السابق
        </button>

        {index < test.total - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setIndex((i) => Math.min(test.total - 1, i + 1))}
            disabled={chosen == null}
          >
            التالي
          </button>
        ) : (
          <button
            className="btn btn-gold"
            onClick={submit}
            disabled={!test.isComplete()}
          >
            اعرض النتيجة
          </button>
        )}
      </div>
    </div>
  );
}
