// The learning journey shown on the home page as a timeline (Mary's custom UI
// requirement: "a timeline-style section using Flexbox or Grid"). Eight ordered
// stages, from the alphabet to full mastery. The placement test (Step 4) maps a
// learner's result onto one of these stages and highlights it ("أنت هنا").
//
// This data lives in its own file so BOTH the home page (Step 2) and the test
// result (Step 4) import the exact same stages — no duplication.

export const journeyStages = [
  { id: "letters",          icon: "أ",   ar: "الحروف",             en: "Letters",          desc: "التعرّف على الحروف الـ٢٨ وأشكالها." },
  { id: "words",            icon: "📖",  ar: "الكلمات",            en: "Words",            desc: "بناء أوّل مفرداتك وقراءتها." },
  { id: "sentences",        icon: "✍️",  ar: "الجُمل",             en: "Sentences",        desc: "تكوين جُمل بسيطة ومفيدة." },
  { id: "basic-grammar",    icon: "🧩",  ar: "القواعد الأساسية",   en: "Basic Grammar",    desc: "الاسم والفعل والحرف وأركان الجملة." },
  { id: "writing",          icon: "🖋️",  ar: "الكتابة",            en: "Writing",          desc: "كتابة صحيحة مع التاء والتنوين والهمزة." },
  { id: "reading",          icon: "📜",  ar: "القراءة",            en: "Reading",          desc: "قراءة نصوص قصيرة بطلاقة وفهم." },
  { id: "advanced-grammar", icon: "👑",  ar: "القواعد المتقدّمة",  en: "Advanced Grammar", desc: "الإعراب والرفع والنصب والجرّ." },
  { id: "mastery",          icon: "🌟",  ar: "الإتقان",            en: "Mastery",          desc: "التعبير بثقة في مواضيع متنوّعة." },
];

// A placement level (from the test) → the stage where that learner "is".
// Kept here so Step 4 can reuse it when it highlights the timeline.
export const levelToStageId = {
  beginner:     "letters",
  elementary:   "sentences",
  intermediate: "reading",
  advanced:     "advanced-grammar",
};

// Returns the stage id for a given level, or null if the level is unknown /
// absent (e.g. someone visits the home page without a ?level= link).
export function stageIdForLevel(level) {
  if (!level) return null;
  return levelToStageId[String(level).toLowerCase()] ?? null;
}
