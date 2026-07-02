import Link from "next/link";
import Bilingual from "@/components/Bilingual";
import BiText from "@/components/BiText";
import Avatar from "@/components/Avatar";
import Timeline from "@/components/Timeline";
import QuoteOfDay from "@/components/QuoteOfDay";
import FactCard from "@/components/FactCard";
import HeroArt from "@/components/HeroArt";
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
  {
    text: "بدأتُ من الحروف ووصلتُ إلى قراءة النصوص. طريقة مريانا واضحة وسهلة.",
    en: "I started with the letters and now I read full texts. Mariana's way is clear and easy.",
    name: "ليلى", meta: "طالبة مبتدئة", metaEn: "Beginner student", emoji: "🌸",
  },
  {
    text: "الاختبار وضعني في المستوى المناسب تماماً، فلم أضِع وقتي في دروس أعرفها.",
    en: "The test placed me exactly right, so I didn't waste time on lessons I already knew.",
    name: "كريم", meta: "مستوى C", metaEn: "Level C", emoji: "🧑‍🎓",
  },
  {
    text: "ابنتي أصبحت تحبّ العربيّة! الدروس ممتعة والمتابعة رائعة.",
    en: "My daughter loves Arabic now! The lessons are fun and the follow-up is wonderful.",
    name: "أمّ جود", meta: "وليّة أمر", metaEn: "Parent", emoji: "👩‍👧",
  },
];

// The actual journey a new student takes — shown as three numbered steps.
const STEPS = [
  { icon: "📝", ar: "خذ اختبار المستوى", en: "Take the test", desc: "دقائق قليلة تكشف نقطة انطلاقك على خريطة الرحلة.", descEn: "A few minutes reveal your starting point on the journey map." },
  { icon: "👥", ar: "انضمّ إلى مجموعتك", en: "Join your group", desc: "نضعك في مجموعة تناسب مستواك تماماً.", descEn: "We place you in a group that matches your level exactly." },
  { icon: "💻", ar: "تعلّم وتدرّب أسبوعياً", en: "Learn weekly", desc: "حصّة أسبوعية عبر Google Meet، وتدريبات ممتعة على الموقع.", descEn: "A weekly lesson on Google Meet, plus fun practice on the site." },
];

// Why learn Arabic at all — speaks to international students & professionals.
const WHY_ARABIC = [
  { icon: "🌍", ar: "لغة ٤٠٠+ مليون إنسان", en: "400M+ speakers", desc: "تُتحدَّث في أكثر من ٢٥ دولة، وهي من اللغات الستّ الرسمية للأمم المتحدة.", descEn: "Spoken in 25+ countries, and one of the six official UN languages." },
  { icon: "📜", ar: "بوّابة حضارة عريقة", en: "A rich civilization", desc: "أدب وشعر وتاريخ وعلوم — كنوز تُقرأ في لغتها الأصلية.", descEn: "Literature, poetry, history and science — treasures best read in their own language." },
  { icon: "💼", ar: "ميزة مهنيّة حقيقية", en: "Career advantage", desc: "مطلوبة في الأعمال والدبلوماسية والإعلام والسياحة.", descEn: "In demand across business, diplomacy, media and tourism." },
  { icon: "🕌", ar: "سفر أغنى وتواصل أعمق", en: "Travel & connect", desc: "من المغرب إلى الخليج: افهم الناس وتحدّث إليهم بلغتهم.", descEn: "From Morocco to the Gulf: understand people and speak their language." },
];

