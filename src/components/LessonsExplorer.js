"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Bilingual from "./Bilingual";
import LessonCatalog from "@/lib/classes/LessonCatalog";
import { lessons as allLessons, levels } from "@/lib/data/lessons";
import styles from "./LessonsExplorer.module.css";

/*
  LessonsExplorer — the interactive part of the Lessons page. It drives an
  instance of the LessonCatalog class and shows:
    - a live search box (debounced ~150ms) that filters by Arabic OR English title
    - level filter buttons (الكل / مبتدئ / أساسي / متوسّط / متقدّم)
    - a responsive grid of lesson cards rendered FROM the class output
    - the three required states: loading (skeletons), and empty ("لا توجد نتائج")
  Lessons that have an interactive practice game show a "العب" link.
*/
export default function LessonsExplorer() {
  // One catalog instance for the component's lifetime.
  const catalog = useMemo(() => new LessonCatalog(allLessons), []);

  const [status, setStatus] = useState("loading"); // "loading" | "ready"
  const [text, setText] = useState("");            // what the user typed
  const [debounced, setDebounced] = useState("");  // debounced query
  const [level, setLevel] = useState("all");
  const timer = useRef(null);

  // Brief skeleton on first mount so the loading state is visible.
  useEffect(() => {
    const t = setTimeout(() => setStatus("ready"), 350);
    return () => clearTimeout(t);
  }, []);

  // Debounce the typed text by ~150ms before querying.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(text), 150);
    return () => clearTimeout(timer.current);
  }, [text]);

  const results = useMemo(
    () => catalog.query({ text: debounced, level }),
    [catalog, debounced, level]
  );

  return (
    <div>
      {/* ---- Controls: search + level filters ---- */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            className={styles.search}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="ابحث عن درس… (Search lessons)"
            aria-label="ابحث عن درس"
          />
        </div>

        <div className={styles.filters} role="group" aria-label="تصفية حسب المستوى">
          <button
            className={`${styles.filterBtn} ${level === "all" ? styles.filterActive : ""}`}
            onClick={() => setLevel("all")}
            aria-pressed={level === "all"}
          >
            <Bilingual ar="الكل" en="All" />
          </button>
          {levels.map((lv) => (
            <button
              key={lv.id}
              className={`${styles.filterBtn} ${level === lv.id ? styles.filterActive : ""}`}
              onClick={() => setLevel(lv.id)}
              aria-pressed={level === lv.id}
            >
              <Bilingual ar={lv.ar} en={lv.en} />
            </button>
          ))}
        </div>
      </div>

      {/* ---- Loading state: skeleton cards ---- */}
      {status === "loading" && (
        <div className={styles.grid} aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {/* ---- Empty state ---- */}
      {status === "ready" && results.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">🪶</div>
          <p><Bilingual ar="لا توجد نتائج" en="No results found" /></p>
        </div>
      )}

      {/* ---- Results ---- */}
      {status === "ready" && results.length > 0 && (
        <ul className={styles.grid}>
          {results.map((lesson) => (
            <li key={lesson.id} className={styles.card} data-reveal>
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">{lesson.icon}</span>
                <span className={`${styles.pill} ${styles[lesson.level]}`}>
                  <Bilingual
                    ar={levels.find((l) => l.id === lesson.level)?.ar}
                    en={levels.find((l) => l.id === lesson.level)?.en}
                  />
                </span>
              </div>
              <h3 className={styles.cardTitle}>
                <Bilingual ar={lesson.title_ar} en={lesson.title_en} />
              </h3>
              <p className={styles.cardDesc}>{lesson.desc}</p>
              {lesson.game && (
                <a
                  className={styles.playLink}
                  href={`/games/${lesson.game}.html`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▶ <Bilingual ar="العب وتدرّب" en="Play & Practice" />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Count summary */}
      {status === "ready" && (
        <p className={styles.count}>
          {results.length} <Bilingual ar="درساً" en="lessons" />
        </p>
      )}
    </div>
  );
}
