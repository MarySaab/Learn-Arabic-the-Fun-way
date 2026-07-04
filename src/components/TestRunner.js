"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Bilingual from "./Bilingual";
import Timeline from "./Timeline";
import PlacementTest from "@/lib/classes/PlacementTest";
import Celebration from "@/lib/classes/Celebration";
import AudioPlayer from "@/lib/classes/AudioPlayer";
import { testQuestions, testSections, levelMessages } from "@/lib/data/testQuestions";
import { levels } from "@/lib/data/lessons";
import { stageIdForLevel } from "@/lib/data/journey";
import { toArabicDigits } from "@/lib/format";
import styles from "./TestRunner.module.css";

/*
  TestRunner — drives the 4-skill placement test (Reading, Writing, Listening,
  Grammar) through the PlacementTest class:
    - a short intro screen opens each section
    - one question per screen with a progress bar; listening questions get a
      play button with speeds (٠٫٧٥× / ١× / ١٫٢٥×) via the Speaker class
    - the result shows an overall CEFR-like level (A0–B2), a CEFR-like level
      per skill, the group level highlighted on the Timeline, and saves all
      grades to the database (best-effort).
*/
const RATES = [
  { label: "٠٫٧٥×", value: 0.75 },
  { label: "١×", value: 1 },
  { label: "١٫٢٥×", value: 1.25 },
];

