import Bilingual from "@/components/Bilingual";
import TestRunner from "@/components/TestRunner";
import ScrollRevealClient from "@/components/ScrollRevealClient";

export const metadata = {
  title: "اختبار المستوى | Placement Test — تعلّم مع مريانا",
  description: "اختبار قصير يحدّد مستواك في اللغة العربية ويقترح نقطة انطلاقك.",
};

export default function TestPage() {
  return (
    <section className="container">
      <ScrollRevealClient />
      <header style={{ textAlign: "center", maxWidth: "56ch", margin: "0 auto 32px" }}>
        <h1><Bilingual ar="اختبار تحديد المستوى" en="Placement Test" /></h1>
        <p style={{ color: "var(--teal)" }}>
          عشرة أسئلة قصيرة في الحروف والمفردات والقواعد والقراءة. أجب بصدق
          لتحصل على المستوى الأنسب لك.
        </p>
      </header>
      <TestRunner />
    </section>
  );
}
