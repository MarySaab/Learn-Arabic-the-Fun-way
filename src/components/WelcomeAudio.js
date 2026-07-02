"use client";

import { useEffect, useRef, useState } from "react";

/*
  WelcomeAudio — a "listen to Mariana's welcome" button in the Meet Mariana
  section. It only appears once the real recording exists at
  /public/audio/welcome.mp3, so there's no broken button before Mary records
  it — and it lights up automatically the moment the file is added.
*/
export default function WelcomeAudio() {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/audio/welcome.mp3");
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      setReady(true);
    };
    // on error we simply never show the button
    return () => {
      audio.pause();
    };
  }, []);

  if (!ready) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button type="button" className="btn btn-gold" onClick={toggle}>
      {playing ? "⏹ إيقاف" : "🔊 استمع إلى ترحيب مريانا"}
    </button>
  );
}
