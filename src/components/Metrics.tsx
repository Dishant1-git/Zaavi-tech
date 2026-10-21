"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Counter from "./Counter";

const metrics = [
  { to: 2.48, decimals: 2, suffix: "B", label: "Tokens processed today", live: true },
  { to: 37, prefix: "+", suffix: "%", label: "Average accuracy uplift" },
  { to: 180, suffix: "K", label: "Hours automated / month" },
  { to: 26, label: "Countries served" },
];

export default function Metrics() {
  const root = useRef<HTMLElement>(null);
  const [clock, setClock] = useState("");
  const [tokens, setTokens] = useState<number | null>(null);

  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    t();
    const id = setInterval(t, 1000);
    return () => {
      clearInterval(id);
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useGSAP(() => {
    // Once the count-up has finished, the live metric keeps ticking.
    ScrollTrigger.create({
      trigger: ".metrics-grid",
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.delayedCall(2.6, () => {
          let n = 2_480_000_000;
          tickRef.current = setInterval(() => {
            n += Math.floor(Math.random() * 90_000) + 20_000;
            setTokens(n);
          }, 120);
        }),
    });
    // Oscilloscope trace draws with scroll; the sweep head rides its end.
    const path = root.current!.querySelector<SVGPathElement>(".wave-path")!;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".wave",
        start: "top 95%",
        end: "bottom 35%",
        scrub: 0.6,
        onUpdate: (self) => {
          const pt = path.getPointAtLength(len * self.progress);
          gsap.set(".wave-head", { attr: { cx: pt.x, cy: pt.y } });
        },
      },
    });

    gsap.from(".metric", {
      autoAlpha: 0,
      y: 40,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: ".metrics-grid", start: "top 85%", once: true },
    });
    gsap.from(".metric-line", {
      scaleX: 0,
      stagger: 0.1,
      duration: 1.6,
      ease: "expo.inOut",
      scrollTrigger: { trigger: ".metrics-grid", start: "top 85%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden border-y border-white/5 bg-ink-2/60 py-28 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Live telemetry" title={<>Performance you can <span className="text-zinc-500">measure.</span></>} />
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            LIVE · <span className="tabular-nums text-white">{clock || "--:--:--"}</span> LOCAL
          </div>
        </div>

        <div className="metrics-grid mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="metric">
              <div className="metric-line mb-6 h-px origin-left bg-gradient-to-r from-cyan via-violet/50 to-transparent" />
              <div className="font-display text-5xl font-medium tracking-tight text-white lg:text-6xl">
                {m.live && tokens !== null ? (
                  <span className="tabular-nums">{(tokens / 1e9).toFixed(4)}B</span>
                ) : (
                  <Counter to={m.to} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} duration={2.5} />
                )}
              </div>
              <div className="mt-3 font-mono text-xs tracking-widest text-zinc-500 uppercase">{m.label}</div>
            </div>
          ))}
        </div>
        <svg className="wave mt-20 h-28 w-full overflow-visible" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="wave-g" x1="0" x2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.1" />
              <stop offset="0.6" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {[20, 60, 100].map((y) => <line key={y} x1="0" x2="1200" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 6" />)}
          <path className="wave-path" d="M0,60.0 L5,66.3 L10,69.2 L15,67.6 L20,64.1 L25,62.5 L30,68.8 L35,70.9 L40,72.7 L45,73.4 L50,72.8 L55,71.4 L60,69.9 L65,68.9 L70,68.2 L75,67.1 L80,65.0 L85,61.7 L90,57.9 L95,54.5 L100,52.0 L105,50.3 L110,48.8 L115,46.9 L120,44.5 L125,42.2 L130,41.0 L135,41.2 L140,42.7 L145,44.7 L150,46.6 L155,48.1 L160,49.7 L165,52.2 L170,55.9 L175,60.4 L180,64.9 L185,73.2 L190,72.9 L195,70.8 L200,70.6 L205,74.3 L210,80.8 L215,82.1 L220,82.4 L225,81.2 L230,79.0 L235,76.6 L240,74.5 L245,72.5 L250,70.0 L255,66.4 L260,61.8 L265,56.8 L270,52.4 L275,49.1 L280,46.8 L285,44.7 L290,42.5 L295,39.9 L300,37.8 L305,36.9 L310,37.7 L315,39.7 L320,42.3 L325,44.7 L330,46.7 L335,48.9 L340,52.0 L345,56.1 L350,60.9 L355,65.5 L360,69.1 L365,71.5 L370,70.4 L375,70.3 L380,74.0 L385,80.2 L390,84.9 L395,84.9 L400,78.9 L405,76.4 L410,74.0 L415,72.1 L420,70.4 L425,68.2 L430,65.1 L435,61.1 L440,57.0 L445,53.6 L450,51.4 L455,50.1 L460,49.1 L465,47.7 L470,46.0 L475,44.5 L480,44.2 L485,45.2 L490,47.3 L495,49.5 L500,51.2 L505,52.3 L510,53.4 L515,55.1 L520,57.8 L525,60.9 L530,63.6 L535,65.2 L540,65.8 L545,65.9 L550,66.3 L555,64.4 L560,69.7 L565,73.4 L570,72.7 L575,67.8 L580,61.9 L585,63.8 L590,63.2 L595,63.2 L600,63.0 L605,62.0 L610,60.3 L615,58.7 L620,57.8 L625,58.1 L630,59.0 L635,59.9 L640,60.0 L645,59.5 L650,58.9 L655,59.0 L660,60.0 L665,61.4 L670,62.5 L675,62.5 L680,61.7 L685,60.5 L690,59.8 L695,59.8 L700,60.1 L705,60.0 L710,58.8 L715,56.9 L720,54.8 L725,53.4 L730,53.0 L735,53.2 L740,57.8 L745,56.8 L750,52.2 L755,47.5 L760,46.5 L765,50.3 L770,55.0 L775,57.2 L780,58.8 L785,59.9 L790,61.1 L795,63.0 L800,65.8 L805,69.0 L810,71.6 L815,73.1 L820,73.5 L825,73.5 L830,73.7 L835,74.3 L840,74.8 L845,74.5 L850,72.8 L855,69.9 L860,66.5 L865,63.5 L870,61.1 L875,59.0 L880,56.5 L885,53.1 L890,49.2 L895,45.6 L900,43.0 L905,41.8 L910,41.6 L915,41.6 L920,41.3 L925,41.0 L930,37.5 L935,38.2 L940,43.9 L945,52.0 L950,58.6 L955,57.2 L960,60.0 L965,62.9 L970,66.4 L975,70.6 L980,74.8 L985,78.2 L990,80.1 L995,80.7 L1000,80.7 L1005,80.7 L1010,80.9 L1015,80.7 L1020,79.4 L1025,76.7 L1030,72.7 L1035,68.4 L1040,64.5 L1045,61.3 L1050,58.4 L1055,55.1 L1060,51.2 L1065,46.9 L1070,43.2 L1075,40.7 L1080,39.7 L1085,39.7 L1090,40.0 L1095,40.0 L1100,40.1 L1105,40.8 L1110,38.3 L1115,44.7 L1120,53.0 L1125,59.2 L1130,61.1 L1135,59.8 L1140,62.9 L1145,66.0 L1150,69.7 L1155,73.4 L1160,76.0 L1165,77.2 L1170,77.2 L1175,76.7 L1180,76.4 L1185,76.4 L1190,76.1 L1195,74.9 L1200,72.4" fill="none" stroke="url(#wave-g)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle className="wave-head" r="4" cx="0" cy="60" fill="#fff" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
        </svg>
      </div>
    </section>
  );
}
