// Placement-test questions — 10 real multiple-choice questions across four
// skills (letters, vocabulary, grammar, reading) at mixed difficulty. Each
// question's `answer` is the id of the correct option. Written as genuine
// Arabic questions, no filler.

export const testQuestions = [
  {
    id: "q1",
    skill: "letters",
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
    skill: "letters",
    prompt: "أيُّ الكلمات التالية تبدأ بحرفٍ شمسيّ (تختفي فيه اللام)؟",
    options: [
      { id: "a", text: "القَمَر" },
      { id: "b", text: "الكِتاب" },
      { id: "c", text: "الشَّمس" },
      { id: "d", text: "البَيت" },
    ],
    answer: "c",
  },
  {
    id: "q3",
    skill: "vocabulary",
    prompt: "ما الكلمة التي تعني «أداةً للكتابة»؟",
    options: [
      { id: "a", text: "القَلَم" },
      { id: "b", text: "الكُرسيّ" },
      { id: "c", text: "الشَّجرة" },
      { id: "d", text: "البابُ" },
    ],
    answer: "a",
  },
  {
    id: "q4",
    skill: "vocabulary",
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
    id: "q5",
    skill: "grammar",
    prompt: "كلمة «يَكتُبُ» هي:",
    options: [
      { id: "a", text: "اسم" },
      { id: "b", text: "فعل" },
      { id: "c", text: "حرف" },
      { id: "d", text: "ظرف" },
    ],
    answer: "b",
  },
  {
    id: "q6",
    skill: "grammar",
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
    skill: "grammar",
    prompt: "كلمة «كِتاباً» تنتهي بتنوين:",
    options: [
      { id: "a", text: "الضمّ" },
      { id: "b", text: "الكسر" },
      { id: "c", text: "الفتح" },
      { id: "d", text: "لا تنوين فيها" },
    ],
    answer: "c",
  },
  {
    id: "q8",
    skill: "grammar",
    prompt: "كلمة «مُعلِّمة» هي اسمٌ:",
    options: [
      { id: "a", text: "مذكّر" },
      { id: "b", text: "مؤنّث" },
      { id: "c", text: "مثنّى" },
      { id: "d", text: "جمع" },
    ],
    answer: "b",
  },
  {
    id: "q9",
    skill: "reading",
    prompt:
      "اقرأ: «ذهب سامي إلى المدرسة صباحاً، وحمل حقيبته وكُتُبه.» متى ذهب سامي إلى المدرسة؟",
    options: [
      { id: "a", text: "مساءً" },
      { id: "b", text: "ظهراً" },
      { id: "c", text: "صباحاً" },
      { id: "d", text: "ليلاً" },
    ],
    answer: "c",
  },
  {
    id: "q10",
    skill: "reading",
    prompt:
      "اقرأ: «القراءةُ غذاءُ العقل، ومن يقرأْ كثيراً يزددْ علماً ومعرفة.» ما موضوع النصّ؟",
    options: [
      { id: "a", text: "أهمية القراءة" },
      { id: "b", text: "فوائد الرياضة" },
      { id: "c", text: "أنواع الطعام" },
      { id: "d", text: "متعة السفر" },
    ],
    answer: "a",
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