export default function TestRunner() {
  const test = useMemo(() => new PlacementTest(testQuestions), []);
  const celebration = useMemo(() => new Celebration(), []);
  // Plays Mariana's recorded MP3s from /public/audio when present,
  // falling back to the free browser Arabic voice otherwise.
  const player = useMemo(() => new AudioPlayer(), []);

  const [index, setIndex] = useState(0);
  const [, setTick] = useState(0); // re-render when an answer changes
  const [submitted, setSubmitted] = useState(false);
  // section whose intro screen is currently showing (starts with the first)
  const [introFor, setIntroFor] = useState(testQuestions[0]?.section ?? null);
  const [rate, setRate] = useState(1);

  const current = testQuestions[index];
  const section = testSections.find((s) => s.id === current.section);
  const chosen = test.getAnswer(current.id);
  const progress = ((index + 1) / test.total) * 100;

  const choose = (optionId) => {
    test.answer(current.id, optionId);
    setTick((t) => t + 1);
  };

  const goNext = () => {
    player.stop();
    const nextIndex = Math.min(test.total - 1, index + 1);
    if (testQuestions[nextIndex].section !== current.section) {
      setIntroFor(testQuestions[nextIndex].section);
    }
    setIndex(nextIndex);
  };

  const goPrev = () => {
    player.stop();
    setIndex((i) => Math.max(0, i - 1));
  };

  const submit = () => {
    player.stop();
    setSubmitted(true);
    const level = test.level();
    const b = test.skillBreakdown();
    // Per-skill grade uses the SAME weighted A/B/C/D scale as the level letters
    // and the on-screen per-skill cards, so the dashboard matches the result
    // (A = advanced … D = beginner). Failing a skill correctly lands on D.
    const gradeOf = (s) =>
      b[s] && b[s].max ? PlacementTest.letterFor(b[s].points / b[s].max) : null;

    // Best-effort save; the result shows regardless of DB availability.
    fetch("/api/placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        score: test.correctCount(),
        readingGrade: gradeOf("reading"),
        writingGrade: gradeOf("writing"),
        dictationGrade: gradeOf("dictation"),
        grammarGrade: gradeOf("grammar"),
      }),
    }).catch(() => {});

    celebration.burst(70);
    if (typeof window !== "undefined") {
      localStorage.setItem("lwm-level", level);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restart = () => {
    test.reset();
    setIndex(0);
    setSubmitted(false);
    setIntroFor(testQuestions[0]?.section ?? null);
    setTick((t) => t + 1);
  };

  // -------------------- RESULT VIEW --------------------
  if (submitted) {
    const level = test.level();
    const levelInfo = levels.find((l) => l.id === level);
    const breakdown = test.skillBreakdown();
    const stageId = stageIdForLevel(level);
    const ratio = test.total ? test.correctCount() / test.total : 0;

    return (
      <div className={styles.result}>
        <div className={styles.resultCard} data-reveal>
          <p className={styles.resultKicker}>
            <Bilingual ar="مستواك" en="Your level" />
          </p>
          <div className={styles.cefrBadge}>{test.letter()}</div>
          <h2 className={styles.levelName}>
            <Bilingual ar={levelInfo?.ar} en={levelInfo?.en} />
          </h2>

          <div className={styles.starRow} aria-label={`${test.correctCount()} إجابة صحيحة من ${test.total}`}>
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={ratio >= n / 3 ? styles.starOn : styles.starOff}
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

          {/* per-skill profile: CEFR-like level for each of the 4 skills */}
          <div className={styles.skillGrid}>
            {testSections.map((s) => {
              const d = breakdown[s.id] || { correct: 0, total: 0, points: 0, max: 0 };
              const r = d.max ? d.points / d.max : 0;
              const letter = PlacementTest.letterFor(r);
              const letterInfo = PlacementTest.LETTER_LEVELS[letter];
              return (
                <div key={s.id} className={styles.skillCard}>
                  <span className={styles.skillIcon} aria-hidden="true">{s.icon}</span>
                  <b className={styles.skillName}>
                    <Bilingual ar={s.ar} en={s.en} />
                  </b>
                  <span className={styles.skillCefr}>{letter}</span>
                  <span className={styles.skillLevelAr}>
                    <Bilingual ar={letterInfo.ar} en={letterInfo.en} />
                  </span>
                  <span className={styles.skillScore}>
                    {toArabicDigits(d.correct)} / {toArabicDigits(d.total)}
                  </span>
                </div>
              );
            })}
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

  // -------------------- SECTION INTRO --------------------
  if (introFor) {
    const s = testSections.find((x) => x.id === introFor);
    const sIndex = testSections.findIndex((x) => x.id === introFor);
    return (
      <div className={styles.quiz}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionIntroIcon} aria-hidden="true">{s.icon}</span>
          <p className={styles.sectionIntroKicker}>
            القسم {toArabicDigits(sIndex + 1)} من {toArabicDigits(testSections.length)}
          </p>
          <h2><Bilingual ar={s.ar} en={s.en} /></h2>
          <p className={styles.sectionIntroDesc}>{s.desc}</p>
          <p className={styles.sectionIntroCount}>
            {toArabicDigits(s.questions.length)} أسئلة
          </p>
          <button className="btn btn-primary" onClick={() => setIntroFor(null)}>
            ابدأ القسم
          </button>
        </div>
      </div>
    );
  }

  // -------------------- QUESTION VIEW --------------------
  return (
    <div className={styles.quiz}>
      <div className={styles.progressHead}>
        <span className={styles.sectionChip}>
          {section.icon} {section.ar}
        </span>
        <span>
          السؤال {toArabicDigits(index + 1)} من {toArabicDigits(test.total)}
        </span>
      </div>
      <div className={styles.progressBar}>
        <i style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.question} key={current.id}>
        {/* reading passage */}
        {current.passage && (
          <div className={styles.passage}>{current.passage}</div>
        )}

        {/* listening player */}
        {current.listen && (
          <div className={styles.listenBox}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => player.play(current.audioKey, current.listen, { rate })}
            >
              🔊 استمع
            </button>
            <div className={styles.rates} role="group" aria-label="سرعة القراءة">
              {RATES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  className={`${styles.rateBtn} ${rate === r.value ? styles.rateActive : ""}`}
                  onClick={() => setRate(r.value)}
                  aria-pressed={rate === r.value}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className={styles.listenHint}>
              يمكنك الاستماع أكثر من مرّة. إن لم يتوفّر صوتٌ عربيّ على جهازك،
              جرّب جهازاً آخر.
            </p>
          </div>
        )}

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
          {/* honest escape hatch for beginners — counts as unanswered-wrong,
              so low levels are measured without forcing guesses */}
          <button
            className={`${styles.option} ${styles.optionSkip} ${chosen === "skip" ? styles.optionChosen : ""}`}
            onClick={() => choose("skip")}
            aria-pressed={chosen === "skip"}
          >
            🤷 لا أعرف <span className="en-gloss">(I don&apos;t know)</span>
          </button>
        </div>
      </div>

      <div className={styles.nav}>
        <button className="btn btn-ghost" onClick={goPrev} disabled={index === 0}>
          السابق
        </button>

        {index < test.total - 1 ? (
          <button className="btn btn-primary" onClick={goNext} disabled={chosen == null}>
            التالي
          </button>
        ) : (
          <button className="btn btn-gold" onClick={submit} disabled={!test.isComplete()}>
            اعرض النتيجة
          </button>
        )}
      </div>
    </div>
  );
}
