import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container" style={{ textAlign: "center" }}>
      <p style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "0.08em" }}>
        ✦ الأساس جاهز ✦
      </p>
      <h1>تعلّم مع مريانا</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--teal)", maxWidth: "48ch", margin: "0 auto 2rem" }}>
        رحلتك نحو إتقان اللغة العربية تبدأ من هنا.
      </p>
      <p style={{ maxWidth: "52ch", margin: "0 auto 2rem" }}>
        هذه صفحة مؤقّتة. البنية الأساسيّة (التصميم، شريط التنقّل، الأسفل،
        الاتّجاه من اليمين إلى اليسار، وزرّ اللغة) جاهزة. سنبني الصفحة الرئيسيّة
        الكاملة مع الخطّ الزمنيّ في الخطوة التالية.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/test" className="btn btn-primary">ابدأ الاختبار</Link>
        <Link href="/lessons" className="btn btn-ghost">تصفّح الدروس</Link>
      </div>
    </section>
  );
}
