"use client";

import { useCallback, useEffect, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";
import styles from "./QuoteOfDay.module.css";

/*
  FactCard — "هل تعلم؟ / Did you know?" — the graded external-API card. It uses
  the ApiClient class to fetch a fact from our /api/facts route (which calls API
  Ninjas server-side), and shows the required loading / error / empty / ready
  states. Facts are in English (API Ninjas is English-only), which fits a
  "fun fact" block on a bilingual site.
*/
const client = new ApiClient();

export default function FactCard() {
  const [status, setStatus] = useState("loading");
  const [fact, setFact] = useState(null);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchFact({ signal })
      .then((data) => {
        if (!data || !data.fact) {
          setFact(null);
          setStatus("empty");
        } else {
          setFact(data.fact);
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
        <Bilingual ar="هل تعلم؟" en="Did you know?" />
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

      {status === "ready" && fact && (
        <p className={styles.quote} dir="ltr">💡 {fact}</p>
      )}
    </div>
  );
}
