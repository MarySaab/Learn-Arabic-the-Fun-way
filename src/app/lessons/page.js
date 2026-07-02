import Bilingual from "@/components/Bilingual";
import LessonsExplorer from "@/components/LessonsExplorer";
import ScrollRevealClient from "@/components/ScrollRevealClient";

export const metadata = {
  title: "الدروس | Lessons — تعلّم مع مريانا",
  description: "تصفّح دروس اللغة العربية وابحث وصفِّ حسب المستوى.",
};

export default function LessonsPage() {
  return (
    <section className="container">
      <ScrollRevealClient />
      <header style={{ textAlign: "center", maxWidth: "60ch", margin: "0 auto 8px" }}>
        <h1><Bilingual ar="الدروس" en="Lessons" /></h1>
        <p style={{ color: "var(--teal)" }}>
          ثمانية عشر درساً من الحروف الأولى إلى القراءة والإعراب. ابحث بالعنوان
          أو صفِّ حسب المستوى، وجرّب دروس التدرّب التفاعليّة.
        </p>
      </header>
      <LessonsExplorer />
    </section>
  );
}
