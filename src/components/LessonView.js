"use client";

import { useMemo, useState } from "react";
import { toArabicDigits } from "@/lib/format";
import styles from "./LessonView.module.css";

/*
  LessonView — renders one lesson's content: a "learn" section of concept cards
  with examples, then an interactive practice quiz. The quiz gives instant
  feedback (correct/wrong + a short explanation), tracks a score, and ends with
  an encouraging message and a retry button — the same playful learn→practice
  flow as the standalone games.
*/
export default function LessonView({ content }) {
  const quiz = useMemo(() => content.quiz || [], [content]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null); // chosen option index (locks the question)
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[index];

  const choose = (optIndex) => {
    if (picked !== null) return; // already answered
    setPicked(optIndex);
    if (optIndex === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index < quiz.length - 1) {
      setIndex((i) => i + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div>
      {/* ---- LEARN ---- */}
      <div className={styles.cards}>
        {content.cards.map((card, i) => (
          <div key={i} className={styles.card} data-reveal>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">{card.icon}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
            </div>
            <p className={styles.cardBody}>{card.body}</p>
            {card.examples?.length > 0 && (
              <ul className={styles.examples}>
                {card.examples.map((ex, k) => (
                  <li key={k} className={styles.example}>{ex}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* ---- PRACTICE QUIZ ---- */}
      {quiz.length > 0 && (
        <div className={styles.quiz}>
          <h2 className={styles.quizTitle}>🎯 تدرّب الآن</h2>

          {!finished ? (
            <div className={styles.quizCard}>
              <div className={styles.quizProgress}>
                السؤال {toArabicDigits(index + 1)} من {toArabicDigits(quiz.length)}
              </div>
              <p className={styles.prompt}>{q.prompt}</p>

              <div className={styles.options}>
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answer;
                  const isPicked = picked === i;
                  let cls = styles.option;
                  if (picked !== null && isAnswer) cls += ` ${styles.correct}`;
                  else if (isPicked && !isAnswer) cls += ` ${styles.wrong}`;
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className={styles.feedback}>
                  <p className={picked === q.answer ? styles.good : styles.bad}>
                    {picked === q.answer ? "✓ إجابة صحيحة!" : "✗ ليست صحيحة."}
                  </p>
                  {q.explain && <p className={styles.explain}>{q.explain}</p>}
                  <button className="btn btn-primary" onClick={next}>
                    {index < quiz.length - 1 ? "التالي" : "النتيجة"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.quizCard}>
              <div className={styles.resultBig} aria-hidden="true">
                {score === quiz.length ? "🏆" : score >= quiz.length / 2 ? "🌟" : "💪"}
              </div>
              <p className={styles.resultScore}>
                نتيجتك: {toArabicDigits(score)} / {toArabicDigits(quiz.length)}
              </p>
              <p className={styles.resultMsg}>
                {score === quiz.length
                  ? "ممتاز! أتقنت هذا الدرس."
                  : score >= quiz.length / 2
                  ? "عمل جيّد! راجع وأعد المحاولة لتتقن."
                  : "بداية طيّبة — راجع الدرس وحاول مجدّداً."}
              </p>
              <button className="btn btn-gold" onClick={restart}>أعد التدريب</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
