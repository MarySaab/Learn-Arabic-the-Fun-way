"use client";

import Link from "next/link";
import Bilingual from "./Bilingual";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <div className={styles.brand}>
            <span aria-hidden="true">✦</span> تعلّم مع مريانا
          </div>
          <p className={styles.tagline}>
            رحلتك نحو إتقان اللغة العربية تبدأ من هنا.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.heading}>
            <Bilingual ar="روابط سريعة" en="Quick Links" />
          </h4>
          <ul className={styles.list}>
            <li><Link href="/"><Bilingual ar="الرئيسية" en="Home" /></Link></li>
            <li><Link href="/test"><Bilingual ar="اختبار المستوى" en="Placement Test" /></Link></li>
            <li><Link href="/lessons"><Bilingual ar="الدروس" en="Lessons" /></Link></li>
            <li><Link href="/skills"><Bilingual ar="المهارات" en="Skills Lab" /></Link></li>
            <li><Link href="/book"><Bilingual ar="احجز حصّة" en="Book a Session" /></Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.heading}>
            <Bilingual ar="تواصل معنا" en="Contact" />
          </h4>
          <ul className={styles.list}>
            <li><a href="mailto:marianasaab50@gmail.com">marianasaab50@gmail.com</a></li>
            <li><a href="tel:+96171297998" dir="ltr">+961 71 297 998</a></li>
          </ul>
          <div className={styles.social} aria-label="طرق التواصل">
            <a href="https://wa.me/96171297998" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">💬</a>
            <a href="mailto:marianasaab50@gmail.com" aria-label="البريد الإلكتروني" title="Email">✉️</a>
            <a href="tel:+96171297998" aria-label="اتصال" title="Phone">📞</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {year} تعلّم مع مريانا</span>
      </div>
    </footer>
  );
}
