// AudioPlayer — plays REAL recorded audio when available, with a graceful
// fallback to the browser's Arabic text-to-speech (Speaker class).
//
// How it works: play("listen-1", "النص...") first tries /audio/listen-1.mp3
// (Mariana's own recording, dropped into public/audio/). If the file doesn't
// exist or can't play, the same text is spoken by the free browser voice.
// Playback speed applies to both (0.75 / 1 / 1.25).
import Speaker from "./Speaker";

export default class AudioPlayer {
  constructor(basePath = "/audio") {
    this.basePath = basePath;
    this.speaker = new Speaker();
    this.current = null;
  }

  stop() {
    if (this.current) {
      this.current.pause();
      this.current = null;
    }
    this.speaker.stop();
  }

  play(key, fallbackText, { rate = 1 } = {}) {
    if (typeof window === "undefined") return;
    this.stop();

    if (!key) {
      if (fallbackText) this.speaker.speak(fallbackText, { rate: rate * 0.9 });
      return;
    }

    let fellBack = false;
    const fallBack = () => {
      if (fellBack) return; // onerror and play().catch can both fire
      fellBack = true;
      if (fallbackText) this.speaker.speak(fallbackText, { rate: rate * 0.9 });
    };

    const audio = new Audio(`${this.basePath}/${key}.mp3`);
    audio.playbackRate = rate;
    audio.onerror = fallBack;
    this.current = audio;
    audio.play().catch(fallBack);
  }
}
