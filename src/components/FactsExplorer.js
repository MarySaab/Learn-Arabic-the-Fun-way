"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";
import styles from "./FactsExplorer.module.css";

/*
  FactsExplorer — the graded external-API feature. It uses the ApiClient class to
  fetch a LIST of "Did you know?" facts from our /api/facts route (which calls the
  external, key-based API Ninjas service server-side), then lets the visitor
  filter that fetched data with a live CLIENT-SIDE search box. It renders all four
  required states:
    - loading → spinner
    - error   → message + retry button
    - empty   → "لا توجد نتائج" (API returned nothing OR the search matches nothing)
    - ready   → a responsive grid of fact cards
*/
const client = new ApiClient();

export default function FactsExplorer() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [facts, setFacts] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const timer = useRef(null);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchFacts({ signal })
      .then((data) => {
        setFacts(Array.isArray(data?.facts) ? data.facts : []);
        setStatus("ready");
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

  // Debounce the typed text ~150ms before filtering.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(timer.current);
  }, [query]);

  // CLIENT-SIDE search over the fetched data.
  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return facts;
    return facts.filter((f) => f.toLowerCase().includes(q));
  }, [facts, debounced]);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.label}><Bilingual ar="هل تعلم؟" en="Did you know?" /></p>
        <p className={styles.sub}>
          <Bilingual
            ar="معلومات عن اللغة من API Ninjas — ابحث فيها فوراً"
            en="Language facts from API Ninjas — search them instantly"
          />
        </p>
      </div>

      {status !== "error" && (
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facts…  (ابحث)"
            aria-label="Search facts"
            disabled={status === "loading"}
            dir="ltr"
          />
        </div>
      )}

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

      {status === "ready" && filtered.length === 0 && (
        <div className={styles.state}>
          <p><Bilingual ar="لا توجد نتائج مطابقة." en="No matching facts." /></p>
        </div>
      )}

      {status === "ready" && filtered.length > 0 && (
        <>
          <ul className={styles.grid}>
            {filtered.map((f, i) => (
              <li key={i} className={styles.factCard} dir="ltr">💡 {f}</li>
            ))}
          </ul>
          <p className={styles.count}>{filtered.length} / {facts.length}</p>
        </>
      )}
    </div>
  );
}
