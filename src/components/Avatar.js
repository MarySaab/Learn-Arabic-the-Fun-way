"use client";

import { useState } from "react";
import styles from "./Avatar.module.css";

/*
  Avatar — shows a circular photo, and falls back to styled initials if the
  image is missing or fails to load. This lets the "Meet Mariana" section look
  finished even before Mary drops her real photo into public/images/. Once
  public/images/mariana.jpg exists, it appears automatically — no code change.
*/
export default function Avatar({ src, alt = "", initials = "م", size = 220 }) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      {failed ? (
        <span className={styles.initials} aria-label={alt || undefined}>
          {initials}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
