import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import Avatar from "@/components/Avatar";
import Timeline from "@/components/Timeline";
import QuoteOfDay from "@/components/QuoteOfDay";
import FactCard from "@/components/FactCard";
import HeroArt from "@/components/HeroArt";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import { stageIdForLevel } from "@/lib/data/journey";
import { toArabicDigits } from "@/lib/format";
import styles from "./page.module.css";

/*
  Illustrative testimonials — clearly fictional sample quotes used to show the
  card layout. Replace with real ones (with permission) before submitting.
*/
const TESTIMONIALS = [
  { text: "بدأتُ من الحروف ووصلتُ إلى قراءة النصوص. طريقة مريانا صبورة وواضحة.", name: "ليلى", meta: "طالبة مبتدئة", emoji: "🌸" },
  { text: "الاختبار وضعني في المستوى المناسب تماماً، فلم أضِع وقتي في دروس أعرفها.", name: "كريم", meta: "مستوى متوسّط", emoji: "🧑‍🎓" },
  { text: "ابنتي أصبحت تحبّ العربيّة! الدروس ممتعة والمتابعة رائعة.", name: "أمّ جود", meta: "وليّة أمر", emoji: "👩‍👧" },
];

// The actual journey a new student takes — shown as three numbered steps.
const STEPS = [
  { icon: "📝", ar: "خذ اختبار المستوى", en: "Take the test", desc: "دقائق قليلة تكشف نقطة انطلاقك على خريطة الرحلة." },
  { icon: "👥", ar: "انضمّ إلى مجموعتك", en: "Join your group", desc: "نضعك في مجموعة تناسب مستواك تماماً." },
  { icon: "💻", ar: "تعلّم وتدرّب أسبوعياً", en: "Learn weekly", desc: "حصّة أسبوعية عبر Google Meet، وتدريبات ممتعة على الموقع." },
];

// Why parents and students choose Mariana (appeals to mothers especially).
const BENEFITS = [
  { icon: "🛡️", ar: "بيئة آمنة ومحبّة", en: "Safe & caring", desc: "جوّ مشجّع وصبور يشعر فيه المتعلّم بالأمان." },
  { icon: "👩‍🏫", ar: "متابعة فرديّة", en: "Personal attention", desc: "خطّة تناسب مستوى كلّ طالب وهدفه." },
  { icon: "🎮", ar: "تعلّم تفاعليّ ممتع", en: "Fun & interactive", desc: "دروس وألعاب تجعل القواعد سهلة ومحبّبة." },
  { icon: "📈", ar: "تقدّم واضح", en: "Visible progress", desc: "تعرف أين تقف وإلى أين تتّجه في كلّ خطوة." },
];

export default function HomePage({ searchParams }) {
  // Optional deep link from the placement-test result, e.g. /?level=intermediate
  const highlightStageId = stageIdForLevel(searchParams?.level);

  return (
    <>
      <ScrollRevealClient />

      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        {/* decorative floating Arabic letters */}
        <div className={styles.floaties} aria-hidden="true">
          <span>ا</span><span>ب</span><span>ج</span><span>س</span>
          <span>ع</span><span>ق</span><span>م</span><span>ي</span>
        </div>
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
        <HeroArt className={styles.heroArt} />
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

      {/* ---------- WHY MARIANA (benefits) ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="لماذا تتعلّم مع مريانا؟" en="Why Mariana?" /></h2>
          </header>
          <div className={styles.benefits}>
            {BENEFITS.map((b) => (
              <div key={b.ar} className={styles.benefit} data-reveal>
                <span className={styles.benefitIcon} aria-hidden="true">{b.icon}</span>
                <h3><Bilingual ar={b.ar} en={b.en} /></h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
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

      {/* ---------- HOW IT WORKS (3 steps) ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="كيف تسير الرحلة؟" en="How it works" /></h2>
        </header>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.ar} className={styles.step} data-reveal>
              <span className={styles.stepNum}>{toArabicDigits(i + 1)}</span>
              <span className={styles.stepIcon} aria-hidden="true">{step.icon}</span>
              <h3><Bilingual ar={step.ar} en={step.en} /></h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- DAILY: Quote (Arabic) + Fact (API Ninjas) ---------- */}
      <section className={`container ${styles.dailySection}`} data-reveal>
        <div className={styles.dailyGrid}>
          <QuoteOfDay />
          <FactCard />
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="آراء المتعلّمين وأولياء الأمور" en="Testimonials" /></h2>
        </header>
        <div className={styles.quoteGrid}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={styles.quote} data-reveal>
              <div className={styles.quoteMark} aria-hidden="true">”</div>
              <blockquote className={styles.quoteText}>{t.text}</blockquote>
              <figcaption className={styles.quoteFoot}>
                <span className={styles.quoteAvatar} aria-hidden="true">{t.emoji}</span>
                <span>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.quoteMeta}>{t.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
