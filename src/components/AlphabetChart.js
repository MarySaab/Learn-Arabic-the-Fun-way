"use client";

import { useState } from "react";
import Bilingual from "./Bilingual";
import { alphabet, formsOf } from "@/lib/data/alphabet";
import styles from "./AlphabetChart.module.css";

/*
  AlphabetChart — the complete 28-letter alphabet for the alphabet lesson.
  A grid of letter buttons; tapping one opens an introduction to that letter:
  its name and sound, an example word, how to write it, and its four
  contextual forms (isolated / start / middle / end of a word).
*/
export default function AlphabetChart() {
  const [selected, setSelected] = useState(alphabet[0]);
  const forms = formsOf(selected);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        <Bilingual ar="الحروف الثمانية والعشرون" en="All 28 letters" />
      </h2>
      <p className={styles.hint}>اضغط على أيّ حرف لتتعرّف عليه وعلى طريقة كتابته.</p>

      {/* letter grid */}
      <div className={styles.grid} role="tablist" aria-label="حروف الأبجدية">
        {alphabet.map((item) => (
          <button
            key={item.letter}
            type="button"
            role="tab"
            aria-selected={selected.letter === item.letter}
            className={`${styles.cell} ${selected.letter === item.letter ? styles.cellActive : ""}`}
            onClick={() => setSelected(item)}
          >
            {item.letter}
          </button>
        ))}
      </div>

      {/* selected letter detail */}
      <div className={styles.detail} key={selected.letter}>
        <div className={styles.detailHead}>
          <span className={styles.bigLetter}>{selected.letter}</span>
          <div>
            <h3 className={styles.letterName}>{selected.name}</h3>
            <p className={styles.sound}>
              الصوت: <b dir="ltr">{selected.sound}</b>
            </p>
            <p className={styles.example}>
              مثال: <b>{selected.word}</b> <span aria-hidden="true">{selected.emoji}</span>
            </p>
          </div>
        </div>

        <p className={styles.tip}>✍️ <b>كيف نكتبه:</b> {selected.tip}</p>
        {selected.connects === false && (
          <p className={styles.noConnect}>
            🔗 هذا الحرف <b>لا يتّصل بما بعده</b> — لذلك شكله في البداية والوسط لا يتغيّر كثيراً.
          </p>
        )}

        <div className={styles.forms}>
          <div className={styles.form}>
            <span className={styles.formLabel}>منفصل</span>
            <span className={styles.formGlyph}>{forms.isolated}</span>
          </div>
          <div className={styles.form}>
            <span className={styles.formLabel}>في البداية</span>
            <span className={styles.formGlyph}>{forms.initial}</span>
          </div>
          <div className={styles.form}>
            <span className={styles.formLabel}>في الوسط</span>
            <span className={styles.formGlyph}>{forms.medial}</span>
          </div>
          <div className={styles.form}>
            <span className={styles.formLabel}>في النهاية</span>
            <span className={styles.formGlyph}>{forms.final}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
