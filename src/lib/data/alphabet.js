// The complete Arabic alphabet — 28 letters, each with its name, sound,
// an example word, and a short "how to write it" tip. `connects: false`
// marks the six letters that never connect to the letter AFTER them
// (ا د ذ ر ز و), which changes their contextual forms.

export const alphabet = [
  { letter: "ا", name: "الألف",  sound: "a",  connects: false, word: "أسد",    emoji: "🦁", tip: "خطٌّ عموديّ واحد، نرسمه من الأعلى إلى الأسفل." },
  { letter: "ب", name: "الباء",  sound: "b",  word: "باب",    emoji: "🚪", tip: "طبقٌ صغير مفتوح، ونقطة واحدة تحته." },
  { letter: "ت", name: "التاء",  sound: "t",  word: "تفّاحة", emoji: "🍎", tip: "مثل الباء تماماً، لكن بنقطتَين فوقه." },
  { letter: "ث", name: "الثاء",  sound: "th", word: "ثعلب",   emoji: "🦊", tip: "مثل الباء، وثلاث نقاط فوقه." },
  { letter: "ج", name: "الجيم",  sound: "j",  word: "جمل",    emoji: "🐫", tip: "نصف دائرة بذيلٍ تحت السطر، ونقطة في وسطها." },
  { letter: "ح", name: "الحاء",  sound: "ḥ",  word: "حصان",   emoji: "🐴", tip: "مثل الجيم لكن من دون نقطة." },
  { letter: "خ", name: "الخاء",  sound: "kh", word: "خبز",    emoji: "🍞", tip: "مثل الحاء، ونقطة واحدة فوقه." },
  { letter: "د", name: "الدال",  sound: "d",  connects: false, word: "دبّ",   emoji: "🐻", tip: "زاوية صغيرة مفتوحة نحو اليسار، فوق السطر." },
  { letter: "ذ", name: "الذال",  sound: "dh", connects: false, word: "ذرة",   emoji: "🌽", tip: "مثل الدال، ونقطة فوقه." },
  { letter: "ر", name: "الراء",  sound: "r",  connects: false, word: "ريشة",  emoji: "🪶", tip: "قوسٌ صغير ينزلق تحت السطر." },
  { letter: "ز", name: "الزاي",  sound: "z",  connects: false, word: "زهرة",  emoji: "🌸", tip: "مثل الراء، ونقطة فوقه." },
  { letter: "س", name: "السين",  sound: "s",  word: "سمكة",   emoji: "🐟", tip: "ثلاث أسنان صغيرة، ثم قوس ينزل تحت السطر." },
  { letter: "ش", name: "الشين",  sound: "sh", word: "شمس",    emoji: "☀️", tip: "مثل السين، وثلاث نقاط فوقه." },
  { letter: "ص", name: "الصاد",  sound: "ṣ",  word: "صقر",    emoji: "🦅", tip: "حلقة بيضاويّة ثم قوس تحت السطر." },
  { letter: "ض", name: "الضاد",  sound: "ḍ",  word: "ضفدع",   emoji: "🐸", tip: "مثل الصاد، ونقطة فوقه — حرف العربية الشهير!" },
  { letter: "ط", name: "الطاء",  sound: "ṭ",  word: "طائرة",  emoji: "✈️", tip: "حلقة بيضاويّة وعمود مائل يقف فوقها." },
  { letter: "ظ", name: "الظاء",  sound: "ẓ",  word: "ظرف",    emoji: "✉️", tip: "مثل الطاء، ونقطة فوقه." },
  { letter: "ع", name: "العين",  sound: "ʿ",  word: "عين",    emoji: "👁️", tip: "رأس صغير مفتوح، ثم قوس واسع تحت السطر." },
  { letter: "غ", name: "الغين",  sound: "gh", word: "غيمة",   emoji: "☁️", tip: "مثل العين، ونقطة فوقه." },
  { letter: "ف", name: "الفاء",  sound: "f",  word: "فيل",    emoji: "🐘", tip: "حلقة صغيرة ونقطة فوقها، ثم جسم ممتدّ." },
  { letter: "ق", name: "القاف",  sound: "q",  word: "قمر",    emoji: "🌙", tip: "حلقة صغيرة ونقطتان فوقها، وقوس أعمق من الفاء." },
  { letter: "ك", name: "الكاف",  sound: "k",  word: "كتاب",   emoji: "📖", tip: "عمود مائل وقاعدة، وهمزة صغيرة في حضنه." },
  { letter: "ل", name: "اللام",  sound: "l",  word: "ليمون",  emoji: "🍋", tip: "عمود طويل ينتهي بقوس نحو اليسار." },
  { letter: "م", name: "الميم",  sound: "m",  word: "موز",    emoji: "🍌", tip: "حلقة صغيرة مغلقة وذيل نازل تحت السطر." },
  { letter: "ن", name: "النون",  sound: "n",  word: "نجمة",   emoji: "⭐", tip: "قوس مثل نصف دائرة، ونقطة فوقه." },
  { letter: "ه", name: "الهاء",  sound: "h",  word: "هدية",   emoji: "🎁", tip: "حلقة يتغيّر شكلها كثيراً بحسب موقعها — لاحظ أشكالها الأربعة!" },
  { letter: "و", name: "الواو",  sound: "w",  connects: false, word: "وردة",  emoji: "🌹", tip: "حلقة صغيرة وذيل مائل ينزل تحت السطر." },
  { letter: "ي", name: "الياء",  sound: "y",  word: "يد",     emoji: "✋", tip: "قوس متعرّج ينزل تحت السطر، ونقطتان تحته." },
];

// Contextual forms, built with the tatweel (ـ) connector. The six
// non-connecting letters have no distinct initial/medial shapes.
export function formsOf({ letter, connects = true }) {
  const T = "ـ";
  return connects
    ? { isolated: letter, initial: letter + T, medial: T + letter + T, final: T + letter }
    : { isolated: letter, initial: letter, medial: T + letter, final: T + letter };
}
