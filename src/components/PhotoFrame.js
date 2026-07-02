"use client";

import { useState } from "react";
import styles from "./PhotoFrame.module.css";

/*
  PhotoFrame — a rectangular photo slot that shows a real image if it exists,
  or a friendly labelled placeholder if it doesn't. This lets the page look
  finished now; Mary just drops the real photos into /public/images/ later and
  they appear automatically — no code change.
*/
export default function PhotoFrame({ src, alt = "", label = "أضف صورة", emoji = "📷" }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={styles.frame}>
      {failed ? (
        <div className={styles.placeholder}>
          <span className={styles.emoji} aria-hidden="true">{emoji}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