// What the platform itself offers (features grid).
const FEATURES = [
  { icon: "🧭", ar: "اختبار مستوى بأربع مهارات", en: "4-skill placement test", desc: "ستة عشر سؤالاً في القراءة والكتابة والإملاء والقواعد — مستوى عامّ ومستوى لكلّ مهارة (A B C D).", descEn: "Sixteen questions across reading, writing, dictation and grammar — an overall level plus a level per skill (A, B, C, D)." },
  { icon: "📚", ar: "دروس تفاعلية", en: "Interactive lessons", desc: "ثمانية عشر درساً بشرحٍ وأمثلةٍ وتمارين تصحَّح فوراً.", descEn: "Eighteen lessons with explanations, examples and instantly-corrected exercises." },
  { icon: "🎮", ar: "ألعاب تعليمية ممتعة", en: "Learning games", desc: "القواعد والإملاء على شكل ألعابٍ بالنجوم والتحدّيات، من موادّ مريانا الحقيقية.", descEn: "Grammar and spelling as games with stars and challenges, built from Mariana's real teaching material." },
  { icon: "🎧", ar: "استماع وإملاء تفاعلي", en: "Listening & dictation", desc: "استمع إلى الجمل واختر ما سمعته تماماً — بصوت مريانا حيث توفّر.", descEn: "Listen to sentences and pick exactly what you heard — in Mariana's own voice where available." },
  { icon: "🏅", ar: "تتبّع تقدّمك ونجومك", en: "Progress & rewards", desc: "علامات إكمال على كلّ درس، ونجوم واحتفالات، وزرّ «تابع من حيث توقّفت».", descEn: "Completion marks, stars and celebrations, and a 'continue where you left off' button." },
  { icon: "🇬🇧", ar: "زرّ الإنجليزية للطلاب الأجانب", en: "English toggle", desc: "زرّ واحد في الأعلى يعرض الترجمة الإنجليزية للعناوين والشروح.", descEn: "One button at the top shows English translations of titles and explanations." },
];

// Hand-picked lessons to showcase on the home page.
const FEATURED_SLUGS = ["arabic-alphabet", "sun-moon-letters", "nominal-verbal", "reading-comprehension"];

// Why parents and students choose Mariana (appeals to mothers especially).
const BENEFITS = [
  { icon: "🛡️", ar: "بيئة آمنة ومحبّة", en: "Safe & caring", desc: "جوّ مشجّع وصبور يشعر فيه المتعلّم بالأمان.", descEn: "An encouraging, patient atmosphere where learners feel safe." },
  { icon: "👩‍🏫", ar: "متابعة فرديّة", en: "Personal attention", desc: "خطّة تناسب مستوى كلّ طالب وهدفه.", descEn: "A plan that fits each student's level and goal." },
  { icon: "🎮", ar: "تعلّم تفاعليّ ممتع", en: "Fun & interactive", desc: "دروس وألعاب تجعل القواعد سهلة ومحبّبة.", descEn: "Lessons and games that make grammar easy to love." },
  { icon: "📈", ar: "تقدّم واضح", en: "Visible progress", desc: "تعرف أين تقف وإلى أين تتّجه في كلّ خطوة.", descEn: "You always know where you stand and where you're heading." },
];

