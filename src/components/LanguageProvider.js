"use client";

import { createContext, useContext, useEffect, useState } from "react";

/*
  The site is Arabic-first. English appears only as a parenthetical gloss,
  toggled by a single button in the navbar. We keep that on/off state here
  and remember the visitor's choice in localStorage.
*/
const LanguageContext = createContext({
  showEnglish: false,
  toggleEnglish: () => {},
});

export function LanguageProvider({ children }) {
  const [showEnglish, setShowEnglish] = useState(false);

  // Restore the saved preference after the component mounts (client only).
  useEffect(() => {
    const saved = localStorage.getItem("lwm-show-english");
    if (saved === "true") setShowEnglish(true);
  }, []);

  const toggleEnglish = () => {
    setShowEnglish((prev) => {
      const next = !prev;
      localStorage.setItem("lwm-show-english", String(next));
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ showEnglish, toggleEnglish }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
