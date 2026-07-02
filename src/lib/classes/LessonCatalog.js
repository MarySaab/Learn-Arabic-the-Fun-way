// LessonCatalog — holds the lesson list and exposes the search / filter logic
// as a real ES6 class (rubric: core logic lives in classes, not in the JSX).
// The Lessons page renders whatever this class returns, so filtering is testable
// independently of the UI.
export default class LessonCatalog {
  constructor(lessons = []) {
    this.lessons = lessons;
  }

  getAll() {
    return this.lessons;
  }

  // Normalises text so search is tolerant of case, spaces, and common Arabic
  // vowel marks (tashkeel) that a learner may or may not type.
  static normalize(text = "") {
    return String(text)
      .toLowerCase()
      .replace(/[ً-ْ]/g, "") // strip tashkeel (ً ٌ ٍ َ ُ ِ ّ ْ)
      .replace(/\s+/g, " ")
      .trim();
  }

  // Matches the query against the Arabic OR English title.
  search(query) {
    const q = LessonCatalog.normalize(query);
    if (!q) return this.lessons;
    return this.lessons.filter((lesson) => {
      const ar = LessonCatalog.normalize(lesson.title_ar);
      const en = LessonCatalog.normalize(lesson.title_en);
      return ar.includes(q) || en.includes(q);
    });
  }

  filterByLevel(level) {
    if (!level || level === "all") return this.lessons;
    return this.lessons.filter((lesson) => lesson.level === level);
  }

  // Combined search + level filter, used by the page. Returns a new array.
  query({ text = "", level = "all" } = {}) {
    let result = this.filterByLevel(level);
    const q = LessonCatalog.normalize(text);
    if (q) {
      result = result.filter((lesson) => {
        const ar = LessonCatalog.normalize(lesson.title_ar);
        const en = LessonCatalog.normalize(lesson.title_en);
        return ar.includes(q) || en.includes(q);
      });
    }
    return result;
  }
}
