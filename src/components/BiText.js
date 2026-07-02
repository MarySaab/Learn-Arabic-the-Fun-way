"use client";

import { useLanguage } from "./LanguageProvider";

/*
  BiText — a bilingual paragraph. Shows the Arabic text always; when the
  visitor turns the English toggle on (navbar), the full English translation
  appears right under it. This is how every explanation on the site becomes
  readable for someone who doesn't know Arabic yet.

  Usage: <BiText ar="نصّ عربي" en="English text" className={styles.x} />
*/
export default function BiText({ ar, en, className }) {
  const { showEnglish } = useLanguage();
  return (
    <>
      <p className={className}>{ar}</p>
      {showEnglish && en ? (
        <p
          className={`${className ? className + " " : ""}lwm-en`}
          dir="ltr"
          lang="en"
        >
          {en}
        </p>
      ) : null}
    </>
  );
}
