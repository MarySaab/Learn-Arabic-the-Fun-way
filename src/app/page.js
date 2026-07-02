import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import Avatar from "@/components/Avatar";
import Timeline from "@/components/Timeline";
import QuoteOfDay from "@/components/QuoteOfDay";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import { stageIdForLevel } from "@/lib/data/journey";
import styles from "./page.module.css";

/*
  Illustrative testimonials — clearly fictional sample quotes used to show the
  card layout. Replace with real ones (with permission) before submitting.
*/
const TESTIMONIALS = [
  { text: "بدأتُ من الحروف ووصلتُ إلى قراءة النصوص. طريقة مريانا صبورة وواضحة.", name: "ليلى", meta: "طالبة مبتدئة" },
  { text: "الاختبار وضعني في المستوى المناسب تماماً، فلم أضِع وقتي في دروس أعرفها.", name: "كريم", meta: "مستوى متوسّط" },
  { text: "أحببتُ الخطّ الزمنيّ — أرى تماماً أين أنا وإلى أين أتّجه.", name: "سارة", meta: "مستوى أساسي" },
];

export default function HomePage({ searchParams }) {
  // Optional deep link from the placement-test result, e.g. /?level=intermediate
  // highlights where the learner lands on the timeline.
  const highlightStageId = stageIdForLevel(searchParams?.level);

  return (
    <>
      {/* starts the fade-in-on-scroll behaviour for [data-reveal] elements */}
      <ScrollRevealClient />

      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroKicker}>✦ تعلّم مع مريانا ✦</p>
          <h1>رحلتك نحو إتقان اللغة العربية تبدأ من هنا</h1>
          <p className={styles.heroSub}>
            دروس خصوصيّة بأسلوب واضح وصبور — من الحروف الأولى إلى القراءة والكتابة بثقة.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/test" className="btn btn-gold">ابدأ الاختبار</Link>
            <Link href="/lessons" className={`btn ${styles.heroGhost}`}>تصفّح الدروس</Link>
          </div>
        </div>
      </section>

      {/* ---------- MEET MARIANA ---------- */}
      <section className={`container ${styles.meet}`} data-reveal>
        <Avatar src="/images/mariana.jpg" alt="صورة المعلّمة مريانا" initials="م" />
        <div className={styles.meetBody}>
          <h2><Bilingual ar="تعرّف على مريانا" en="Meet Mariana" /></h2>
          <p>
            مريانا معلّمة لغة عربيّة شغوفة تؤمن بأنّ كلّ متعلّم يستطيع إتقان العربيّة
            بالخطوة المناسبة له. تجمع بين القواعد الصحيحة والتطبيق العمليّ في جوٍّ
            مريح ومشجّع.
          </p>
          <p>
            سواء كنت تبدأ من الحروف أو تصقل قواعدك المتقدّمة، ستجد معها خطّةً واضحةً
            تناسب مستواك وهدفك.
          </p>
        </div>
      </section>

      {/* ---------- LEARNING JOURNEY (timeline) ---------- */}
      {/* Custom requirement: Timeline section using CSS Grid/Flexbox */}
      <section className={styles.journey}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="رحلة التعلّم" en="Learning Journey" /></h2>
            <p>ثماني محطّات تأخذك من الحرف الأوّل إلى الإتقان. اكتشف أين تقف بإجراء اختبار المستوى.</p>
          </header>
          <Timeline highlightStageId={highlightStageId} />
        </div>
      </section>

      {/* ---------- QUOTE OF THE DAY (API Ninjas) ---------- */}
      <section className="container" data-reveal>
        <QuoteOfDay />
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="آراء المتعلّمين" en="Testimonials" /></h2>
        </header>
        <div className={styles.quoteGrid}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={styles.quote} data-reveal>
              <div className={styles.quoteMark} aria-hidden="true">”</div>
              <blockquote className={styles.quoteText}>{t.text}</blockquote>
              <figcaption>
                <p className={styles.quoteName}>{t.name}</p>
                <p className={styles.quoteMeta}>{t.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
