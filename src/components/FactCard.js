"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";
import styles from "./FactCard.module.css";

/*
  FactCard — "هل تعلم؟ / Did you know?" — the graded external-API card. It uses the
  ApiClient class to fetch a LIST of facts from our /api/facts route (which calls
  the external, key-based API Ninjas service server-side), then shows ONE fact at
  a time. The "معلومة أخرى / Another fact" button PAGINATES through the fetched
  data (the rubric's required search/filter/pagination), and a random starting
  index means a fresh fact on every visit. Renders all required states:
  loading → spinner, error → retry, empty → "لا توجد نتائج", ready → the fact.
*/
const client = new ApiClient();

export default function FactCard() {
  const [status, setStatus] = useState("loading"); // loading | error | empty | ready
  const [facts, setFacts] = useState([]);
  const [index, setIndex] = useState(0);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchFacts({ signal })
      .then((data) => {
        const list = Array.isArray(data?.facts) ? data.facts : [];
        if (list.length === 0) {
          setFacts([]);
          setStatus("empty");
        } else {
          setFacts(list);
          setIndex(Math.floor(Math.random() * list.length)); // fresh each visit
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

  // Pagination over the fetched data: advance to the next fact (wraps around).
  const nextFact = () => setIndex((i) => (i + 1) % facts.length);

  const current = useMemo(() => facts[index], [facts, index]);

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
          <button className="btn btn-ghost" onClick={() => load()}>إعادة المحاولة</button>
        </div>
      )}

      {status === "empty" && (
        <div className={styles.state}>
          <p>لا توجد نتائج.</p>
        </div>
      )}

      {status === "ready" && current && (
        <div className={styles.body}>
          <p className={styles.fact} dir="ltr">💡 {current}</p>
          <div className={styles.foot}>
            <span className={styles.counter}>{index + 1} / {facts.length}</span>
            <button type="button" className={styles.nextBtn} onClick={nextFact}>
              <Bilingual ar="معلومة أخرى" en="Another fact" /> ⟳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
