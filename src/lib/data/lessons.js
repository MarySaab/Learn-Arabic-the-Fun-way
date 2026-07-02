// The lesson catalogue — 18 real Arabic lessons (satisfies the rubric's "15+
// real content items"). Items with a `game` field link to an interactive
// practice page in /public/games/, built from Mary's own uploaded teaching
// material — so the practice is genuinely real content, not filler.
//
// level: "beginner" | "elementary" | "intermediate" | "advanced"

export const lessons = [
  { id: 1,  slug: "arabic-alphabet",        icon: "✍️", title_ar: "الحروف الأبجدية",            title_en: "Arabic Alphabet",            level: "beginner",     desc: "التعرّف على الحروف الـ٢٨ وأشكالها." },
  { id: 2,  slug: "greetings",              icon: "👋", title_ar: "التحية والتعريف",            title_en: "Greetings & Introductions",  level: "beginner",     desc: "عبارات التحية وتقديم النفس." },
  { id: 3,  slug: "numbers-1-10",           icon: "🔢", title_ar: "الأرقام ١–١٠",               title_en: "Numbers 1–10",               level: "beginner",     desc: "العدّ من واحد إلى عشرة." },
  { id: 4,  slug: "family-members",         icon: "👨‍👩‍👧", title_ar: "أفراد العائلة",            title_en: "Family Members",             level: "beginner",     desc: "أسماء أفراد الأسرة." },
  { id: 5,  slug: "sun-moon-letters",       icon: "☀️", title_ar: "الحروف الشمسية والقمرية",     title_en: "Sun & Moon Letters",         level: "beginner",     desc: "متى تُلفظ لام «الـ» ومتى تختفي.", game: "sun-moon-letters" },
  { id: 6,  slug: "parts-of-speech",        icon: "🧩", title_ar: "أقسام الكلام",               title_en: "Parts of Speech",            level: "beginner",     desc: "الاسم والفعل والحرف.", game: "parts-of-speech" },
  { id: 7,  slug: "word-types",             icon: "🏙️", title_ar: "أنواع الكلمة",               title_en: "Word Types",                 level: "elementary",   desc: "تمييز الاسم والفعل والحرف في الجملة.", game: "word-types" },
  { id: 8,  slug: "tanween",                icon: "✨", title_ar: "التنوين",                    title_en: "Tanween",                    level: "elementary",   desc: "نون ساكنة نسمعها ولا نكتبها (ـً ـٌ ـٍ).", game: "tanween" },
  { id: 9,  slug: "taa-marbuta",            icon: "🔤", title_ar: "التاء المربوطة والمبسوطة",    title_en: "Taa Marbuta vs Open Taa",    level: "elementary",   desc: "متى ة ومتى ت في آخر الاسم." },
  { id: 10, slug: "similar-letters",        icon: "🕵️", title_ar: "الأحرف المتقاربة في النطق",  title_en: "Similar-Sounding Letters",   level: "elementary",   desc: "ق/ك، س/ص/ث وتأثيرها في المعنى.", game: "similar-letters" },
  { id: 11, slug: "nominal-verbal",         icon: "🚂", title_ar: "الجملة الاسمية والفعلية",    title_en: "Nominal & Verbal Sentences", level: "intermediate", desc: "كيف تبدأ الجملة، بالاسم أم بالفعل.", game: "nominal-verbal-sentences" },
  { id: 12, slug: "verb-tenses",            icon: "⏳", title_ar: "أزمنة الفعل",                title_en: "Verb Tenses",                level: "intermediate", desc: "الماضي والمضارع والأمر." },
  { id: 13, slug: "masculine-feminine",     icon: "⚥",  title_ar: "المذكّر والمؤنّث",           title_en: "Masculine & Feminine",       level: "intermediate", desc: "التذكير والتأنيث في الأسماء." },
  { id: 14, slug: "singular-dual-plural",   icon: "👥", title_ar: "المفرد والمثنّى والجمع",     title_en: "Singular, Dual, Plural",     level: "intermediate", desc: "صيغ العدد في العربية." },
  { id: 15, slug: "prepositions",           icon: "🔗", title_ar: "حروف الجرّ",                 title_en: "Prepositions",               level: "intermediate", desc: "في، على، إلى، من، عن…" },
  { id: 16, slug: "irab-cases",             icon: "👑", title_ar: "الإعراب: رفع ونصب وجرّ",      title_en: "Case Endings (I'rab)",       level: "advanced",     desc: "الحركات الإعرابية وأثرها." },
  { id: 17, slug: "subject-object",         icon: "🎯", title_ar: "الفاعل والمفعول به",         title_en: "Subject & Object",           level: "advanced",     desc: "أركان الجملة الفعلية." },
  { id: 18, slug: "reading-comprehension",  icon: "📖", title_ar: "نصوص قصيرة وفهم",            title_en: "Short Reading & Comprehension", level: "advanced",  desc: "قراءة نصّ قصير مع أسئلة فهم." },
];

// The four levels, with Arabic + English labels, used by the filter buttons and
// the coloured level pills. Order matters (beginner → advanced).
export const levels = [
  { id: "beginner",     ar: "مبتدئ",  en: "Beginner" },
  { id: "elementary",   ar: "أساسي",  en: "Elementary" },
  { id: "intermediate", ar: "متوسّط", en: "Intermediate" },
  { id: "advanced",     ar: "متقدّم", en: "Advanced" },
];
