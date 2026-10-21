import { DiscoverButton } from "./ui";

function Mascot() {
  return (
    <svg viewBox="0 0 420 460" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mb-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c9d8f5" /></linearGradient>
        <linearGradient id="mb-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#13244d" /><stop offset="1" stopColor="#0f1b33" /></linearGradient>
        <linearGradient id="mb-acc" x1="0" x2="1"><stop offset="0" stopColor="#1f8bff" /><stop offset="1" stopColor="#0a3fb8" /></linearGradient>
        <radialGradient id="mb-eye"><stop offset="0" stopColor="#ffffff" /><stop offset="0.4" stopColor="#67e8f9" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></radialGradient>
        <filter id="mb-sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#0b1f5c" floodOpacity="0.45" /></filter>
      </defs>
      <g filter="url(#mb-sh)">
        <path d="M90 460 C90 360 140 320 210 320 C280 320 330 360 330 460 Z" fill="url(#mb-body)" />
        <rect x="170" y="350" width="80" height="16" rx="8" fill="url(#mb-acc)" />
        <circle cx="210" cy="400" r="18" fill="url(#mb-acc)" />
        <rect x="185" y="285" width="50" height="45" rx="12" fill="#aab9e8" />
        <rect x="80" y="90" width="260" height="210" rx="90" fill="url(#mb-body)" />
        <rect x="60" y="165" width="34" height="70" rx="17" fill="url(#mb-acc)" />
        <rect x="326" y="165" width="34" height="70" rx="17" fill="url(#mb-acc)" />
        <rect x="110" y="128" width="200" height="140" rx="62" fill="url(#mb-face)" />
        <circle cx="168" cy="194" r="26" fill="url(#mb-eye)" />
        <circle cx="252" cy="194" r="26" fill="url(#mb-eye)" />
        <circle cx="168" cy="194" r="9" fill="#fff" />
        <circle cx="252" cy="194" r="9" fill="#fff" />
        <path d="M180 238 Q210 258 240 238" stroke="#67e8f9" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="205" y="50" width="10" height="44" rx="5" fill="#aab9e8" />
        <circle cx="210" cy="44" r="16" fill="url(#mb-acc)" />
        <path d="M325 425 C372 418 392 380 384 338" stroke="url(#mb-body)" strokeWidth="42" fill="none" strokeLinecap="round" />
        <ellipse cx="384" cy="326" rx="36" ry="18" fill="url(#mb-acc)" />
        <circle cx="384" cy="282" r="40" fill="#67e8f9" opacity="0.25" />
        <circle cx="384" cy="282" r="26" fill="url(#mb-eye)" />
        <circle cx="384" cy="282" r="12" fill="#fff" />
      </g>
    </svg>
  );
}

/** Closing call-to-action shown at the end of each page; its lower half blends into the footer. */
export default function CtaBand({ title, body, cta, href = "/contact" }: { title: string; body?: string; cta: string; href?: string }) {
  return (
    <section className="relative z-10 bg-[linear-gradient(to_bottom,transparent_62%,#0f1a4f_62%)] pt-10">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
        <div className="cta-panel relative overflow-hidden rounded-[40px] bg-[linear-gradient(180deg,#ffffff_0%,#dbeafe_25%,#3b82f6_62%,#1d4ed8_85%,#0b2a8a_100%)] px-6 pt-16 sm:rounded-[60px] lg:px-[100px] lg:pt-0">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(115deg,transparent_0_120px,rgba(255,255,255,0.6)_120px_121px)]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="cta-mascot order-2 mx-auto h-[340px] w-[310px] lg:order-1 lg:h-[500px] lg:w-[440px]">
              <Mascot />
            </div>
            <div className="order-1 lg:order-2 lg:py-24">
              <h2 data-split className="font-ag text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] text-ag-dark sm:text-[46px]">{title}</h2>
              {body && <p data-reveal="up" className="mt-6 max-w-[560px] text-[17px] leading-[1.75] font-medium text-ag-dark/75">{body}</p>}
              <div data-reveal="up" className="mt-9"><DiscoverButton href={href} label={cta} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
