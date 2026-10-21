/* Custom hero illustration (Part 10): an enterprise AI dashboard linking workflow automation,
   predictive analytics, cloud infrastructure and AI agents, in Zaavi's brand colours.
   It is illustrative only and makes no performance claims. */

import Icon from "./icons";

const forecast = "M0 70 L30 62 L60 66 L90 48 L120 52 L150 36 L180 40";
const projected = "M180 40 L210 28 L240 30 L270 16";

export default function Dashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(circle_at_50%_40%,rgba(31,139,255,0.45),transparent_70%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="ml-3 font-ag text-xs font-semibold text-white/80">AI Operations Overview</span>
          </div>
          <span className="flex items-center gap-1.5 font-ag text-[11px] font-semibold text-[#7cc4ff]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" /> Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Workflow automation */}
          <div data-depth className="col-span-2 rounded-2xl bg-[#0b1640]/80 p-4 sm:col-span-1">
            <div className="flex items-center gap-2 font-ag text-[11px] font-bold tracking-wider text-white/70 uppercase"><Icon name="workflow" className="h-4 w-4 text-[#7cc4ff]" /> Workflow automation</div>
            <svg viewBox="0 0 220 90" className="mt-3 w-full" aria-hidden>
              <path id="wf-path" d="M20 45 H80 M80 45 C100 45 100 20 120 20 H200 M80 45 C100 45 100 70 120 70 H200" fill="none" stroke="#2b6cff" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="4 4" />
              {[[20, 45], [80, 45], [200, 20], [200, 70]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="8" fill="#0b1640" stroke="#7cc4ff" strokeWidth="2" />
              ))}
              <circle r="4" fill="#fff">
                <animateMotion dur="2.6s" repeatCount="indefinite" path="M20 45 H80 C100 45 100 20 120 20 H200" />
              </circle>
              <circle r="4" fill="#7cc4ff">
                <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M20 45 H80 C100 45 100 70 120 70 H200" />
              </circle>
              <text x="200" y="40" textAnchor="middle" fontSize="8" fill="#9fb7e6" fontFamily="sans-serif">Done</text>
              <text x="200" y="88" textAnchor="middle" fontSize="8" fill="#9fb7e6" fontFamily="sans-serif">Review</text>
            </svg>
          </div>

          {/* Predictive analytics */}
          <div data-depth className="col-span-2 rounded-2xl bg-[#0b1640]/80 p-4 sm:col-span-1">
            <div className="flex items-center gap-2 font-ag text-[11px] font-bold tracking-wider text-white/70 uppercase"><Icon name="chart" className="h-4 w-4 text-[#7cc4ff]" /> Predictive analytics</div>
            <svg viewBox="0 0 270 90" className="mt-3 w-full" aria-hidden>
              <defs>
                <linearGradient id="fc-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f8bff" stopOpacity="0.45" /><stop offset="1" stopColor="#1f8bff" stopOpacity="0" /></linearGradient>
              </defs>
              {[20, 45, 70].map((y) => <line key={y} x1="0" x2="270" y1={y} y2={y} stroke="#fff" strokeOpacity="0.06" />)}
              <path d={`${forecast} L180 90 L0 90 Z`} fill="url(#fc-fill)" />
              <path className="dash-draw" d={forecast} fill="none" stroke="#7cc4ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d={projected} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" opacity="0.8" />
              <circle cx="270" cy="16" r="4" fill="#fff" />
              <text x="268" y="34" textAnchor="end" fontSize="8" fill="#9fb7e6" fontFamily="sans-serif">Forecast</text>
            </svg>
          </div>

          {/* Cloud infrastructure */}
          <div data-depth className="rounded-2xl bg-[#0b1640]/80 p-4">
            <div className="flex items-center gap-2 font-ag text-[11px] font-bold tracking-wider text-white/70 uppercase"><Icon name="cloud" className="h-4 w-4 text-[#7cc4ff]" /> Cloud</div>
            <div className="mt-4 space-y-2.5">
              {[["Compute", 72], ["Storage", 48], ["Data platform", 60]].map(([l, v]) => (
                <div key={l as string}>
                  <div className="flex justify-between font-ag text-[10px] text-white/60"><span>{l}</span><span>Healthy</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10">
                    <div className="h-full origin-left animate-[bar-grow_2.5s_ease-out_both] rounded-full bg-[linear-gradient(90deg,#1f8bff,#7cc4ff)]" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI agents */}
          <div data-depth className="rounded-2xl bg-[#0b1640]/80 p-4">
            <div className="flex items-center gap-2 font-ag text-[11px] font-bold tracking-wider text-white/70 uppercase"><Icon name="bot" className="h-4 w-4 text-[#7cc4ff]" /> AI agents</div>
            <ul className="mt-3 space-y-2 font-ag text-[10.5px] text-white/80">
              {[["Invoice processing", "#4ade80"], ["Ticket routing", "#7cc4ff"], ["Needs approval", "#fbbf24"]].map(([t, c]) => (
                <li key={t} className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
