"use client";

import { useCallback, useEffect, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";
import styles from "./QuoteOfDay.module.css";

/*
  QuoteOfDay — the "اقتباس اليوم / Quote of the Day" card. It uses the ApiClient
  class to fetch a quote from our own server route (which calls API Ninjas), and
  demonstrates the rubric's required states:
    - loading → spinner
    - error   → message + retry button
    - empty   → "لا توجد نتائج"
    - ready   → the quote + author
*/
const client = new ApiClient();

export default function QuoteOfDay() {
  const [status, setStatus] = useState("loading"); // loading | error | empty | ready
  const [quote, setQuote] = useState(null);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchQuote({ signal })
      .then((data) => {
        if (!data || !data.quote) {
          setQuote(null);
          setStatus("empty");
        } else {
          setQuote(data);
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
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
        <Bilingual ar="اقتباس اليوم" en="Quote of the Day" />
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

      {status === "ready" && quote && (
        <figure className={styles.quoteFig}>
          <blockquote className={styles.quote}>“{quote.quote}”</blockquote>
          <figcaption className={styles.author}>— {quote.author}</figcaption>
        </figure>
      )}
    </div>
  );
}
