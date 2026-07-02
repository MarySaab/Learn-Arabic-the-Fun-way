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
          أربعة أقسام — قراءة وكتابة واستماع وقواعد — ستة عشر سؤالاً متدرّج
          الصعوبة. ستحصل على مستوى عامّ ومستوى لكلّ مهارة على حدة، لأنّ من
          يقرأ جيّداً قد يحتاج تقويةً في القواعد، والعكس صحيح.
        </p>
      </header>
      <TestRunner />
    </section>
  );
}
