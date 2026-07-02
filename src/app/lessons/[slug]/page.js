import Link from "next/link";
import { notFound } from "next/navigation";
import Bilingual from "@/components/Bilingual";
import LessonView from "@/components/LessonView";
import MarkComplete from "@/components/MarkComplete";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import { lessons, levels } from "@/lib/data/lessons";
import { lessonContent } from "@/lib/data/lessonContent";
import styles from "./page.module.css";

// Pre-render a page for every lesson slug at build time.
export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export function generateMetadata({ params }) {
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (!lesson) return { title: "درس غير موجود" };
  return {
    title: `${lesson.title_ar} | ${lesson.title_en} — تعلّم مع مريانا`,
    description: lesson.desc,
  };
}

export default function LessonPage({ params }) {
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (!lesson) notFound();

  const content = lessonContent[lesson.slug];
  const levelInfo = levels.find((l) => l.id === lesson.level);

  return (
    <section className="container">
      <ScrollRevealClient />

      <Link href="/lessons" className={styles.back}>→ العودة إلى الدروس</Link>

      <header className={styles.header}>
        <span className={styles.headIcon} aria-hidden="true">{lesson.icon}</span>
        <span className={`${styles.pill} ${styles[lesson.level]}`}>
          <Bilingual ar={levelInfo?.ar} en={levelInfo?.en} />
        </span>
        <h1><Bilingual ar={lesson.title_ar} en={lesson.title_en} /></h1>
        <p className={styles.desc}>{content?.intro || lesson.desc}</p>
      </header>

      {/* Interactive practice game (for lessons that have one) */}
      {lesson.game && (
        <div className={styles.gameWrap}>
          <iframe
            className={styles.gameFrame}
            src={`/games/${lesson.game}.html`}
            title={`لعبة ${lesson.title_ar}`}
            loading="lazy"
          />
          <a
            className={styles.gameLink}
            href={`/games/${lesson.game}.html`}
            target="_blank"
            rel="noreferrer"
          >
            ↗ افتح اللعبة في صفحة كاملة
          </a>
          <MarkComplete slug={lesson.slug} />
        </div>
      )}

      {/* Learn + practice quiz (for content lessons) */}
      {content && <LessonView content={content} slug={lesson.slug} />}

      {/* Fallback if a lesson somehow has neither */}
      {!content && !lesson.game && (
        <p style={{ textAlign: "center", color: "var(--teal)" }}>
          هذا الدرس قيد الإعداد. عد قريباً!
        </p>
      )}

      <div className={styles.cta}>
        <Link href={`/book?level=${lesson.level}`} className="btn btn-gold">
          احجز حصّة على هذا المستوى
        </Link>
      </div>
    </section>
  );
}
