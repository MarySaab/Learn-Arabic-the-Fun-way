// WordClient — wraps the request for the "كلمة اليوم" (Word of the Day) card.
// Kept as an ES6 class so the fetching logic is reusable and easy to reason
// about, per the rubric.
//
// Important: this class only ever talks to OUR OWN server route
// (/api/word-of-day). The real external API (API Ninjas) is called on the
// server in Step 6, so the API key never reaches the browser. For now that
// route returns sample data, so this card is fully testable already.
export default class WordClient {
  constructor(endpoint = "/api/word-of-day") {
    this.endpoint = endpoint;
  }

  // Resolves to the word object, or throws so the UI can show its error state.
  async fetchWord({ signal } = {}) {
    const res = await fetch(this.endpoint, { signal, cache: "no-store" });
    if (!res.ok) {
      throw new Error(`تعذّر جلب كلمة اليوم (${res.status})`);
    }
    return res.json();
  }
}
