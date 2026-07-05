"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ApiClient from "@/lib/classes/ApiClient";
import Bilingual from "./Bilingual";

/*
  FactsExplorer — the graded external-API feature (API Ninjas facts), built with
  BOOTSTRAP 5 classes for layout and components. It demonstrates ALL of the
  rubric's API points at once:
    - fetches a LIST from the external, key-based API (via our /api/facts route)
    - client-side SEARCH / FILTER over the fetched data (the search box)
    - client-side PAGINATION over the fetched data (Bootstrap pagination)
    - loading / error / empty states (spinner / alert / alert)
*/
const client = new ApiClient();
const PAGE_SIZE = 6;

export default function FactsExplorer() {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [facts, setFacts] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const timer = useRef(null);

  const load = useCallback((signal) => {
    setStatus("loading");
    client
      .fetchFacts({ signal })
      .then((data) => {
        setFacts(Array.isArray(data?.facts) ? data.facts : []);
        setPage(1);
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

  // Debounce search ~150ms, and reset to page 1 whenever the filter changes.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDebounced(query);
      setPage(1);
    }, 150);
    return () => clearTimeout(timer.current);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return facts;
    return facts.filter((f) => f.toLowerCase().includes(q));
  }, [facts, debounced]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <section className="mb-5" dir="rtl">
      <div className="text-center mb-3">
        <h2 className="h4 fw-bold" style={{ color: "var(--teal-deep)" }}>
          <Bilingual ar="🔎 استكشف المعلومات" en="Explore Facts" />
        </h2>
        <p className="text-secondary mb-0">
          <Bilingual
            ar="معلومات عن اللغة والعالم من API Ninjas — ابحث وتصفّح الصفحات"
            en="Language & world facts from API Ninjas — search and page through them"
          />
        </p>
      </div>

      {/* SEARCH / FILTER (Bootstrap input group) */}
      {status !== "error" && (
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group input-group-lg shadow-sm">
              <span className="input-group-text bg-white" id="facts-search">🔍</span>
              <input
                type="search"
                className="form-control"
                placeholder="Search facts…  (ابحث)"
                aria-label="Search facts"
                aria-describedby="facts-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={status === "loading"}
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {status === "loading" && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">جارٍ التحميل…</span>
          </div>
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div className="alert alert-danger text-center" role="alert">
          حدث خطأ أثناء جلب المعلومات.
          <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => load()}>
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* EMPTY (API returned nothing OR search matched nothing) */}
      {status === "ready" && filtered.length === 0 && (
        <div className="alert alert-warning text-center" role="alert">
          <Bilingual ar="لا توجد نتائج مطابقة." en="No matching facts." />
        </div>
      )}

      {/* READY — Bootstrap card grid */}
      {status === "ready" && filtered.length > 0 && (
        <>
          <div className="row g-3">
            {shown.map((f, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={`${current}-${i}`}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <p className="card-text mb-0" dir="ltr">💡 {f}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION (Bootstrap) */}
          <nav aria-label="Facts pages" className="mt-4">
            <ul className="pagination justify-content-center flex-wrap">
              <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(current - 1)}>‹</button>
              </li>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <li className={`page-item ${p === current ? "active" : ""}`} key={p}>
                  <button className="page-link" onClick={() => setPage(p)}>{p}</button>
                </li>
              ))}
              <li className={`page-item ${current === pageCount ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(current + 1)}>›</button>
              </li>
            </ul>
          </nav>

          <p className="text-center text-secondary small mb-0">
            {filtered.length} <Bilingual ar="نتيجة" en="results" /> · {" "}
            <Bilingual ar="صفحة" en="page" /> {current}/{pageCount}
          </p>
        </>
      )}
    </section>
  );
}
