import FactsExplorer from "@/components/FactsExplorer";
import DictionaryLookup from "@/components/DictionaryLookup";
import Bilingual from "@/components/Bilingual";

export const metadata = {
  title: "معلومات وقاموس | Facts & Dictionary — تعلّم مع مريانا",
  description:
    "استكشف معلومات لغوية من API Ninjas مع بحث وتصفّح، وابحث عن معنى الكلمات الإنجليزية.",
};

/*
  /facts — the API showcase page. It is styled with BOOTSTRAP 5 (loaded via CDN
  below), fulfilling the "Implement Bootstrap 5 for layout and components"
  requirement, and it hosts BOTH external key-based API Ninjas integrations:
    - FactsExplorer  → facts list with client-side search + filter + pagination
    - DictionaryLookup → live English-word definition lookup
  Both render the required loading / error / empty states.
*/
export default function FactsPage() {
  return (
    <>
      {/* Bootstrap 5 (CDN) — used for the layout, cards, forms & pagination here */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />

      <section className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <header className="text-center mb-5">
          <h1 style={{ color: "var(--teal)" }}>
            <Bilingual ar="معلومات وقاموس" en="Facts & Dictionary" />
          </h1>
          <p className="text-secondary">
            <Bilingual
              ar="بيانات حيّة من API Ninjas — مع بحث وتصفية وتصفّح للصفحات"
              en="Live data from API Ninjas — with search, filtering and pagination"
            />
          </p>
        </header>

        <FactsExplorer />
        <hr className="my-5" />
        <DictionaryLookup />
      </section>
    </>
  );
}
