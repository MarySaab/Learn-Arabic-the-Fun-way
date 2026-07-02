// ProgressTracker — remembers which lessons the visitor completed, stored in
// the browser's localStorage (no account needed). An ES6 class per the rubric.
// The lessons page uses it for the progress bar, the ✓ badges, and the
// "continue where you left off" card; LessonView marks a lesson complete when
// its practice quiz is finished.
export default class ProgressTracker {
  constructor(storageKey = "lwm-progress") {
    this.storageKey = storageKey;
  }

  // Returns a Set of completed lesson slugs (empty on the server or on error).
  read() {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = JSON.parse(localStorage.getItem(this.storageKey));
      return new Set(Array.isArray(raw) ? raw : []);
    } catch {
      return new Set();
    }
  }

  complete(slug) {
    const done = this.read();
    done.add(slug);
    localStorage.setItem(this.storageKey, JSON.stringify([...done]));
    return done;
  }

  isComplete(slug) {
    return this.read().has(slug);
  }

  count() {
    return this.read().size;
  }
}
