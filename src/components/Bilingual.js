"use client";

import { useLanguage } from "./LanguageProvider";

/*
  Usage: <Bilingual ar="الدروس" en="Lessons" />
  Renders:  الدروس            (English off)
            الدروس (Lessons)  (English on)
*/
export default function Bilingual({ ar, en }) {
  const { showEnglish } = useLanguage();
  return (
    <>
      {ar}
      {showEnglish && en ? <span className="en-gloss"> ({en})</span> : null}
    </>
  );
}
