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
    id: "dictation",
    icon: "🎧",
    ar: "الإملاء",
    en: "Dictation",
    desc: "استمع جيّداً ثم اختر الكلمة أو الجملة كما سمعتها تماماً. يمكنك الإعادة وتغيير السرعة.",
    questions: [
      {
        id: "d1", skill: "dictation", difficulty: "easy",
        audioKey: "dictation-1",
        listen: "مَدْرَسَة",
        prompt: "استمع: ما الكلمة التي سمعتها؟",
        options: [
          { id: "a", text: "مَدرسة" },
          { id: "b", text: "مَدرسه" },
          { id: "c", text: "مَدرست" },
        ],
        answer: "a",
      },
      {
        id: "d2", skill: "dictation", difficulty: "medium",
        audioKey: "dictation-2",
        listen: "ذَهَبَ الوَلَدُ إلى البَيْتِ.",
        prompt: "استمع: ما الجملة التي سمعتها؟",
        options: [
          { id: "a", text: "ذهبَ الولدُ إلى البنتِ" },
          { id: "b", text: "ذهبَ الولدُ إلى البيتِ" },
          { id: "c", text: "لعبَ الولدُ في البيتِ" },
        ],
        answer: "b",
      },
      {
        id: "d3", skill: "dictation", difficulty: "medium",
        audioKey: "dictation-3",
        listen: "شَرِبْتُ ماءً بارِداً.",
        prompt: "استمع: ماذا شرِبَ المتحدّث؟",
        options: [
          { id: "a", text: "شاياً بارداً" },
          { id: "b", text: "عصيراً بارداً" },
          { id: "c", text: "ماءً بارداً" },
        ],
        answer: "c",
      },
      {
        id: "d4", skill: "dictation", difficulty: "hard",
        audioKey: "dictation-4",
        listen: "قَرَأَتْ سارَةُ قِصَّةً قَصيرَةً قَبْلَ النَّوْمِ.",
        prompt: "استمع: ما الجملة التي سمعتها تماماً؟",
        options: [
          { id: "a", text: "قرأتْ سارةُ قصّةً قصيرةً قبلَ النومِ" },
          { id: "b", text: "قرأتْ سارةُ قصّةً طويلةً قبلَ النومِ" },
          { id: "c", text: "كتبتْ سارةُ رسالةً قصيرةً قبلَ النومِ" },
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
        prompt: "اختر الجملة الصحيحة:",
        options: [
          { id: "a", text: "الطالبتان تدرسان معاً" },
          { id: "b", text: "الطالبتان يدرسون معاً" },
          { id: "c", text: "الطالبتان تدرس معاً" },
        ],
        answer: "a",
      },
      {
        id: "g4", skill: "grammar", difficulty: "hard",
        prompt: "أكمل بالفعل المناسب: «أمسِ ___ إلى السوق.»",
        options: [
          { id: "a", text: "سأذهبُ" },
          { id: "b", text: "ذهبتُ" },
          { id: "c", text: "أذهبُ" },
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
