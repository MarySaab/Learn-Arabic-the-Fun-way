// ApiClient — the browser-side client for our own API routes (rubric names this
// class ApiClient). It never talks to the external API Ninjas service directly;
// it only calls OUR server routes (/api/facts, /api/quote), which hold the
// secret key. This keeps the API key off the browser entirely.
export default class ApiClient {
  constructor(baseEndpoint = "/api") {
    this.baseEndpoint = baseEndpoint;
  }

  // Fetches the "Quote of the Day". Throws on failure so the UI can render its
  // error state.
  async fetchQuote({ signal } = {}) {
    const res = await fetch(`${this.baseEndpoint}/quote`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`تعذّر جلب الاقتباس (${res.status})`);
    }
    return res.json();
  }

  // Fetches the LIST of "Did you know?" facts from our /api/facts route (which
  // calls the external API Ninjas service server-side using the secret key).
  // Returns { facts: string[], source }.
  async fetchFacts({ signal } = {}) {
    const res = await fetch(`${this.baseEndpoint}/facts`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`تعذّر جلب المعلومات (${res.status})`);
    }
    return res.json();
  }
}
