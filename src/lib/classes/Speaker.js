// Speaker — Arabic text-to-speech via the browser's built-in Web Speech API,
// wrapped in an ES6 class. This is the free, no-key solution (the same
// technique used in Mariana's standalone practice pages): it works offline,
// costs nothing, and supports playback speeds. Voice quality depends on the
// visitor's device — components should show a gentle hint when no Arabic
// voice is installed. Real recorded MP3s can replace this later.
export default class Speaker {
  constructor(lang = "ar-SA") {
    this.lang = lang;
    this.voice = null;
    if (this.available()) {
      this.pickVoice();
      window.speechSynthesis.onvoiceschanged = () => this.pickVoice();
    }
  }

  available() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  pickVoice() {
    const v = window.speechSynthesis
      .getVoices()
      .find((x) => x.lang && x.lang.startsWith("ar"));
    if (v) this.voice = v;
  }

  hasArabicVoice() {
    return !!this.voice;
  }

  // Speaks the text (cancelling anything already playing). rate: 0.75 / 1 / 1.25
  speak(text, { rate = 0.9, onend } = {}) {
    if (!this.available()) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = this.lang;
    u.rate = rate;
    if (this.voice) u.voice = this.voice;
    if (onend) u.onend = onend;
    window.speechSynthesis.speak(u);
    return true;
  }

  stop() {
    if (this.available()) window.speechSynthesis.cancel();
  }
}
