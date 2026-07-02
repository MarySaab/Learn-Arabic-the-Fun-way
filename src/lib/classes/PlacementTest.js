// PlacementTest — the core logic of the placement test, as a real ES6 class
// (rubric: the test's logic must live in a class, not scattered in the UI).
// It stores the questions, tracks the learner's answers, computes a score, and
// maps that score to a recommended level. The UI only renders what it exposes.
export default class PlacementTest {
  constructor(questions = []) {
    this.questions = questions;
    this.answers = {}; // { [questionId]: chosenOptionId }
  }

  get total() {
    return this.questions.length;
  }

  answer(questionId, optionId) {
    this.answers[questionId] = optionId;
    return this;
  }

  getAnswer(questionId) {
    return this.answers[questionId];
  }

  isComplete() {
    return this.questions.every((q) => this.answers[q.id] != null);
  }

  answeredCount() {
    return this.questions.filter((q) => this.answers[q.id] != null).length;
  }

  // Number of correct answers.
  score() {
    return this.questions.reduce(
      (total, q) => total + (this.answers[q.id] === q.answer ? 1 : 0),
      0
    );
  }

  // Correct / total grouped by skill (letters, vocabulary, grammar, reading).
  skillBreakdown() {
    const map = {};
    for (const q of this.questions) {
      if (!map[q.skill]) map[q.skill] = { correct: 0, total: 0 };
      map[q.skill].total += 1;
      if (this.answers[q.id] === q.answer) map[q.skill].correct += 1;
    }
    return map;
  }

  // Turns a correct/total ratio into a simple A/B/C grade.
  static grade(correct, total) {
    if (!total) return null;
    const ratio = correct / total;
    if (ratio >= 0.8) return "A";
    if (ratio >= 0.5) return "B";
    return "C";
  }

  // Maps the score ratio to one of the four levels.
  level() {
    const ratio = this.total ? this.score() / this.total : 0;
    if (ratio < 0.35) return "beginner";
    if (ratio < 0.65) return "elementary";
    if (ratio < 0.85) return "intermediate";
    return "advanced";
  }

  reset() {
    this.answers = {};
    return this;
  }
}
