import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import Avatar from "@/components/Avatar";
import Timeline from "@/components/Timeline";
import QuoteOfDay from "@/components/QuoteOfDay";
import FactCard from "@/components/FactCard";
import HeroArt from "@/components/HeroArt";
import TestPreview from "@/components/TestPreview";
import WelcomeAudio from "@/components/WelcomeAudio";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import { stageIdForLevel } from "@/lib/data/journey";
import { lessons } from "@/lib/data/lessons";
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

// Why learn Arabic at all — speaks to international students & professionals.
const WHY_ARABIC = [
  { icon: "🌍", ar: "لغة ٤٠٠+ مليون إنسان", en: "400M+ speakers", desc: "تُتحدَّث في أكثر من ٢٥ دولة، وهي من اللغات الستّ الرسمية للأمم المتحدة." },
  { icon: "📜", ar: "بوّابة حضارة عريقة", en: "A rich civilization", desc: "أدب وشعر وتاريخ وعلوم — كنوز تُقرأ في لغتها الأصلية." },
  { icon: "💼", ar: "ميزة مهنيّة حقيقية", en: "Career advantage", desc: "مطلوبة في الأعمال والدبلوماسية والإعلام والسياحة." },
  { icon: "🕌", ar: "سفر أغنى وتواصل أعمق", en: "Travel & connect", desc: "من المغرب إلى الخليج: افهم الناس وتحدّث إليهم بلغتهم." },
];

// What the platform itself offers (features grid).
const FEATURES = [
  { icon: "🧭", ar: "اختبار مستوى بأربع مهارات", en: "4-skill placement test" },
  { icon: "📚", ar: "دروس تفاعلية بالصوت", en: "Interactive audio lessons" },
  { icon: "🎮", ar: "ألعاب تعليمية ممتعة", en: "Learning games" },
  { icon: "🎧", ar: "استماع وإملاء وتسجيل صوتي", en: "Listening, dictation & recording" },
  { icon: "🏅", ar: "تتبّع تقدّمك ونجومك", en: "Progress & rewards" },
  { icon: "🇬🇧", ar: "زرّ الإنجليزية للطلاب الأجانب", en: "English toggle" },
];

