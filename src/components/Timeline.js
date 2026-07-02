import Bilingual from "./Bilingual";
import { journeyStages } from "@/lib/data/journey";
import styles from "./Timeline.module.css";

/*
  Timeline — the Learning Journey. This is Mary's assigned custom UI
  requirement. It renders the eight journey stages as connected nodes:
    - Desktop: a horizontal row (Flexbox) linked by a single track line,
      flowing right → left because the page is RTL.
    - Mobile: a vertical "road" with the line running down the start side.

  Pass `highlightStageId` to mark one stage as "أنت هنا (you are here)" with a
  glowing gold border. Step 4 (the placement test) passes the learner's result
  here so the timeline shows exactly where they land.
*/
export default function Timeline({ highlightStageId = null }) {
  return (
    <ol className={styles.track}>
      {journeyStages.map((stage, index) => {
        const isActive = stage.id === highlightStageId;
        return (
          <li
            key={stage.id}
            className={`${styles.stage} ${isActive ? styles.active : ""}`}
            data-reveal
            aria-current={isActive ? "step" : undefined}
          >
            <div className={styles.node}>
              <span className={styles.icon} aria-hidden="true">{stage.icon}</span>
              <span className={styles.num}>{index + 1}</span>
            </div>

            <div className={styles.card}>
              {isActive && <span className={styles.youAreHere}>أنت هنا</span>}
              <h3 className={styles.stageTitle}>
                <Bilingual ar={stage.ar} en={stage.en} />
              </h3>
              <p className={styles.stageDesc}>{stage.desc}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
