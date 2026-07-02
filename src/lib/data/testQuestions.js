// Placement-test questions — 12 real multiple-choice questions across four
// skills (letters, vocabulary, grammar, reading) at THREE difficulty tiers.
// Difficulty drives the weighted score in the PlacementTest class
// (easy ×1, medium ×2, hard ×3), so reaching "advanced" requires answering
// genuinely advanced grammar/reading — not just the beginner basics.

export const testQuestions = [
  // ---------- EASY (beginner floor) ----------
  {
    id: "q1",
    skill: "letters",
    difficulty: "easy",
    prompt: "كم عددُ حروف الأبجدية العربية؟",
    options: [
      { id: "a", text: "٢٦" },
      { id: "b", text: "٢٨" },
      { id: "c", text: "٣٠" },
      { id: "d", text: "٢٤" },
    ],
    answer: "b",
  },
  {
    id: "q2",
    skill: "vocabulary",
    difficulty: "easy",
    prompt: "عكسُ كلمة «كبير» هو:",
    options: [
      { id: "a", text: "طويل" },
      { id: "b", text: "جميل" },
      { id: "c", text: "صغير" },
      { id: "d", text: "واسع" },
    ],
    answer: "c",
  },
  {
    id: "q3",
    skill: "vocabulary",
    difficulty: "easy",
    prompt: "ما الكلمة التي تعني «أداةً للكتابة»؟",
    options: [
      { id: "a", text: "القَلَم" },
      { id: "b", text: "الكُرسيّ" },
      { id: "c", text: "الشَّجرة" },
      { id: "d", text: "البابُ" },
    ],
    answer: "a",
  },

  // ---------- MEDIUM (elementary / lower-intermediate) ----------
  {
    id: "q4",
    skill: "letters",
    difficulty: "medium",
    prompt: "أيُّ الكلمات التالية تبدأ بحرفٍ شمسيّ (تختفي فيه لام «الـ»)؟",
    options: [
      { id: "a", text: "القَمَر" },
      { id: "b", text: "الكِتاب" },
      { id: "c", text: "الشَّمس" },
      { id: "d", text: "البَيت" },
    ],
    answer: "c",
  },
  {
    id: "q5",
    skill: "grammar",
    difficulty: "medium",
    prompt: "كلمة «يَكتُبُ» هي:",
    options: [
      { id: "a", text: "اسم" },
      { id: "b", text: "فعل ماضٍ" },
      { id: "c", text: "فعل مضارع" },
      { id: "d", text: "حرف" },
    ],
    answer: "c",
  },
  {
    id: "q6",
    skill: "grammar",
    difficulty: "medium",
    prompt: "جملة «الوَلَدُ نشيطٌ» هي جملة:",
    options: [
      { id: "a", text: "اسمية" },
      { id: "b", text: "فعلية" },
      { id: "c", text: "شرطية" },
      { id: "d", text: "استفهامية" },
    ],
    answer: "a",
  },
  {
    id: "q7",
    skill: "vocabulary",
    difficulty: "medium",
    prompt: "ما معنى كلمة «غزير» في عبارة «مطرٌ غزيرٌ»؟",
    options: [
      { id: "a", text: "خفيف" },
      { id: "b", text: "كثير" },
      { id: "c", text: "بارد" },
      { id: "d", text: "متقطّع" },
    ],
    answer: "b",
  },
  {
    id: "q8",
    skill: "reading",
    difficulty: "medium",
    prompt:
      "اقرأ: «ذهب سامي إلى المدرسة صباحاً ماشياً، وفي الطريق قابل صديقه خالداً فسارا معاً.» كيف ذهب سامي إلى المدرسة؟",
    options: [
      { id: "a", text: "بالسيارة" },
      { id: "b", text: "بالحافلة" },
      { id: "c", text: "ماشياً" },
      { id: "d", text: "بالدراجة" },
    ],
    answer: "c",
  },

  // ---------- HARD (upper-intermediate / advanced) ----------
  {
    id: "q9",
    skill: "grammar",
    difficulty: "hard",
    prompt: "في جملة «قرأَ الطالبُ الكتابَ»، إعراب كلمة «الكتابَ» هو:",
    options: [
      { id: "a", text: "فاعل مرفوع" },
      { id: "b", text: "مفعول به منصوب" },
      { id: "c", text: "مبتدأ مرفوع" },
      { id: "d", text: "اسم مجرور" },
    ],
    answer: "b",
  },
  {
    id: "q10",
    skill: "grammar",
    difficulty: "hard",
    prompt: "اختر الصيغة الصحيحة: «شاهدتُ ___ اثنين في الملعب.»",
    options: [
      { id: "a", text: "لاعبانِ" },
      { id: "b", text: "لاعبَينِ" },
      { id: "c", text: "لاعبونَ" },
      { id: "d", text: "لاعبينَ جمعاً" },
    ],
    answer: "b",
  },
  {
    id: "q11",
    skill: "grammar",
    difficulty: "hard",
    prompt: "أيُّ جملة صحيحة إعرابياً؟",
    options: [
      { id: "a", text: "إنّ العلمُ نورٌ" },
      { id: "b", text: "إنّ العلمِ نورٌ" },
      { id: "c", text: "إنّ العلمَ نورٌ" },
      { id: "d", text: "إنّ العلمَ نوراً" },
    ],
    answer: "c",
  },
  {
    id: "q12",
    skill: "reading",
    difficulty: "hard",
    prompt:
      "اقرأ: «ما أجملَ أن يغرسَ الإنسانُ شجرةً لا يأكلُ من ثمرها، بل يتركُها لمن يأتي بعدَه.» ما الفكرة التي يدعو إليها النصّ؟",
    options: [
      { id: "a", text: "أهمية أكل الفواكه" },
      { id: "b", text: "العطاء دون انتظار مقابل" },
      { id: "c", text: "طرق زراعة الأشجار" },
      { id: "d", text: "المحافظة على الغابات" },
    ],
    answer: "b",
  },
];

// Encouraging Arabic micro-copy shown on the result, keyed by level.
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