// Hand-picked lessons to showcase on the home page.
const FEATURED_SLUGS = ["arabic-alphabet", "sun-moon-letters", "nominal-verbal", "reading-comprehension"];

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

      {/* ---------- INTRODUCTION (bilingual) ---------- */}
      <section className={`container ${styles.introSection}`} data-reveal>
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="منصّة لكلّ من يريد تعلّم العربية" en="A platform for everyone" /></h2>
        </header>
        <div className={styles.introGrid}>
          <div className={styles.introAr}>
            <p>
              «تعلّم مع مريانا» منصّةٌ صُمّمت للجميع: للطلاب الأجانب والسيّاح
              والمهنيّين وطلّاب الجامعات، وللناطقين بالعربية الراغبين في صقل
              لغتهم — وحتى لمن لا يعرف حرفاً واحداً. مهما كانت نقطة انطلاقك،
              ستجد هنا طريقاً واضحاً يأخذك خطوةً بخطوة من الصفر إلى الإتقان.
            </p>
            <p>
              التعلّم الحقيقي يحدث في <strong>الحصص المباشرة مع مريانا</strong> —
              فرديّة أو ضمن مجموعة مستواك — مرّةً أو مرّتين أو ثلاثاً في
              الأسبوع بحسب ما يناسبك، عبر Google Meet. أمّا هذا الموقع فهو
              <strong> رفيقك بين الحصص</strong>: كلّ ما تتعلّمه في الحصّة تجده هنا
              دروساً تفاعلية وألعاباً واختبارات، تراجع بها وتثبّت الأفكار على
              مدار الأسبوع، ومريانا تتابع إنجازك لواجباتك.
            </p>
          </div>
          <div className={styles.introEn} dir="ltr" lang="en">
            <p>
              <em>Learn with Mariana</em> is built for everyone: international
              students, tourists, professionals, university students, Arabic
              speakers polishing their language — and complete beginners who
              don&apos;t know a single letter yet. Wherever you start, there is a
              clear path that takes you step by step from zero to mastery.
            </p>
            <p>
              The real learning happens in <strong>live lessons with Mariana</strong> —
              one-on-one or in a group at your level, one to three times a week
              (you choose), over Google Meet. This website is your
              <strong> companion between lessons</strong>: everything taught in class
              lives here as interactive lessons, games, and quizzes, so you can
              review and consolidate all week — and Mariana can see that you did
              your homework.
            </p>
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
          <WelcomeAudio />
        </div>
      </section>

      {/* ---------- WHY LEARN ARABIC ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="لماذا تتعلّم العربية؟" en="Why learn Arabic?" /></h2>
          </header>
          <div className={styles.benefits}>
            {WHY_ARABIC.map((w) => (
              <div key={w.ar} className={styles.benefit} data-reveal>
                <span className={styles.benefitIcon} aria-hidden="true">{w.icon}</span>
                <h3><Bilingual ar={w.ar} en={w.en} /></h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
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

      {/* ---------- STATS BAND ---------- */}
      <section className={`container ${styles.statsBand}`} data-reveal>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(18)}+</span>
          <span className={styles.statLabel}><Bilingual ar="درساً تفاعلياً" en="Interactive lessons" /></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(4)}</span>
          <span className={styles.statLabel}><Bilingual ar="مهارات لغوية" en="Language skills" /></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(8)}</span>
          <span className={styles.statLabel}><Bilingual ar="محطات في الرحلة" en="Journey stages" /></span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{toArabicDigits(10)}+</span>
          <span className={styles.statLabel}><Bilingual ar="ألعاب وقصص تفاعلية" en="Games & stories" /></span>
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

      {/* ---------- PLATFORM FEATURES ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="ماذا تجد في المنصّة؟" en="Platform features" /></h2>
        </header>
        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.ar} className={styles.feature} data-reveal>
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <span className={styles.featureText}>
                <Bilingual ar={f.ar} en={f.en} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PLACEMENT TEST PREVIEW ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="اختبر نفسك في ثوانٍ" en="Try the test" /></h2>
            <p>ذُق طعم اختبار تحديد المستوى قبل أن تبدأه.</p>
          </header>
          <TestPreview />
        </div>
      </section>

      {/* ---------- FEATURED LESSONS ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="دروس مختارة" en="Featured lessons" /></h2>
        </header>
        <div className={styles.featuredGrid}>
          {FEATURED_SLUGS.map((slug) => {
            const lesson = lessons.find((l) => l.slug === slug);
            if (!lesson) return null;
            return (
              <Link key={slug} href={`/lessons/${slug}`} className={styles.featuredCard} data-reveal>
                <span className={styles.featuredIcon} aria-hidden="true">{lesson.icon}</span>
                <span className={styles.featuredTitle}>
                  <Bilingual ar={lesson.title_ar} en={lesson.title_en} />
                </span>
                <span className={styles.featuredGo} aria-hidden="true">←</span>
              </Link>
            );
          })}
        </div>
        <p className={styles.moreLink}>
          <Link href="/lessons">عرض كلّ الدروس — ١٨ درساً ←</Link>
        </p>
      </section>

      {/* ---------- INTERACTIVE GAMES & SKILLS ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="ألعاب وقصص تفاعلية" en="Games & stories" /></h2>
            <p>تعلّمٌ يشبه اللعب: ألعاب قواعد وإملاء، وقصص تدرّب المهارات الأربع.</p>
          </header>
          <div className={styles.gamesRow}>
            {lessons.filter((l) => l.game).map((l) => (
              <Link key={l.slug} href={`/lessons/${l.slug}`} className={styles.gameChip} data-reveal>
                <span aria-hidden="true">{l.icon}</span> {l.title_ar}
              </Link>
            ))}
          </div>
          <p className={styles.moreLink}>
            <Link href="/skills">🎧 مختبر المهارات: أربع قصص كاملة بالاستماع والتحدّث والقراءة والكتابة ←</Link>
          </p>
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

      {/* ---------- FAQ ---------- */}
      <section className={styles.faqSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="أسئلة شائعة" en="FAQ" /></h2>
          </header>
          <div className={styles.faqList}>
            <details className={styles.faq}>
              <summary>لا أعرف أيّ شيء في العربية — هل أستطيع البدء؟</summary>
              <p>نعم! المنصّة مصمّمة لمن يبدأ من الصفر تماماً: رحلة التعلّم تبدأ من الحروف، والحصص المباشرة تُبنى على مستواك أنت.</p>
            </details>
            <details className={styles.faq}>
              <summary>كيف تُحدَّد مجموعتي؟</summary>
              <p>خذ اختبار تحديد المستوى (أربعة أقسام: قراءة وكتابة واستماع وقواعد). تحصل على مستوى عامّ ومستوى لكلّ مهارة، وتضعك مريانا في المجموعة الأنسب.</p>
            </details>
            <details className={styles.faq}>
              <summary>كم حصّة في الأسبوع؟ وأين تُعقد؟</summary>
              <p>مرّة أو مرّتان أو ثلاث في الأسبوع بحسب تفضيلك، عبر Google Meet — فرديّاً أو ضمن مجموعة مستواك.</p>
            </details>
            <details className={styles.faq}>
              <summary>هل الموقع بديل عن الحصص؟</summary>
              <p>لا — الموقع رفيقُ الحصص: تراجع فيه ما تعلّمته، وتتدرّب بالألعاب والاختبارات، ومريانا تتابع تقدّمك بين حصّةٍ وأخرى.</p>
            </details>
            <details className={styles.faq}>
              <summary>كيف أحجز حصّتي الأولى؟</summary>
              <p>خذ الاختبار ثم اضغط «احجز حصّة» — يصلك تأكيد عبر واتساب أو البريد الإلكتروني.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="تواصل مع مريانا" en="Contact" /></h2>
          <p>سؤال؟ استفسار عن المواعيد أو المستويات؟ مريانا يسعدها أن تسمع منك.</p>
        </header>
        <div className={styles.contactRow}>
          <a className="btn btn-primary" href="https://wa.me/96171297998" target="_blank" rel="noreferrer">
            💬 واتساب
          </a>
          <a className="btn btn-gold" href="mailto:marianasaab50@gmail.com">
            ✉️ marianasaab50@gmail.com
          </a>
          <a className="btn btn-ghost" href="tel:+96171297998" dir="ltr">
            📞 +961 71 297 998
          </a>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className={styles.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className={styles.ctaTitle}>جاهز لبدء رحلتك؟</h2>
          <p className={styles.ctaSub}>
            خمس عشرة دقيقة تكفي لتعرف مستواك وتحجز حصّتك الأولى.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/test" className="btn btn-gold">ابدأ الاختبار الآن</Link>
            <Link href="/book" className={`btn ${styles.heroGhost}`}>احجز حصّة</Link>
          </div>
        </div>
      </section>
    </>
  );
}
