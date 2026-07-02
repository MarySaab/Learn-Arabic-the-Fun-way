"use client";

import { useState } from "react";
import Link from "next/link";
import Bilingual from "./Bilingual";
import { journeyStages, stageLessons } from "@/lib/data/journey";
import { lessons } from "@/lib/data/lessons";
import { toArabicDigits } from "@/lib/format";
import styles from "./Timeline.module.css";

/*
  Timeline — the Learning Journey. This is Mary's assigned custom UI
  requirement. It renders the eight journey stages as connected nodes:
    - Desktop: a horizontal row (Flexbox) linked by a single track line,
      flowing right → left because the page is RTL.
    - Mobile: a vertical "road" with the line running down the start side.

  Pass `highlightStageId` to mark one stage as "أنت هنا (you are here)" with a
  glowing gold border — the placement test passes the learner's result here.

  INTERACTIVE: clicking a stage opens a panel underneath showing the lessons
  that belong to that stage, each linking to its lesson page — so the timeline
  is a real navigation hub, not decoration.
*/
export default function Timeline({ highlightStageId = null }) {
  const [openStageId, setOpenStageId] = useState(null);

  const openStage = journeyStages.find((s) => s.id === openStageId);
  const openLessons = openStageId
    ? (stageLessons[openStageId] || [])
        .map((slug) => lessons.find((l) => l.slug === slug))
        .filter(Boolean)
    : [];

  const toggle = (id) => setOpenStageId((cur) => (cur === id ? null : id));

  return (
    <div>
      <ol className={styles.track}>
        {journeyStages.map((stage, index) => {
          const isActive = stage.id === highlightStageId;
          const isOpen = stage.id === openStageId;
          return (
            <li
              key={stage.id}
              className={`${styles.stage} ${isActive ? styles.active : ""} ${isOpen ? styles.open : ""}`}
              data-reveal
              aria-current={isActive ? "step" : undefined}
            >
              <button
                type="button"
                className={styles.stageBtn}
                onClick={() => toggle(stage.id)}
                aria-expanded={isOpen}
              >
                <span className={styles.node}>
                  <span className={styles.icon} aria-hidden="true">{stage.icon}</span>
                  <span className={styles.num}>{toArabicDigits(index + 1)}</span>
                </span>

                <span className={styles.card}>
                  {isActive && <span className={styles.youAreHere}>أنت هنا</span>}
                  <span className={styles.stageTitle}>
                    <Bilingual ar={stage.ar} en={stage.en} />
                  </span>
                  <span className={styles.stageDesc}>{stage.desc}</span>
                  <span className={styles.hint} aria-hidden="true">
                    {isOpen ? "أغلق ▲" : "اعرض الدروس ▼"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* the open stage's lessons */}
      {openStage && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>
            {openStage.icon} دروس مرحلة «{openStage.ar}»
          </h3>
          {openLessons.length > 0 ? (
            <ul className={styles.panelList}>
              {openLessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link href={`/lessons/${lesson.slug}`} className={styles.panelLink}>
                    <span aria-hidden="true">{lesson.icon}</span>
                    <Bilingual ar={lesson.title_ar} en={lesson.title_en} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.panelEmpty}>
              👑 مرحلة الإتقان تجمع كلّ ما سبق: محادثة، وقراءة حرّة، وتعبير — مع مريانا مباشرةً.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
