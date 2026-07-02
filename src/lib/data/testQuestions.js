// Placement test v2 — ONE comprehensive test in FOUR skill sections
// (Reading, Writing, Listening, Grammar), 4 questions each, tiered by
// difficulty (easy ×1, medium ×2, hard ×3 in the weighted score).
// Each section gets its own score + CEFR-like level (A0–B1) on the result,
// plus one overall CEFR-like level (A0–B2) and the internal group level.
//
// Listening questions carry a `listen` text spoken by the Speaker class
// (browser Arabic TTS, playback speeds 0.75/1/1.25). Reading questions share
// a short passage (`passage`).

const READING_PASSAGE =
  "تسكنُ جدّتي في منزلٍ منفردٍ أمامه ساحةٌ واسعة. نزورها في عطلةِ نهايةِ الأسبوع، " +
  "فتستقبلنا بالقُبلاتِ وتحضّر لنا قالبَ حلوى بالشوكولا. نلعبُ في الساحةِ ونشاهدُ الأفلام، " +
  "ونعودُ إلى بيتنا مساءً وقلوبُنا مليئةٌ بالفرح.";

export const testSections = [
  {
    id: "reading",
    icon: "📖",
    ar: "القراءة",
    en: "Reading",
    desc: "اقرأ النصَّ القصير بتأنٍّ ثم أجب عن الأسئلة.",
    questions: [
      {
        id: "r1", skill: "reading", difficulty: "easy", passage: READING_PASSAGE,
        prompt: "أين تسكن الجدّة؟",
        options: [
          { id: "a", text: "في شقّةٍ داخل المدينة" },
          { id: "b", text: "في منزلٍ منفردٍ أمامه ساحةٌ واسعة" },
          { id: "c", text: "في بيتٍ على شاطئ البحر" },
        ],
        answer: "b",
      },
      {
        id: "r2", skill: "reading", difficulty: "medium", passage: READING_PASSAGE,
        prompt: "متى يزور الأحفادُ جدّتهم؟",
        options: [
          { id: "a", text: "كلّ يوم" },
          { id: "b", text: "في الأعياد فقط" },
          { id: "c", text: "في عطلة نهاية الأسبوع" },
        ],
        answer: "c",
      },
      {
        id: "r3", skill: "reading", difficulty: "medium", passage: READING_PASSAGE,
        prompt: "ما معنى «منفرد» في النصّ؟",
        options: [
          { id: "a", text: "منزلٌ وحدَه لا يلتصق بغيره" },
          { id: "b", text: "منزلٌ قديم" },
          { id: "c", text: "منزلٌ صغير" },
        ],
        answer: "a",
      },
      {
        id: "r4", skill: "reading", difficulty: "hard", passage: READING_PASSAGE,
        prompt: "ما الشعور العامّ الذي يعبّر عنه النصّ؟",
        options: [
          { id: "a", text: "الملل من الزيارات العائلية" },
          { id: "b", text: "المحبّة والفرح بزيارة الجدّة" },
          { id: "c", text: "التعب من اللعب" },
        ],
        answer: "b",
      },
    ],
  },
  {
    id: "writing",
    icon: "✍️",
    ar: "الكتابة",
    en: "Writing",
    desc: "هذا القسم يقيس دقّة الإملاء: اختر الكتابة الصحيحة.",
    questions: [
      {
        id: "w1", skill: "writing", difficulty: "easy",
        prompt: "أيُّ كلمةٍ مكتوبةٌ كتابةً صحيحة؟",
        options: [
          { id: "a", text: "مدرسة" },
          { id: "b", text: "مدرست" },
          { id: "c", text: "مدرسه بالتاء المفتوحة" },
        ],
        answer: "a",
      },
      {
        id: "w2", skill: "writing", difficulty: "medium",
        prompt: "اختر الجملة الصحيحة إملائياً:",
        options: [
          { id: "a", text: "قرأتُ كتابً مفيداً" },
          { id: "b", text: "قرأتُ كتاباً مفيداً" },
          { id: "c", text: "قرأتُ كتابن مفيداً" },
        ],
        answer: "b",
      },
      {
        id: "w3", skill: "writing", difficulty: "medium",
        prompt: "أيُّ كلمةٍ تنتهي بتاءٍ مبسوطة (ت)؟",
        options: [
          { id: "a", text: "شجرة" },
          { id: "b", text: "معلّمة" },
          { id: "c", text: "بِنت" },
        ],
        answer: "c",
      },
      {
        id: "w4", skill: "writing", difficulty: "hard",
        prompt: "اختر الكتابة الصحيحة لتنوين الفتح:",
        options: [
          { id: "a", text: "شربتُ ماءً بارداً" },
          { id: "b", text: "شربتُ ماءاً بارداً" },
          { id: "c", text: "شربتُ ماءن بارداً" },
        ],
        answer: "a",
      },
    ],
  },
  {
    id: "listening",
    icon: "🎧",
    ar: "الاستماع",
    en: "Listening",
    desc: "اضغط زرّ الاستماع وأصغِ جيّداً ثم أجب. يمكنك الإعادة وتغيير السرعة.",
    questions: [
      {
        id: "l1", skill: "listening", difficulty: "easy",
        audioKey: "listen-1",
        listen: "السلامُ عليكم، اسمي مريانا، وأنا معلّمةُ لغةٍ عربية.",
        prompt: "استمع ثم أجب: ما اسم المتحدّثة؟",
        options: [
          { id: "a", text: "مريانا" },
          { id: "b", text: "سارة" },
          { id: "c", text: "ليلى" },
        ],
        answer: "a",
      },
      {
        id: "l2", skill: "listening", difficulty: "medium",
        audioKey: "listen-2",
        listen: "ذهب سامي إلى السوقِ صباحاً، واشترى تفّاحاً وموزاً.",
        prompt: "استمع ثم أجب: ماذا اشترى سامي؟",
        options: [
          { id: "a", text: "خبزاً وحليباً" },
          { id: "b", text: "تفّاحاً وموزاً" },
          { id: "c", text: "عصيراً وحلوى" },
        ],
        answer: "b",
      },
      {
        id: "l3", skill: "listening", difficulty: "medium",
        audioKey: "listen-3",
        listen: "الجوُّ اليومَ ماطرٌ وباردٌ، فخذْ معك المظلّةَ والمعطف.",
        prompt: "استمع ثم أجب: كيف الجوّ اليوم؟",
        options: [
          { id: "a", text: "مشمسٌ وحارّ" },
          { id: "b", text: "معتدل" },
          { id: "c", text: "ماطرٌ وبارد" },
        ],
        answer: "c",
      },
      {
        id: "l4", skill: "listening", difficulty: "hard",
        audioKey: "listen-4",
        listen: "قال المعلّمُ لتلاميذه: من يقرأْ كلَّ يومٍ صفحةً واحدةً، يقرأْ في السنةِ كتباً كثيرة.",
        prompt: "استمع ثم أجب: ما النصيحة التي قدّمها المعلّم؟",
        options: [
          { id: "a", text: "القراءةُ اليوميّة ولو كانت قليلة" },
          { id: "b", text: "شراءُ كتبٍ كثيرة" },
          { id: "c", text: "القراءةُ في العطلة فقط" },
        ],
        answer: "a",
      },
    ],
  },
  {
    id: "grammar",
    icon: "🧩",
    ar: "القواعد",
    en: "Grammar",
    desc: "أسئلة في قواعد اللغة، من الأساسيات إلى الإعراب.",
    questions: [
      {
        id: "g1", skill: "grammar", difficulty: "easy",
        prompt: "كلمة «يكتبُ» هي:",
        options: [
          { id: "a", text: "اسم" },
          { id: "b", text: "فعل مضارع" },
          { id: "c", text: "حرف" },
        ],
        answer: "b",
      },
      {
        id: "g2", skill: "grammar", difficulty: "medium",
        prompt: "جملة «الولدُ نشيطٌ» هي جملة:",
        options: [
          { id: "a", text: "اسمية" },
          { id: "b", text: "فعلية" },
          { id: "c", text: "استفهامية" },
        ],
        answer: "a",
      },
      {
        id: "g3", skill: "grammar", difficulty: "hard",
        prompt: "في جملة «قرأَ الطالبُ الكتابَ»، إعراب «الكتابَ» هو:",
        options: [
          { id: "a", text: "فاعل مرفوع" },
          { id: "b", text: "مفعول به منصوب" },
          { id: "c", text: "اسم مجرور" },
        ],
        answer: "b",
      },
      {
        id: "g4", skill: "grammar", difficulty: "hard",
        prompt: "أيُّ جملة صحيحة إعرابياً؟",
        options: [
          { id: "a", text: "إنّ العلمُ نورٌ" },
          { id: "b", text: "إنّ العلمَ نورٌ" },
          { id: "c", text: "إنّ العلمِ نورٌ" },
        ],
        answer: "b",
      },
    ],
  },
];

// Flat list used by the PlacementTest class (section id kept on each question).
export const testQuestions = testSections.flatMap((s) =>
  s.questions.map((q) => ({ ...q, section: s.id }))
);

// Encouraging Arabic micro-copy shown on the result, keyed by internal level.
export const levelMessages = {
  beginner:
    "أهلاً بك في بداية الرحلة! ستبدأ من الحروف والكلمات الأولى، خطوةً بخطوة.",
  elementary:
    "أساسُك جيّد! أنت جاهز لبناء الجُمل وإتقان القواعد الأساسية.",
  intermediate:
    "ممتاز! أنت مستعدّ للبدء في المستوى المتوسّط والقراءة بثقة.",
  advanced:
    "رائع! مستواك متقدّم — ستصقل القواعد المتقدّمة والإعراب والنصوص.",
};