const FAQS = [
  {
    qAr: "لا أعرف أيّ شيء في العربية — هل أستطيع البدء؟",
    qEn: "I don't know any Arabic — can I start?",
    aAr: "نعم! المنصّة مصمّمة لمن يبدأ من الصفر تماماً: رحلة التعلّم تبدأ من الحروف، والحصص المباشرة تُبنى على مستواك أنت.",
    aEn: "Yes! The platform is designed for absolute beginners: the journey starts from the letters, and the live lessons are built around your level.",
  },
  {
    qAr: "كيف تُحدَّد مجموعتي؟",
    qEn: "How is my group decided?",
    aAr: "خذ اختبار تحديد المستوى (أربعة أقسام: قراءة وكتابة وإملاء وقواعد). تحصل على مستوى عامّ ومستوى لكلّ مهارة — A أو B أو C أو D — وتضعك مريانا في المجموعة الأنسب.",
    aEn: "Take the placement test (four sections: reading, writing, dictation, grammar). You get an overall level and a level per skill — A, B, C or D — and Mariana places you in the right group.",
  },
  {
    qAr: "كم حصّة في الأسبوع؟ وأين تُعقد؟",
    qEn: "How many lessons per week, and where?",
    aAr: "مرّة أو مرّتان أو ثلاث في الأسبوع بحسب تفضيلك، عبر Google Meet — فرديّاً أو ضمن مجموعة مستواك.",
    aEn: "One, two or three times a week — your choice — over Google Meet, one-on-one or in a group at your level.",
  },
  {
    qAr: "هل الموقع بديل عن الحصص؟",
    qEn: "Does the website replace the lessons?",
    aAr: "لا — الموقع رفيقُ الحصص: تراجع فيه ما تعلّمته، وتتدرّب بالألعاب والاختبارات، ومريانا تتابع تقدّمك بين حصّةٍ وأخرى.",
    aEn: "No — it's the companion to the lessons: review what you learned, practise with games and quizzes, and Mariana follows your progress in between.",
  },
  {
    qAr: "كيف أحجز حصّتي الأولى؟",
    qEn: "How do I book my first lesson?",
    aAr: "خذ الاختبار ثم اضغط «احجز حصّة» — يصلك تأكيد عبر واتساب أو البريد الإلكتروني.",
    aEn: "Take the test, then tap “Book a session” — you'll get a confirmation via WhatsApp or email.",
  },
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
          <BiText
            className={styles.heroSub}
            ar="دروس خصوصيّة بأسلوب واضح وسهل — من الحروف الأولى إلى القراءة والكتابة بثقة."
            en="Private lessons in a clear, easy style — from your first letters to reading and writing with confidence."
          />
          <div className={styles.heroCtas}>
            <Link href="/test" className="btn btn-gold">
              <Bilingual ar="ابدأ الاختبار" en="Start the test" />
            </Link>
            <Link href="/lessons" className={`btn ${styles.heroGhost}`}>
              <Bilingual ar="تصفّح الدروس" en="Browse lessons" />
            </Link>
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
          <BiText
            ar="مريانا معلّمة لغة عربيّة شغوفة تؤمن بأنّ كلّ متعلّم يستطيع إتقان العربيّة بالخطوة المناسبة له. تجمع بين القواعد الصحيحة والتطبيق العمليّ في جوٍّ مريح ومشجّع."
            en="Mariana is a passionate Arabic teacher who believes every learner can master Arabic with the right next step. She combines solid grammar with hands-on practice in a warm, encouraging atmosphere."
          />
          <BiText
            ar="سواء كنت تبدأ من الحروف أو تصقل قواعدك المتقدّمة، ستجد معها خطّةً واضحةً تناسب مستواك وهدفك."
            en="Whether you're starting from the alphabet or polishing advanced grammar, you'll have a clear plan that fits your level and your goal."
          />
          <WelcomeAudio />
        </div>
      </section>

      {/* ---------- WHY LEARN ARABIC ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="لماذا تتعلّم العربية؟" en="Why learn Arabic?" /></h2>
            <BiText
              ar="العربية ليست مادّةً دراسيةً فحسب — إنها مفتاح عالمٍ كامل من الناس والثقافة والفرص."
              en="Arabic isn't just a school subject — it's the key to a whole world of people, culture and opportunity."
            />
          </header>
          <div className={styles.benefits}>
            {WHY_ARABIC.map((w) => (
              <div key={w.ar} className={styles.benefit} data-reveal>
                <span className={styles.benefitIcon} aria-hidden="true">{w.icon}</span>
                <h3><Bilingual ar={w.ar} en={w.en} /></h3>
                <BiText ar={w.desc} en={w.descEn} />
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
            <BiText
              ar="لأنّ اللغة تُتعلَّم مع إنسانٍ قبل أن تُتعلَّم من كتاب — هذه أربعة أشياء يلمسها كلّ طالبٍ وكلّ أمٍّ منذ الحصّة الأولى."
              en="Language is learned with a person before a book — four things every student and parent feels from the very first lesson."
            />
          </header>
          <div className={styles.benefits}>
            {BENEFITS.map((b) => (
              <div key={b.ar} className={styles.benefit} data-reveal>
                <span className={styles.benefitIcon} aria-hidden="true">{b.icon}</span>
                <h3><Bilingual ar={b.ar} en={b.en} /></h3>
                <BiText ar={b.desc} en={b.descEn} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STATS BAND ---------- */}
      <section className="container" data-reveal>
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="المنصّة بالأرقام" en="At a glance" /></h2>
          <BiText
            ar="لمحة سريعة عمّا ينتظرك داخل «تعلّم مع مريانا»."
            en="A quick look at what's waiting for you inside."
          />
        </header>
        <div className={styles.statsBand}>
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
        </div>
      </section>

      {/* ---------- LEARNING JOURNEY (timeline) ---------- */}
      {/* Custom requirement: Timeline section using CSS Grid/Flexbox */}
      <section className={styles.journey}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="رحلة التعلّم" en="Learning Journey" /></h2>
            <BiText
              ar="ثماني محطّات تأخذك من الحرف الأوّل إلى الإتقان. اكتشف أين تقف بإجراء اختبار المستوى."
              en="Eight stations take you from your first letter to mastery. Take the placement test to see where you stand."
            />
          </header>
          <Timeline highlightStageId={highlightStageId} />
        </div>
      </section>

      {/* ---------- PLATFORM FEATURES ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="ماذا تجد في المنصّة؟" en="Platform features" /></h2>
          <BiText
            ar="كلّ ما تحتاجه لتراجع وتتدرّب وتتقدّم بين حصّةٍ وأخرى."
            en="Everything you need to review, practise and progress between lessons."
          />
        </header>
        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.ar} className={styles.feature} data-reveal>
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <span className={styles.featureBody}>
                <span className={styles.featureText}>
                  <Bilingual ar={f.ar} en={f.en} />
                </span>
                <BiText className={styles.featureDesc} ar={f.desc} en={f.descEn} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- FEATURED LESSONS ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="دروس مختارة" en="Featured lessons" /></h2>
          <BiText
            ar="أربع بوّابات مختلفة للدخول إلى العربية: من حروفك الأولى إلى قراءة النصوص وفهمها."
            en="Four doorways into Arabic: from your first letters to reading and understanding texts."
          />
        </header>
        <div className={styles.featuredGrid}>
          {FEATURED_SLUGS.map((slug) => {
            const lesson = lessons.find((l) => l.slug === slug);
            if (!lesson) return null;
            return (
              <Link key={slug} href={`/lessons/${slug}`} className={styles.featuredCard} data-reveal>
                <span className={styles.featuredIcon} aria-hidden="true">{lesson.icon}</span>
                <span className={styles.featuredBody}>
                  <span className={styles.featuredTitle}>
                    <Bilingual ar={lesson.title_ar} en={lesson.title_en} />
                  </span>
                  <span className={styles.featuredDesc}>{lesson.desc}</span>
                </span>
                <span className={styles.featuredGo} aria-hidden="true">←</span>
              </Link>
            );
          })}
        </div>
        <p className={styles.moreLink}>
          <Link href="/lessons">
            <Bilingual ar="عرض كلّ الدروس — ١٨ درساً" en="See all 18 lessons" /> ←
          </Link>
        </p>
      </section>

      {/* ---------- INTERACTIVE GAMES & SKILLS ---------- */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <header className={styles.sectionHead}>
            <h2><Bilingual ar="ألعاب وقصص تفاعلية" en="Games & stories" /></h2>
            <BiText
              ar="تعلّمٌ يشبه اللعب: ألعاب قواعد وإملاء، وقصص تدرّب الاستماع والقراءة والكتابة."
              en="Learning that feels like play: grammar and spelling games, plus stories that train listening, reading and writing."
            />
          </header>
          <div className={styles.gamesRow}>
            {lessons.filter((l) => l.game).map((l) => (
              <Link key={l.slug} href={`/lessons/${l.slug}`} className={styles.gameChip} data-reveal>
                <span aria-hidden="true">{l.icon}</span>{" "}
                <Bilingual ar={l.title_ar} en={l.title_en} />
              </Link>
            ))}
          </div>
          <p className={styles.moreLink}>
            <Link href="/skills">
              🎧 <Bilingual ar="مختبر المهارات: قصص كاملة بالاستماع والقراءة والكتابة" en="Skills Lab: full stories with listening, reading & writing" /> ←
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- HOW IT WORKS (3 steps) ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="كيف تسير الرحلة؟" en="How it works" /></h2>
          <BiText
            ar="ثلاث خطوات فقط تفصلك عن أوّل حصّة — وكلّ خطوة تأخذ دقائق، لا أيّاماً."
            en="Only three steps between you and your first lesson — each takes minutes, not days."
          />
        </header>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.ar} className={styles.step} data-reveal>
              <span className={styles.stepNum}>{toArabicDigits(i + 1)}</span>
              <span className={styles.stepIcon} aria-hidden="true">{step.icon}</span>
              <h3><Bilingual ar={step.ar} en={step.en} /></h3>
              <BiText ar={step.desc} en={step.descEn} />
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- DAILY: Quote (Arabic) + Fact (API Ninjas) ---------- */}
      <section className={`container ${styles.dailySection}`} data-reveal>
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="جرعتك اليومية" en="Your daily dose" /></h2>
          <BiText
            ar="اقتباس عربيّ عن العلم يلهمك، ومعلومة طريفة بالإنجليزية — يتجدّدان مع كلّ زيارة."
            en="An Arabic quote about learning, and a fun fact in English — fresh on every visit."
          />
        </header>
        <div className={styles.dailyGrid}>
          <QuoteOfDay />
          <FactCard />
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="آراء المتعلّمين وأولياء الأمور" en="Testimonials" /></h2>
          <BiText
            ar="أفضل من يصف التجربة من عاشها: طلابٌ بدأوا من الصفر، وأهالٍ يتابعون تقدّم أولادهم."
            en="The best people to describe the experience are the ones living it — students and parents alike."
          />
        </header>
        <div className={styles.quoteGrid}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={styles.quote} data-reveal>
              <div className={styles.quoteMark} aria-hidden="true">”</div>
              <blockquote className={styles.quoteText}>
                <BiText ar={t.text} en={t.en} />
              </blockquote>
              <figcaption className={styles.quoteFoot}>
                <span className={styles.quoteAvatar} aria-hidden="true">{t.emoji}</span>
                <span>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.quoteMeta}>
                    <Bilingual ar={t.meta} en={t.metaEn} />
                  </span>
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
            <BiText
              ar="أكثر ما يسألنا عنه الطلاب والأهالي قبل البدء — اضغط على السؤال لتظهر إجابته."
              en="What students and parents ask most before starting — tap a question to see its answer."
            />
          </header>
          <div className={styles.faqList}>
            {FAQS.map((f) => (
              <details key={f.qAr} className={styles.faq}>
                <summary><Bilingual ar={f.qAr} en={f.qEn} /></summary>
                <BiText ar={f.aAr} en={f.aEn} />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="container">
        <header className={styles.sectionHead}>
          <h2><Bilingual ar="تواصل مع مريانا" en="Contact" /></h2>
          <BiText
            ar="سؤال؟ استفسار عن المواعيد أو المستويات؟ مريانا يسعدها أن تسمع منك."
            en="A question about schedules or levels? Mariana would love to hear from you."
          />
        </header>
        <div className={styles.contactRow}>
          <a className="btn btn-primary" href="https://wa.me/96171297998" target="_blank" rel="noreferrer">
            💬 <Bilingual ar="واتساب" en="WhatsApp" />
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
          <h2 className={styles.ctaTitle}>
            <Bilingual ar="جاهز لبدء رحلتك؟" en="Ready to start?" />
          </h2>
          <BiText
            className={styles.ctaSub}
            ar="خمس عشرة دقيقة تكفي لتعرف مستواك وتحجز حصّتك الأولى."
            en="Fifteen minutes is all it takes to find your level and book your first lesson."
          />
          <div className={styles.heroCtas}>
            <Link href="/test" className="btn btn-gold">
              <Bilingual ar="ابدأ الاختبار الآن" en="Start now" />
            </Link>
            <Link href="/book" className={`btn ${styles.heroGhost}`}>
              <Bilingual ar="احجز حصّة" en="Book a session" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
