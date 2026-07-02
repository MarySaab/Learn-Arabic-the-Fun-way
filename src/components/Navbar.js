"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Bilingual from "./Bilingual";
import { useLanguage } from "./LanguageProvider";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", ar: "الرئيسية", en: "Home" },
  { href: "/test", ar: "اختبار المستوى", en: "Placement Test" },
  { href: "/lessons", ar: "الدروس", en: "Lessons" },
  { href: "/book", ar: "احجز حصّة", en: "Book a Session" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { showEnglish, toggleEnglish } = useLanguage();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="التنقل الرئيسي">
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true">✦</span>
          <span className={styles.brandText}>تعلّم مع مريانا</span>
        </Link>

        <button
          className={styles.burger}
          aria-label="فتح القائمة"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          <ul className={styles.links}>
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <Bilingual ar={link.ar} en={link.en} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            className={styles.langToggle}
            onClick={toggleEnglish}
            aria-pressed={showEnglish}
          >
            {showEnglish ? "إخفاء الإنجليزية" : "English"}
          </button>
        </div>
      </nav>
    </header>
  );
}
