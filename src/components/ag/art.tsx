/* Generated artwork used in place of photography. Everything is deterministic (seeded)
   so server and client renders match. Swap any <ArtTile>/<Portrait> for <Image> later. */

export function rng(seed: number) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

/* ---------- Abstract AI artwork tiles ---------- */

export function ArtTile({ variant = 0, seed = 1, className = "" }: { variant?: number; seed?: number; className?: string }) {
  const id = `art${variant}-${seed}`;
  const r = rng(seed + variant * 101);
  const v = variant % 6;

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden>
      <defs>
        <radialGradient id={`${id}-m`}><stop offset="0" stopColor="#4cc9ff" /><stop offset="1" stopColor="#1f8bff" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-b`}><stop offset="0" stopColor="#5b7bff" /><stop offset="1" stopColor="#0a3fb8" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-c`}><stop offset="0" stopColor="#5ef2ff" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-o`}><stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#0ea5e9" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1f8bff" /><stop offset="1" stopColor="#0a3fb8" /></linearGradient>
        <linearGradient id={`${id}-w`} x1="0" x2="1"><stop offset="0" stopColor="#38bdf8" /><stop offset="0.5" stopColor="#1f8bff" /><stop offset="1" stopColor="#0a3fb8" /></linearGradient>
        <radialGradient id={`${id}-s`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ffffff" /><stop offset="0.18" stopColor="#cfe8ff" /><stop offset="0.55" stopColor="#1f8bff" /><stop offset="1" stopColor="#0b1f4b" />
        </radialGradient>
        <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="18" /></filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {v === 0 && (
        <>
          <rect width="400" height="400" fill="#0a0f2e" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={f(r() * 400)} cy={f(r() * 400)} r={f(110 + r() * 110)} fill={`url(#${id}-${["m", "b", "c"][i % 3]})`} opacity="0.85" />
          ))}
          {Array.from({ length: 70 }).map((_, i) => (
            <circle key={`s${i}`} cx={f(r() * 400)} cy={f(r() * 400)} r={f(r() * 1.6 + 0.3)} fill="#fff" opacity={f(r() * 0.8 + 0.2)} />
          ))}
          <ellipse cx="200" cy="210" rx="150" ry="46" fill="none" stroke="#fff" strokeOpacity="0.35" transform="rotate(-18 200 210)" />
          <circle cx="200" cy="200" r="58" fill={`url(#${id}-s)`} />
        </>
      )}

      {v === 1 && (
        <>
          <rect width="400" height="400" fill="#07091a" />
          <circle cx="200" cy="200" r="220" fill={`url(#${id}-o)`} opacity="0.35" filter={`url(#${id}-blur)`} />
          <g filter={`url(#${id}-glow)`} fill="none" strokeLinecap="round">
            {Array.from({ length: 30 }).map((_, i) => {
              const edge = i % 4;
              const t = r() * 400;
              const [x, y] = edge === 0 ? [0, t] : edge === 1 ? [400, t] : edge === 2 ? [t, 0] : [t, 400];
              const mx = 140 + r() * 120, my = 140 + r() * 120;
              const d = edge < 2 ? `M${f(x)} ${f(y)} H${f(mx)} V${f(my)}` : `M${f(x)} ${f(y)} V${f(my)} H${f(mx)}`;
              return (
                <g key={i}>
                  <path d={d} stroke={i % 3 ? "#22d3ee" : "#4cc9ff"} strokeWidth="1.6" strokeOpacity="0.9" />
                  <circle cx={f(mx)} cy={f(my)} r="3" fill="#bfe6ff" />
                </g>
              );
            })}
          </g>
          <rect x="150" y="150" width="100" height="100" rx="14" fill="#140d24" stroke="#38bdf8" strokeWidth="2" />
          <rect x="170" y="170" width="60" height="60" rx="8" fill={`url(#${id}-w)`} opacity="0.85" />
        </>
      )}

      {v === 2 && (
        <>
          <rect width="400" height="400" fill={`url(#${id}-l)`} />
          <circle cx="90" cy="80" r="160" fill={`url(#${id}-c)`} opacity="0.55" />
          <circle cx="200" cy="210" r="125" fill={`url(#${id}-s)`} />
          <ellipse cx="200" cy="210" rx="185" ry="40" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" transform="rotate(-20 200 210)" />
          <circle cx="320" cy="90" r="22" fill={`url(#${id}-s)`} />
          <circle cx="70" cy="320" r="14" fill={`url(#${id}-s)`} />
        </>
      )}

      {v === 3 && (
        <>
          <rect width="400" height="400" fill="#0d1a42" />
          <circle cx="320" cy="80" r="180" fill={`url(#${id}-m)`} opacity="0.5" />
          <circle cx="60" cy="340" r="160" fill={`url(#${id}-b)`} opacity="0.6" />
          <g fill="none" stroke={`url(#${id}-w)`}>
            {Array.from({ length: 26 }).map((_, i) => {
              const amp = 30 + i * 2.2, ph = i * 0.22, y0 = 60 + i * 11;
              const pts = Array.from({ length: 41 }, (_, k) => `${k * 10},${f(y0 + Math.sin(k * 0.22 + ph) * amp * Math.sin(k * 0.08))}`);
              return <polyline key={i} points={pts.join(" ")} strokeWidth="1.2" strokeOpacity={f(0.25 + (i / 26) * 0.6)} />;
            })}
          </g>
        </>
      )}

      {v === 4 && (
        <>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#090a2b" /><stop offset="0.6" stopColor="#0a2a6b" /><stop offset="1" stopColor="#1f8bff" /></linearGradient>
          <rect width="400" height="400" fill={`url(#${id}-sky)`} />
          <circle cx="200" cy="200" r="95" fill={`url(#${id}-w)`} transform="rotate(90 200 200)" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="100" y={208 + i * 12} width="200" height={3 + i * 1.4} fill="#0c2f6e" />)}
          <rect x="0" y="262" width="400" height="138" fill="#06122b" />
          <g stroke="#4cc9ff" strokeOpacity="0.8" strokeWidth="1.2">
            {Array.from({ length: 9 }).map((_, i) => { const y = 262 + Math.pow(i / 8, 1.8) * 138; return <line key={`h${i}`} x1="0" x2="400" y1={f(y)} y2={f(y)} />; })}
            {Array.from({ length: 17 }).map((_, i) => <line key={`v${i}`} x1="200" y1="262" x2={f(-400 + i * 75)} y2="400" />)}
          </g>
        </>
      )}

      {v === 5 && (
        <>
          <rect width="400" height="400" fill="#0b1235" />
          <circle cx="200" cy="200" r="200" fill={`url(#${id}-b)`} opacity="0.6" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x={f(80 + r() * 140)} y={f(80 + r() * 140)} width={f(70 + r() * 90)} height={f(70 + r() * 90)} rx="18"
              fill={`url(#${id}-l)`} opacity={f(0.25 + r() * 0.45)}
              stroke="#fff" strokeOpacity="0.35"
              transform={`rotate(${f(r() * 90)} 200 200)`}
            />
          ))}
          <polygon points="200,110 278,155 278,245 200,290 122,245 122,155" fill="none" stroke="#5ef2ff" strokeWidth="2" filter={`url(#${id}-glow)`} />
          <circle cx="200" cy="200" r="30" fill={`url(#${id}-s)`} />
        </>
      )}
    </svg>
  );
}

