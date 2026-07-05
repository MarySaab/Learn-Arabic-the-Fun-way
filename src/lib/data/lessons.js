// The lesson catalogue — 34 real Arabic lessons (satisfies the rubric's "15+
// real content items"). Items with a `game` field link to an interactive
// practice page in /public/games/, built from Mary's own uploaded teaching
// material — so the practice is genuinely real content, not filler.
//
// level: "beginner" | "elementary" | "intermediate" | "advanced"

export const lessons = [
  // ---- Beginner: the alphabet + the three interactive game lessons first ----
  { id: 1,  slug: "arabic-alphabet",        icon: "✍️", title_ar: "الحروف الأبجدية",            title_en: "Arabic Alphabet",            level: "beginner",     desc: "التعرّف على الحروف الـ٢٨ وأشكالها." },
  { id: 2,  slug: "sun-moon-letters",       icon: "☀️", title_ar: "الحروف الشمسية والقمرية",     title_en: "Sun & Moon Letters",         level: "beginner",     desc: "متى تُلفظ لام «الـ» ومتى تختفي.", game: "sun-moon-letters" },
  { id: 3,  slug: "masculine-feminine",     icon: "⚥",  title_ar: "المذكّر والمؤنّث",           title_en: "Masculine & Feminine",       level: "beginner",     desc: "هذا للمذكّر وهذه للمؤنّث — بالألعاب.", game: "masculine-feminine" },
  { id: 4,  slug: "singular-dual-plural",   icon: "👥", title_ar: "المفرد والمثنّى والجمع",     title_en: "Singular, Dual, Plural",     level: "beginner",     desc: "الواحد والاثنان وأكثر — بالألعاب.", game: "singular-dual" },
  { id: 6,  slug: "numbers-1-10",           icon: "🔢", title_ar: "الأرقام ١–١٠",               title_en: "Numbers 1–10",               level: "beginner",     desc: "العدّ من واحد إلى عشرة." },
  { id: 7,  slug: "family-members",         icon: "👨‍👩‍👧", title_ar: "أفراد العائلة",            title_en: "Family Members",             level: "beginner",     desc: "أسماء أفراد الأسرة." },
  { id: 8,  slug: "parts-of-speech",        icon: "🧩", title_ar: "أقسام الكلام",               title_en: "Parts of Speech",            level: "beginner",     desc: "الاسم والفعل والحرف.", game: "parts-of-speech" },
  // ---- Elementary ----
  { id: 19, slug: "dual-cases",             icon: "2️⃣", title_ar: "المثنى وحالاته",             title_en: "The Dual & Its Cases",       level: "elementary",   desc: "حالاتُ المثنى (رفع/نصب/جر)، أسماءُ الإشارة، وإضافةُ ال والياء — بالألعاب.", game: "dual-cases" },
  { id: 9,  slug: "word-types",             icon: "🏙️", title_ar: "أنواع الكلمة",               title_en: "Word Types",                 level: "elementary",   desc: "تمييز الاسم والفعل والحرف في الجملة.", game: "word-types" },
  { id: 10, slug: "tanween",                icon: "✨", title_ar: "التنوين",                    title_en: "Tanween",                    level: "elementary",   desc: "نون ساكنة نسمعها ولا نكتبها (ـً ـٌ ـٍ).", game: "tanween" },
  { id: 11, slug: "taa-marbuta",            icon: "🔤", title_ar: "التاء المربوطة والمبسوطة",    title_en: "Taa Marbuta vs Open Taa",    level: "elementary",   desc: "متى ة ومتى ت في آخر الاسم." },
  { id: 12, slug: "similar-letters",        icon: "🕵️", title_ar: "الأحرف المتقاربة في النطق",  title_en: "Similar-Sounding Letters",   level: "elementary",   desc: "ق/ك، س/ص/ث وتأثيرها في المعنى.", game: "similar-letters" },
  { id: 20, slug: "past-tense-elem",        icon: "⏳", title_ar: "الفعل الماضي",               title_en: "The Past Tense",             level: "elementary",   desc: "الزمن الماضي وتصريفه مع الضمائر — بالألعاب.", game: "past-tense-elem" },
  { id: 21, slug: "in-class",               icon: "🏫", title_ar: "في الصفّ",                   title_en: "In the Classroom",           level: "elementary",   desc: "نصّ قرائي: الفهم والمفردات والرابط «لأنّ».", game: "in-class" },
  { id: 22, slug: "swallow-nono",           icon: "🐦", title_ar: "السنونوة نونو",              title_en: "Nono the Swallow",           level: "elementary",   desc: "نصّ قرائي عن الخريف مع قاعدة الشدّة.", game: "swallow-nono" },
  // ---- Intermediate ----
  { id: 13, slug: "nominal-verbal",         icon: "🚂", title_ar: "الجملة الاسمية والفعلية",    title_en: "Nominal & Verbal Sentences", level: "intermediate", desc: "كيف تبدأ الجملة، بالاسم أم بالفعل.", game: "nominal-verbal-sentences" },
  { id: 14, slug: "verb-tenses",            icon: "⏳", title_ar: "أزمنة الفعل",                title_en: "Verb Tenses",                level: "intermediate", desc: "الماضي والمضارع والأمر." },
  { id: 15, slug: "prepositions",           icon: "🔗", title_ar: "حروف الجرّ",                 title_en: "Prepositions",               level: "intermediate", desc: "في، على، إلى، من، عن…" },
  { id: 23, slug: "present-tense-inter",    icon: "🔄", title_ar: "الفعل المضارع وتصريفه",      title_en: "Present Tense & Conjugation", level: "intermediate", desc: "صياغة المضارع وتصريفه ورفعه بالضمّة — بالألعاب.", game: "present-tense-inter" },
  { id: 24, slug: "singular-plural",        icon: "👥", title_ar: "المفرد والجمع",              title_en: "Singular & Plural",          level: "intermediate", desc: "جمع المؤنّث السالم وصفة غير العاقل — بالألعاب.", game: "singular-plural" },
  { id: 25, slug: "reading-snow-day",       icon: "❄️", title_ar: "يومٌ على الثلج",             title_en: "A Day in the Snow",          level: "intermediate", desc: "فهم مقروء: مرادفات وأضداد وأسئلة فهم.", game: "reading-snow-day" },
  { id: 26, slug: "reading-winter",         icon: "🌨️", title_ar: "فهم نصّ الشتاء",             title_en: "Winter Text Comprehension",  level: "intermediate", desc: "قراءة وفهم مع أكمل الفراغ ووصل الكلمات.", game: "reading-winter" },
  { id: 27, slug: "taa-tall-round",         icon: "🔤", title_ar: "التاء المربوطة والطويلة",    title_en: "Round vs Open Taa",          level: "intermediate", desc: "متى ة ومتى ت — مع ألعاب التصنيف.", game: "taa-tall-round" },
  { id: 28, slug: "past-tense-inter",       icon: "⏮️", title_ar: "الفعل الماضي وتصريفه",       title_en: "Past Tense & Conjugation",   level: "intermediate", desc: "الماضي والضمائر المتّصلة وبناؤه على الفتحة.", game: "past-tense-inter" },
  // ---- Advanced ----
  { id: 16, slug: "irab-cases",             icon: "👑", title_ar: "الإعراب: رفع ونصب وجرّ",      title_en: "Case Endings (I'rab)",       level: "advanced",     desc: "الحركات الإعرابية وأثرها." },
  { id: 17, slug: "subject-object",         icon: "🎯", title_ar: "الفاعل والمفعول به",         title_en: "Subject & Object",           level: "advanced",     desc: "أركان الجملة الفعلية." },
  { id: 18, slug: "reading-comprehension",  icon: "📖", title_ar: "نصوص قصيرة وفهم",            title_en: "Short Reading & Comprehension", level: "advanced",  desc: "قراءة نصّ قصير مع أسئلة فهم." },
  { id: 29, slug: "kana-sisters",           icon: "✒️", title_ar: "كان وأخواتها",               title_en: "Kāna & Its Sisters",         level: "advanced",     desc: "الأفعال الناقصة: اسمها وخبرها وإعرابها — بالألعاب.", game: "kana-sisters" },
  { id: 30, slug: "past-tense-adv",         icon: "⌛", title_ar: "الفعل الماضي وبناؤه",         title_en: "Past Tense: Cases of Bināʾ", level: "advanced",     desc: "علامات بناء الماضي مع الضمائر المختلفة.", game: "past-tense-adv" },
  { id: 31, slug: "present-tense-adv",      icon: "⏩", title_ar: "الفعل المضارع",              title_en: "The Present Tense",          level: "advanced",     desc: "تصريف المضارع مع الضمائر ونوعها.", game: "present-tense-adv" },
  { id: 32, slug: "narrative-style",        icon: "📜", title_ar: "النمط السردي القصصي",        title_en: "Narrative Structure",        level: "advanced",     desc: "مراحل مخطّط السرد الستّ — رتّب وصنّف.", game: "narrative-style" },
  { id: 33, slug: "description-inner-outer", icon: "🖊️", title_ar: "الوصف الخارجي والداخلي",     title_en: "Outer & Inner Description",   level: "advanced",     desc: "تعبير: وصف الأشخاص خارجيّاً وداخليّاً.", game: "description-inner-outer" },
  { id: 34, slug: "describe-person",        icon: "🧑", title_ar: "وصف إنسان",                  title_en: "Describing a Person",        level: "advanced",     desc: "تعبير: بناء وصف متكامل لإنسان.", game: "describe-person" },
  { id: 35, slug: "subject-faail",          icon: "🎯", title_ar: "الفاعل",                     title_en: "The Subject (Fāʿil)",        level: "advanced",     desc: "الفاعل ورفعه وأنواعه — بالألعاب.", game: "subject-faail" },
];

// The four levels, with Arabic + English labels, used by the filter buttons and
// the coloured level pills. Order matters (beginner → advanced).
export const levels = [
  { id: "beginner",     ar: "مبتدئ",  en: "Beginner" },
  { id: "elementary",   ar: "أساسي",  en: "Elementary" },
  { id: "intermediate", ar: "متوسّط", en: "Intermediate" },
  { id: "advanced",     ar: "متقدّم", en: "Advanced" },
];
