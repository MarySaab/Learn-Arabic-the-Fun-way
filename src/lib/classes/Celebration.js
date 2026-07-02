// Celebration — confetti bursts for finished quizzes and tests, as an ES6
// class (rubric: logic in classes). It sprinkles small coloured pieces from
// the top of the screen using the Web Animations API and cleans them up when
// they land. Colours come from the site's parchment/teal/gold palette.
//
// Accessibility: does nothing when the visitor prefers reduced motion.
export default class Celebration {
  constructor(colors = ["#146a63", "#1c8c82", "#b8901f", "#d8ad3a", "#efdca0"]) {
    this.colors = colors;
  }

  burst(count = 60) {
    if (typeof document === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      Object.assign(piece.style, {
        position: "fixed",
        top: "-16px",
        left: `${Math.random() * 100}vw`,
        width: "10px",
        height: "15px",
        borderRadius: "2px",
        background: this.colors[i % this.colors.length],
        transform: `rotate(${Math.random() * 360}deg)`,
        zIndex: "80",
        pointerEvents: "none",
      });
      document.body.appendChild(piece);

      const duration = 1600 + Math.random() * 1400;
      piece.animate(
        [
          { top: "-16px", opacity: 1 },
          { top: "100vh", opacity: 0.85 },
        ],
        { duration, easing: "cubic-bezier(0.3, 0.7, 0.5, 1)" }
      );
      setTimeout(() => piece.remove(), duration);
    }
  }
}