/* ---------- Placeholder portraits ---------- */

const SKIN = ["#f1c6a6", "#d9a07a", "#b97c55", "#8d5a3b", "#f6d4b8", "#c98e66"];
const HAIR = ["#2b1d14", "#4a3020", "#121212", "#8a5a2b", "#5b5b66", "#1f1a2e"];
const SUIT = ["#1e2a4a", "#2d3c66", "#1d3a66", "#1c3b4a", "#24406b", "#24304f"];
const BG = [["#e8ecf8", "#c9d3f0"], ["#e6effa", "#c6daf2"], ["#e5f0f6", "#bcd6e8"], ["#eef2f7", "#cfdbe9"]];

export function Portrait({ seed = 1, className = "" }: { seed?: number; className?: string }) {
  const id = `pt${seed}`;
  const skin = SKIN[seed % SKIN.length], hair = HAIR[(seed * 3) % HAIR.length], suit = SUIT[(seed * 5) % SUIT.length];
  const bg = BG[seed % BG.length];
  const longHair = seed % 3 === 1;
  return (
    <svg viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={bg[0]} /><stop offset="1" stopColor={bg[1]} /></linearGradient>
        <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={suit} /><stop offset="1" stopColor="#0d1a42" /></linearGradient>
      </defs>
      <rect width="400" height="420" fill={`url(#${id}-bg)`} />
      <rect x="40" y="40" width="90" height="300" rx="6" fill="#fff" opacity="0.35" />
      <rect x="290" y="70" width="70" height="260" rx="6" fill="#fff" opacity="0.25" />
      {longHair && <path d="M128 170 Q120 330 150 360 L250 360 Q282 330 272 170 Z" fill={hair} />}
      <path d="M70 420 C80 330 130 300 200 300 C270 300 320 330 330 420 Z" fill={`url(#${id}-suit)`} />
      <path d="M170 300 L200 360 L230 300 Z" fill="#f4f6ff" />
      <rect x="178" y="250" width="44" height="60" rx="18" fill={skin} />
      <ellipse cx="200" cy="190" rx="66" ry="80" fill={skin} />
      <path d={longHair ? "M132 190 C120 100 180 92 200 96 C240 92 286 110 268 196 C258 150 230 128 200 130 C170 128 146 146 132 190 Z" : "M136 178 C128 110 176 96 204 100 C246 100 276 124 266 178 C256 140 232 128 200 128 C170 128 148 140 136 178 Z"} fill={hair} />
      <ellipse cx="176" cy="196" rx="6" ry="4" fill="#2a1d18" />
      <ellipse cx="224" cy="196" rx="6" ry="4" fill="#2a1d18" />
      <path d="M182 236 Q200 248 218 236" stroke="#8a4a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const AV = [["#1f8bff", "#2563eb"], ["#0a3fb8", "#22d3ee"], ["#f97316", "#1f8bff"], ["#10b981", "#0a3fb8"], ["#1f8bff", "#38bdf8"]];

export function Avatars({ names, size = 44 }: { names: string[]; size?: number }) {
  return (
    <div className="flex">
      {names.map((n, i) => (
        <span
          key={n}
          className="grid place-items-center rounded-full border-2 border-white font-ag text-xs font-bold text-white"
          style={{ width: size, height: size, marginLeft: i ? -size * 0.28 : 0, background: `linear-gradient(135deg, ${AV[i % AV.length][0]}, ${AV[i % AV.length][1]})` }}
        >
          {n.split(" ").map((p) => p[0]).join("")}
        </span>
      ))}
    </div>
  );
}

/* ---------- Glossy 3D tube blobs ---------- */

const TUBES = {
  spring: "M70 290 C40 150 200 90 220 200 C240 300 120 300 150 200 C180 110 340 120 380 60",
  loop: "M90 90 C260 40 340 190 230 260 C130 320 90 200 190 180 C280 160 330 260 380 310",
  hook: "M120 70 C300 40 350 230 210 270 C90 300 110 160 230 190",
  s: "M60 280 C80 120 230 140 220 230 C210 320 360 320 370 120",
  spiral: "M230.0 180.0 L231.1 181.3 L232.0 182.9 L232.7 184.8 L233.1 186.8 L233.2 189.0 L232.9 191.3 L232.3 193.7 L231.2 196.1 L229.8 198.3 L228.0 200.5 L225.8 202.5 L223.2 204.2 L220.3 205.6 L217.1 206.6 L213.6 207.3 L210.0 207.4 L206.3 207.1 L202.4 206.3 L198.6 204.9 L194.9 203.0 L191.4 200.5 L188.1 197.5 L185.1 194.0 L182.5 190.0 L180.4 185.6 L178.8 180.9 L177.8 175.8 L177.4 170.6 L177.7 165.1 L178.7 159.6 L180.5 154.2 L182.9 148.9 L186.1 143.8 L190.0 139.0 L194.5 134.7 L199.7 130.8 L205.4 127.6 L211.6 125.0 L218.2 123.2 L225.1 122.2 L232.2 122.1 L239.4 122.8 L246.7 124.5 L253.8 127.0 L260.6 130.5 L267.1 134.9 L273.1 140.2 L278.6 146.2 L283.3 153.0 L287.2 160.4 L290.3 168.4 L292.3 176.9 L293.4 185.6 L293.4 194.6 L292.2 203.7 L290.0 212.7 L286.6 221.4 L282.1 229.9 L276.5 237.8 L269.9 245.1 L262.3 251.6 L254.0 257.3 L244.8 261.9 L235.0 265.5 L224.7 267.9 L214.1 269.0 L203.3 268.8 L192.4 267.3 L181.7 264.5 L171.2 260.3 L161.2 254.9 L151.8 248.1 L143.2 240.2 L135.5 231.2 L128.9 221.2 L123.5 210.4 L119.3 198.8 L116.6 186.7 L115.4 174.2 L115.6 161.5 L117.4 148.8 L120.8 136.3 L125.7 124.1 L132.1 112.5 L140.0 101.6 L149.2 91.7 L159.7 82.8 L171.2 75.2 L183.7 69.0 L197.1 64.2 L211.0 61.1 L225.3 59.7 L239.9 60.0 L254.5 62.1 L268.8 66.0 L282.7 71.6 L295.9 79.0 L308.3 87.9 L319.6 98.4 L329.7 110.2 L338.3 123.4 L345.4 137.6 L350.8 152.6 L354.3 168.4 L355.9 184.6 L355.6 201.0 L353.3 217.4 L348.9 233.5 L342.6 249.2 L334.4 264.1 L324.4 278.0 L312.7 290.7 L299.4 302.0 L284.8 311.7 L269.0 319.7 L252.1 325.7 L234.6 329.7 L216.5 331.6",
} as const;

export function Tube({
  shape = "spring",
  className = "",
  width = 64,
  ...rest
}: { shape?: keyof typeof TUBES; className?: string; width?: number } & Omit<React.SVGProps<SVGSVGElement>, "width">) {
  const id = `tube-${shape}`;
  const d = TUBES[shape];
  // Body paths share pathLength=1 so the scroll draw-in (Motion.tsx) can grow them together.
  const body = { d, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1, strokeDasharray: "1 1", className: "tube-body" };
  return (
    <svg viewBox="0 0 440 360" className={className} aria-hidden overflow="visible" data-tube {...rest}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fd3ff">
            <animate attributeName="stop-color" values="#9fd3ff;#bfe6ff;#9fd3ff" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="0.45" stopColor="#1f8bff" />
          <stop offset="1" stopColor="#0a3fb8">
            <animate attributeName="stop-color" values="#0a3fb8;#0a3fb8;#0a3fb8" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0a2a6b" floodOpacity="0.45" /></filter>
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="5" /></filter>
        {/* Liquid wobble: slowly drifting noise displaces the tube's silhouette. */}
        <filter id={`${id}-wobble`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="1" seed={shape.length} result="n">
            <animate attributeName="baseFrequency" values="0.004;0.007;0.004" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id}-sh)`}>
        <g className="tube-float" filter={`url(#${id}-wobble)`}>
          <path {...body} stroke={`url(#${id}-g)`} strokeWidth={width} />
          <path {...body} stroke="#0a2a6b" strokeOpacity="0.35" strokeWidth={width * 0.5} transform="translate(8 10)" filter={`url(#${id}-soft)`} />
          <path {...body} stroke="#fff" strokeOpacity="0.4" strokeWidth={width * 0.22} transform="translate(-9 -11)" filter={`url(#${id}-soft)`} />
          {/* Glint that travels along the tube once it has been drawn. */}
          <path
            d={d}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.9"
            strokeWidth={width * 0.16}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.1 0.9"
            transform="translate(-9 -11)"
            filter={`url(#${id}-soft)`}
            className="tube-sheen"
          />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Glossy sphere (CSS) ---------- */

export function Orb({ className = "", hue = "violet" }: { className?: string; hue?: "violet" | "pink" | "blue" }) {
  const c = { violet: ["#cfe8ff", "#1f8bff", "#0b1f5c"], pink: ["#d6ecff", "#1f8bff", "#0a2a6b"], blue: ["#c7d2ff", "#0a3fb8", "#0b1449"] }[hue];
  return (
    <div
      aria-hidden
      className={`rounded-full ${className}`}
      style={{ background: `radial-gradient(circle at 32% 28%, #fff 0, ${c[0]} 10%, ${c[1]} 48%, ${c[2]} 100%)`, boxShadow: `0 30px 60px -20px ${c[2]}` }}
    />
  );
}

/* ---------- 3D geometric stat shapes ---------- */

export function Shape3D({ type }: { type: "rod" | "cone" | "bowl" | "cube" | "gem" }) {
  const id = `sh-${type}`;
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e0f2fe" /><stop offset="1" stopColor="#60a5fa" /></linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#93c5fd" /><stop offset="1" stopColor="#1d4ed8" /></linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82f6" /><stop offset="1" stopColor="#1e3a8a" /></linearGradient>
      </defs>
      {type === "rod" && (
        <g transform="rotate(-45 60 60)">
          <rect x="44" y="6" width="32" height="108" rx="16" fill={`url(#${id}-a)`} />
          {Array.from({ length: 6 }).map((_, i) => <path key={i} d={`M44 ${24 + i * 15} L76 ${14 + i * 15}`} stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />)}
          <ellipse cx="60" cy="10" rx="16" ry="6" fill="#f5f3ff" />
        </g>
      )}
      {type === "cone" && (
        <>
          <path d="M34 10 L104 82 Q70 108 26 102 Z" fill={`url(#${id}-b)`} />
          <path d="M34 10 L26 102 Q40 104 52 102 Z" fill="#bfdbfe" opacity="0.7" />
          <path d="M26 102 Q70 108 104 82" fill="none" stroke="#1e3a8a" strokeWidth="3" />
        </>
      )}
      {type === "bowl" && (
        <>
          <path d="M6 48 Q60 140 114 48 Z" fill={`url(#${id}-b)`} />
          {Array.from({ length: 5 }).map((_, i) => <path key={i} d={`M${18 + i * 18} 52 Q${34 + i * 18} 78 ${22 + i * 18} 98`} stroke="#bfdbfe" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />)}
          <ellipse cx="60" cy="48" rx="54" ry="13" fill={`url(#${id}-a)`} />
        </>
      )}
      {type === "cube" && (
        <>
          <polygon points="60,12 106,36 60,60 14,36" fill={`url(#${id}-a)`} />
          <polygon points="14,36 60,60 60,112 14,88" fill={`url(#${id}-b)`} />
          <polygon points="60,60 106,36 106,88 60,112" fill={`url(#${id}-c)`} />
        </>
      )}
      {type === "gem" && (
        <>
          <polygon points="60,8 104,34 110,74 60,112 10,74 16,34" fill={`url(#${id}-b)`} />
          <polygon points="60,8 104,34 60,48" fill="#e0f2fe" />
          <polygon points="60,8 16,34 60,48" fill="#bfdbfe" />
          <polygon points="16,34 60,48 36,82 10,74" fill="#60a5fa" />
          <polygon points="104,34 110,74 84,82 60,48" fill="#1d4ed8" />
          <polygon points="36,82 60,48 84,82 60,112" fill="#3b82f6" />
        </>
      )}
    </svg>
  );
}

/* ---------- Small decorative bits ---------- */

export function Sparkle({ className = "", color = "#38bdf8" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" fill={color} />
    </svg>
  );
}

/** Halftone wave: dotted strokes made with zero-length dashes. */
export function DotWave({ className = "", rows = 26 }: { className?: string; rows?: number }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="dw-g" x1="0" x2="1"><stop offset="0" stopColor="#60a5fa" /><stop offset="0.5" stopColor="#38bdf8" /><stop offset="1" stopColor="#67e8f9" /></linearGradient>
      </defs>
      <g fill="none" stroke="url(#dw-g)" strokeLinecap="round" strokeDasharray="0.1 9" strokeWidth="3.4">
        {Array.from({ length: rows }).map((_, i) => {
          const y0 = 40 + i * 16;
          const pts = Array.from({ length: 33 }, (_, k) => `${k * 25},${f(y0 + Math.sin(k * 0.25 + i * 0.18) * (60 + i * 3))}`);
          return <polyline key={i} points={pts.join(" ")} opacity={f(0.25 + (i / rows) * 0.6)} />;
        })}
      </g>
    </svg>
  );
}

/* ---------- Iridescent chrome 3D objects ---------- */

export function Chrome3D({ variant, className = "" }: { variant: "blob" | "ring" | "capsule" | "knot"; className?: string }) {
  const id = `chr-${variant}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden overflow="visible">
      <defs>
        <radialGradient id={`${id}-ball`} cx="0.32" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.07" stopColor="#dfe4ff" />
          <stop offset="0.22" stopColor="#6c78c9" />
          <stop offset="0.45" stopColor="#141a45" />
          <stop offset="0.78" stopColor="#05071a" />
          <stop offset="0.92" stopColor="#5b2a8a" />
          <stop offset="1" stopColor="#1f8bff" />
        </radialGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f6ff" />
          <stop offset="0.18" stopColor="#5a64b8" />
          <stop offset="0.4" stopColor="#0a0e2a" />
          <stop offset="0.6" stopColor="#2b3790" />
          <stop offset="0.78" stopColor="#e8ebff" />
          <stop offset="1" stopColor="#0a3fb8" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1f8bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="2.5" /></filter>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity="0.6" /></filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        {variant === "blob" && (
          <>
            <path d="M100 18 C150 16 186 52 184 102 C182 150 146 186 98 184 C50 182 16 150 18 100 C20 54 52 20 100 18Z" fill={`url(#${id}-ball)`} />
            <ellipse cx="78" cy="70" rx="34" ry="24" fill="#05071a" opacity="0.85" transform="rotate(-28 78 70)" />
            <path d="M52 78 C60 52 92 44 106 62" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" filter={`url(#${id}-soft)`} />
            <path d="M40 150 C70 178 140 178 168 128" stroke={`url(#${id}-rim)`} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" filter={`url(#${id}-soft)`} />
          </>
        )}
        {variant === "ring" && (
          <>
            <ellipse cx="100" cy="100" rx="66" ry="66" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="40" />
            <ellipse cx="100" cy="100" rx="84" ry="84" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="2.5" opacity="0.7" filter={`url(#${id}-soft)`} />
            <path d="M48 70 A62 62 0 0 1 120 40" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" filter={`url(#${id}-soft)`} />
            <path d="M148 130 A58 58 0 0 1 100 160" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" filter={`url(#${id}-soft)`} />
          </>
        )}
        {variant === "capsule" && (
          <>
            <rect x="46" y="14" width="108" height="172" rx="54" fill={`url(#${id}-metal)`} />
            <rect x="74" y="50" width="52" height="100" rx="26" fill="#05071a" />
            <rect x="74" y="50" width="52" height="100" rx="26" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="2" opacity="0.8" />
            <path d="M62 60 C62 36 80 24 100 24" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" filter={`url(#${id}-soft)`} />
          </>
        )}
        {variant === "knot" && (
          <>
            <ellipse cx="80" cy="100" rx="56" ry="76" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="24" transform="rotate(-30 80 100)" />
            <ellipse cx="120" cy="100" rx="56" ry="76" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="24" transform="rotate(30 120 100)" />
            <path d="M58 40 C80 26 108 30 118 44" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" filter={`url(#${id}-soft)`} />
            <circle cx="100" cy="100" r="10" fill={`url(#${id}-rim)`} opacity="0.85" filter={`url(#${id}-soft)`} />
          </>
        )}
      </g>
    </svg>
  );
}
