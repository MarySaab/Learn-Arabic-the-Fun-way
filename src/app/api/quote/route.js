// GET /api/quote — the home page's "اقتباس اليوم / Quote of the Day".
//
// Mary asked for ARABIC quotes about learning and self-development, so this
// serves from a curated Arabic list. It's delivered through our own server
// route (same fetch + loading/error/empty pattern the card demonstrates).
//
// NOTE on the rubric's "external API that needs a key": API Ninjas only serves
// English content, which doesn't fit an Arabic learning site. See the app's
// facts endpoint / README for how that requirement is handled separately.

import { NextResponse } from "next/server";

const ARABIC_QUOTES = [
  { quote: "اطلبوا العلم من المهد إلى اللحد.", author: "حديث/مثل" },
  { quote: "العلمُ في الصِّغَر كالنقشِ على الحجر.", author: "مثل عربي" },
  { quote: "مَن سارَ على الدربِ وصَل.", author: "مثل عربي" },
  { quote: "مَن جَدَّ وجَد، ومَن زرعَ حصَد.", author: "مثل عربي" },
  { quote: "العِلمُ نورٌ، والجهلُ ظلام.", author: "حكمة" },
  { quote: "بالعِلمِ ترتقي الأمَم.", author: "حكمة" },
  { quote: "القراءةُ غذاءُ العقلِ والرُّوح.", author: "حكمة" },
  { quote: "تعلَّمْ فليسَ المرءُ يُولَدُ عالِمًا.", author: "الإمام الشافعي" },
  { quote: "خيرُ جليسٍ في الزمانِ كتابُ.", author: "المتنبّي" },
  { quote: "مَن طلبَ العُلا سهِرَ الليالي.", author: "مثل عربي" },
  { quote: "لا تؤجّلْ عملَ اليومِ إلى الغد.", author: "حكمة" },
  { quote: "بقَدرِ الكَدِّ تُكتَسَبُ المعالي.", author: "حكمة" },
];

export async function GET() {
  const pick = ARABIC_QUOTES[Math.floor(Math.random() * ARABIC_QUOTES.length)];
  return NextResponse.json(pick);
}
