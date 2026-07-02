import Bilingual from "@/components/Bilingual";
import BookingForm from "@/components/BookingForm";
import ScrollRevealClient from "@/components/ScrollRevealClient";

export const metadata = {
  title: "احجز حصّة | Book a Session — تعلّم مع مريانا",
  description: "احجز حصّة تعلّم عربية مع مريانا. سنتواصل معك لتأكيد الموعد.",
};

export default function BookPage({ searchParams }) {
  // If the visitor arrived from the test result (/book?level=intermediate),
  // pre-fill the level. It stays editable.
  const initialLevel = searchParams?.level || "";

  return (
    <section className="container">
      <ScrollRevealClient />
      <header style={{ textAlign: "center", maxWidth: "56ch", margin: "0 auto 32px" }}>
        <h1><Bilingual ar="احجز حصّة" en="Book a Session" /></h1>
        <p style={{ color: "var(--teal)" }}>
          املأ النموذج وسنتواصل معك لتأكيد موعد حصّتك. الحقول المطلوبة تُتحقَّق أثناء الكتابة.
        </p>
      </header>
      <BookingForm initialLevel={initialLevel} />
    </section>
  );
}
