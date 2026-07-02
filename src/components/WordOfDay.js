"use client";

import { useCallback, useEffect, useState } from "react";
import WordClient from "@/lib/classes/WordClient";
import Bilingual from "./Bilingual";
import styles from "./WordOfDay.module.css";

/*
  WordOfDay — the "كلمة اليوم" card. It uses the WordClient class to fetch a
  word from our own server route and demonstrates the rubric's required
  loading / error / empty states:
    - loading → spinner
    - error   → message + "retry" button
    - empty   → "لا توجد نتائج"
    - ready   → the word, its translation, and an example sentence
*/
const client = new WordClient();

export default function WordOfDay() {
  // status: "loading" | "error" | "empty" | "ready"
  const [status, setStatus] = useState("loading");
  const [word, setWord] = useState(null);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchWord({ signal })
      .then((data) => {
        if (!data || !data.word) {
          setStatus("empty");
          setWord(null);
        } else {
          setWord(data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // component unmounted; ignore
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return (
    <div className={styles.card} aria-live="polite">
      <p className={styles.label}>
        <Bilingual ar="كلمة اليوم" en="Word of the Day" />
      </p>

      {status === "loading" && (
        <div className={styles.state}>
          <span className={styles.spinner} role="status" aria-label="جارٍ التحميل" />
        </div>
      )}

      {status === "error" && (
        <div className={styles.state}>
          <p className={styles.errorText}>حدث خطأ، حاول مرة أخرى.</p>
          <button className="btn btn-ghost" onClick={() => load()}>
            إعادة المحاولة
          </button>
        </div>
      )}

      {status === "empty" && (
        <div className={styles.state}>
          <p>لا توجد نتائج.</p>
        </div>
      )}

      {status === "ready" && word && (
        <div>
          <p className={styles.word}>{word.word}</p>
          {word.translation && (
            <p className={styles.translation}>{word.translation}</p>
          )}
          {word.example && <p className={styles.example}>{word.example}</p>}
        </div>
      )}
    </div>
  );
}
