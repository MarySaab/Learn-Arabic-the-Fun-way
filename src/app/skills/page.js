import Bilingual from "@/components/Bilingual";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import styles from "./page.module.css";

export const metadata = {
  title: "مختبر المهارات | Skills Lab — تعلّم مع مريانا",
  description:
    "تدرّب على الاستماع والإملاء والقراءة والكتابة عبر قصص تفاعلية كاملة.",
};

/*
  Skills Lab — four complete story suites from Mariana's real teaching
  material. Each story trains the four language skills: listening (audio +
  comprehension + dictation), speaking (read-aloud + record yourself),
  reading (passage + vocabulary + questions), and writing (guided writing
  studio). The pages are self-contained interactive HTML served from
  /public/skills/, in the same pattern as the lesson games.
*/
const SKILL_META = {
  listening: { icon: "🎧", ar: "استماع", en: "Listening" },
  speaking:  { icon: "🗣️", ar: "تحدّث", en: "Speaking" },
  reading:   { icon: "📖", ar: "قراءة", en: "Reading" },
  writing:   { icon: "✍️", ar: "كتابة", en: "Writing" },
};

const SUITES = [
  {
    slug: "yawm-ind-jaddati",
    icon: "🏡",
    ar: "يومٌ عند جدّتي",
    en: "A Day at Grandma's",
    levelAr: "مبتدئ",
    desc: "قصّة دافئة عن زيارة الجدّة: استمع إليها وأكمل الإملاء، واقرأ وافهم.",
    skills: ["reading", "listening"],
  },
  {
    slug: "ana-l-mouallem",
    icon: "🧑‍🏫",
    ar: "أنا المعلّم",
    en: "I Am the Teacher",
    levelAr: "أساسي",
    desc: "صبيٌّ يقبل تحدّياً صعباً: أن يشرح درساً أمام رفاقه. سيرة ذاتية بثلاث مهارات.",
    skills: ["listening", "reading", "writing"],
  },
  {
    slug: "al-alima-al-saghira",
    icon: "🔬",
    ar: "العالِمة الصغيرة",
    en: "The Little Scientist",
    levelAr: "متوسّط",
    desc: "يارا تحبّ العلوم منذ صغرها وتحقّق حلمها. سيرة غيريّة مع تعبير كتابيّ.",
    skills: ["listening", "reading", "writing"],
  },
  {
    slug: "ask-google",
    icon: "🔍",
    ar: "إسأل غوغِل",
    en: "Ask Google",
    levelAr: "متقدّم",
    desc: "بين الإنترنت ومجلّدات الجدّة: نصّ سرديّ عن التكنولوجيا والكتاب، بثلاث مهارات.",
    skills: ["listening", "reading", "writing"],
  },
];

export default function SkillsPage() {
  return (
    <section className="container">
      <ScrollRevealClient />
      <header className={styles.head}>
        <h1><Bilingual ar="مختبر المهارات" en="Skills Lab" /></h1>
        <p>
          أربع قصص حقيقية من موادّ مريانا التعليمية: استمع وأكمل الإملاء،
          اقرأ وافهم، ثم اكتب في «دفترك». اختر قصّةً وابدأ بأيّ مهارة.
        </p>
      </header>

      <div className={styles.grid}>
        {SUITES.map((suite) => (
          <article key={suite.slug} className={styles.card} data-reveal>
            <div className={styles.cardTop}>
              <span className={styles.icon} aria-hidden="true">{suite.icon}</span>
              <span className={styles.levelPill}>{suite.levelAr}</span>
            </div>
            <h2 className={styles.title}>
              <Bilingual ar={suite.ar} en={suite.en} />
            </h2>
            <p className={styles.desc}>{suite.desc}</p>
            <div className={styles.skills}>
              {suite.skills.map((id) => {
                const meta = SKILL_META[id];
                return (
                  <a
                    key={id}
                    className={styles.skillLink}
                    href={`/skills/${suite.slug}/${id}.html`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span aria-hidden="true">{meta.icon}</span>
                    <Bilingual ar={meta.ar} en={meta.en} />
                  </a>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        🗣️ مهارة التحدّث والنطق تُتدرَّب مع مريانا مباشرةً في حصص Google Meet —
        هنا تجهّز أذنك وقلمك وعينيك.
      </p>
    </section>
  );
}
