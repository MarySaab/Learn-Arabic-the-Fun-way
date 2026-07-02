/*
  HeroArt — a decorative, hand-drawn-style SVG for the hero: an open book with
  Arabic letters rising from it as sparkles, plus stars and a crescent. Pure
  inline SVG (no image file), themed with the site's gold/parchment palette, and
  marked aria-hidden since it's decorative.
*/
export default function HeroArt({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 200"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* soft halo */}
      <circle cx="120" cy="96" r="78" fill="rgba(239,220,160,0.18)" />

      {/* crescent + stars */}
      <path d="M188 34a20 20 0 1 0 6 16 15 15 0 1 1-6-16Z" fill="#efdca0" />
      <g fill="#efdca0">
        <path d="M52 40l2.2 5.2L59 47l-4.8 1.8L52 54l-2.2-5.2L45 47l4.8-1.8z" />
        <path d="M206 96l1.6 3.8L212 101l-3.4 1.3L206 106l-1.6-3.7L201 101l3.4-1.2z" />
        <path d="M40 120l1.6 3.8L45 125l-3.4 1.3L40 130l-1.6-3.7L35 125l3.4-1.2z" />
      </g>

      {/* rising Arabic letters */}
      <g fill="#efdca0" fontFamily="var(--font-arabic)" fontWeight="800" opacity="0.95">
        <text x="86" y="52" fontSize="20">أ</text>
        <text x="118" y="40" fontSize="16">ب</text>
        <text x="150" y="56" fontSize="18">ت</text>
      </g>

      {/* open book */}
      <g>
        <path d="M120 150c-18-12-40-12-58-8V86c18-4 40-4 58 8 18-12 40-12 58-8v56c-18-4-40-4-58 8Z"
              fill="#f7f0dd" stroke="#b8901f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M120 94v56" stroke="#b8901f" strokeWidth="3" />
        {/* text lines */}
        <g stroke="#146a63" strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
          <path d="M74 104c12-2 26-2 38 4" />
          <path d="M74 116c12-2 26-2 38 4" />
          <path d="M74 128c12-2 26-2 38 4" />
          <path d="M166 108c-12-2-26-2-38 4" />
          <path d="M166 120c-12-2-26-2-38 4" />
          <path d="M166 132c-12-2-26-2-38 4" />
        </g>
      </g>
    </svg>
  );
}
