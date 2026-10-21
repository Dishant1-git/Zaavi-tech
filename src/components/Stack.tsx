"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Marquee from "./Marquee";

/* Board coordinates live in a 1000 × 560 space shared by the SVG traces and the HTML nodes. */
const W = 1000, H = 560, CX = 500, CY = 280, R = 92;
const ROWS = [72, 128, 184, 240, 330, 386, 442, 498];

const groups = [
  { side: "left", label: "Foundation models", items: ["OpenAI", "Anthropic", "Mistral", "Hugging Face"] },
  { side: "left", label: "ML & agents", items: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex"] },
  { side: "right", label: "Vector & data", items: ["Pinecone", "Weaviate", "Databricks", "Snowflake"] },
  { side: "right", label: "Cloud & infra", items: ["AWS", "Google Cloud", "Azure", "Kubernetes"] },
] as const;

const nodes = groups.flatMap((g, gi) =>
  g.items.map((name, i) => {
    const left = g.side === "left";
    const y = ROWS[(gi % 2) * 4 + i];
    const x = left ? 135 : W - 135;
    // Circuit trace: straight out of the node, one bend, then into the core's rim.
    const sx = left ? 222 : W - 222;
    const bx = left ? 330 : W - 330;
    const ang = Math.atan2(y - CY, bx - CX);
    const ex = CX + Math.cos(ang) * R, ey = CY + Math.sin(ang) * R;
    return { name, left, x, y, sx, bx, d: `M${sx} ${y} H${bx} L${ex.toFixed(1)} ${ey.toFixed(1)}` };
  })
);

const extras = ["PostgreSQL", "Redis", "Vercel", "Next.js", "Kafka", "Airflow", "MLflow", "Weights & Biases", "Ray", "Supabase", "Docker", "Terraform"];

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(() => {
    const board = ".hub-board";
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: board, start: "top 85%", end: "center 50%", scrub: 1 },
    });
    tl.fromTo(".hub-core", { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4 })
      .fromTo(".hub-trace", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, stagger: 0.02 }, 0.15)
      .fromTo(
        ".hub-node",
        { autoAlpha: 0, x: (i: number) => (i < 8 ? -60 : 60), filter: "blur(6px)" },
        { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 0.4, stagger: 0.03 },
        0.25
      )
      .fromTo(".hub-packets", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, ">");

    // Core rings keep turning as the board scrolls past.
    gsap.utils.toArray<SVGGElement>(".hub-ring").forEach((ring, i) =>
      gsap.to(ring, {
        rotation: i % 2 ? -180 : 180,
        svgOrigin: `${CX} ${CY}`,
        ease: "none",
        scrollTrigger: { trigger: board, start: "top bottom", end: "bottom top", scrub: 1 },
      })
    );

    root.current!.querySelectorAll<HTMLElement>(".hub-label").forEach((el) => {
      const text = el.dataset.text!;
      el.textContent = "";
      gsap.to(el, {
        scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.5 },
        duration: 1,
        scrollTrigger: { trigger: board, start: "top 70%", once: true },
      });
    });

    gsap.from(".hub-tile", {
      autoAlpha: 0, y: 30, stagger: 0.04, duration: 0.8, ease: "expo.out",
      scrollTrigger: { trigger: ".hub-grid", start: "top 85%", once: true },
    });
  }, { scope: root });

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <section ref={root} id="stack" className="relative overflow-hidden py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="center"
          eyebrow="Tech stack"
          title={<>Works with everything <span className="text-zinc-500">you already run.</span></>}
          description="We're model- and cloud-agnostic. We pick the best tool for each job and integrate with 200+ systems out of the box."
        />

        {/* Tablet / desktop: circuit board */}
        <div className="hub-board relative mx-auto mt-16 hidden aspect-[1000/560] w-full max-w-6xl md:block">
          <div className="grid-bg absolute inset-0 opacity-40" />

          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="trace-l" x1="0" x2="1">
                <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="trace-r" x1="1" x2="0">
                <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0.9" />
              </linearGradient>
              <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {nodes.map((n, i) => (
              <g key={n.name}>
                <path d={n.d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <path
                  id={`trace-${i}`}
                  className="hub-trace"
                  d={n.d}
                  pathLength={1}
                  strokeDasharray="1"
                  fill="none"
                  stroke={`url(#trace-${n.left ? "l" : "r"})`}
                  strokeWidth={hover === i ? 2.4 : 1.2}
                  opacity={hover === null || hover === i ? 1 : 0.25}
                  filter={hover === i ? "url(#hub-glow)" : undefined}
                  style={{ transition: "opacity .3s, stroke-width .3s" }}
                />
                {/* Via pads at the trace ends and bend */}
                <circle cx={n.sx} cy={n.y} r="3" fill="#04050a" stroke="#22d3ee" strokeOpacity="0.6" />
                <circle cx={n.bx} cy={n.y} r="2" fill="#8b5cf6" />
              </g>
            ))}

            {/* Data packets flowing into the core */}
            <g className="hub-packets">
              {nodes.map((n, i) => (
                <circle key={n.name} r={hover === i ? 3.5 : 2.2} fill={i % 3 ? "#22d3ee" : "#a78bfa"} filter="url(#hub-glow)">
                  <animateMotion dur={`${2.2 + (i % 5) * 0.45}s`} begin={`${((i * 0.37) % 2.5).toFixed(2)}s`} repeatCount="indefinite">
                    <mpath href={`#trace-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>

            {/* Core rings */}
            <g className="hub-ring">
              <circle cx={CX} cy={CY} r={R + 14} fill="none" stroke="#22d3ee" strokeOpacity="0.4" strokeDasharray="2 10" />
            </g>
            <g className="hub-ring">
              <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke="#8b5cf6" strokeOpacity="0.3" strokeDasharray="40 14 4 14" />
            </g>
          </svg>

          {/* Group labels */}
          {groups.map((g, gi) => {
            const text = `${String(gi + 1).padStart(2, "0")} / ${g.label}`;
            return (
              <div
                key={g.label}
                className={`absolute flex -translate-y-1/2 items-center gap-2 font-mono text-[10px] tracking-[0.25em] whitespace-nowrap text-zinc-500 uppercase ${g.side === "left" ? "" : "flex-row-reverse"}`}
                style={{ top: pct(ROWS[(gi % 2) * 4] - 40, H), [g.side === "left" ? "left" : "right"]: pct(48, W) }}
              >
                <span className="h-1 w-1 bg-cyan" />
                <span className="hub-label" data-text={text}>{text}</span>
              </div>
            );
          })}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <div
              key={n.name}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className="absolute w-[17.4%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(n.x, W), top: pct(n.y, H) }}
            >
              <div
                className={`hub-node flex items-center gap-2.5 rounded-lg border px-2.5 py-2 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 lg:px-3 ${
                  hover === i ? "border-cyan/60 bg-cyan/10 shadow-[0_0_30px_rgba(34,211,238,0.25)]" : "border-white/[0.08] bg-ink-2/80"
                } ${n.left ? "" : "flex-row-reverse text-right"}`}
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${hover === i ? "bg-cyan shadow-[0_0_8px_#22d3ee]" : "bg-lime/80"}`} />
                <span className="min-w-0 flex-1 truncate font-display text-xs text-white lg:text-sm">{n.name}</span>
                <span className="hidden font-mono text-[9px] text-zinc-600 lg:inline">N-{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}

          {/* Core */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(CX, W), top: pct(CY, H), width: pct(R * 2, W), aspectRatio: "1" }}
          >
            <div className="hub-core absolute inset-0 grid place-items-center">
              <div className="absolute inset-0 animate-spin-slow rounded-full opacity-70 blur-xl [background:conic-gradient(from_0deg,#22d3ee,#8b5cf6,#22d3ee)]" />
              <div className="absolute inset-[4%] rounded-full border border-cyan/30 bg-ink" />
              <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.25),transparent_65%)]" />
              <div className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
              <div className="relative text-center">
                <div className="font-display text-3xl font-semibold text-white lg:text-4xl">200+</div>
                <div className="mt-1 font-mono text-[8px] tracking-[0.3em] text-cyan lg:text-[9px]">INTEGRATIONS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: core + tile grid */}
        <div className="hub-grid mt-14 md:hidden">
          <div className="mx-auto mb-8 grid h-28 w-28 place-items-center rounded-full border border-cyan/30 bg-ink shadow-[0_0_50px_rgba(34,211,238,0.25)]">
            <div className="text-center">
              <div className="font-display text-2xl font-semibold text-white">200+</div>
              <div className="font-mono text-[8px] tracking-[0.3em] text-cyan">INTEGRATIONS</div>
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.label} className="mb-6">
              <div className="mb-3 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase">{g.label}</div>
              <div className="grid grid-cols-2 gap-2">
                {g.items.map((name) => (
                  <div key={name} className="hub-tile flex items-center gap-2 rounded-lg border border-white/[0.08] bg-ink-2/80 px-3 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime/80" />
                    <span className="font-display text-sm text-white">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">+ and many more</div>
      <Marquee duration={45} className="mt-5">
        {extras.map((n) => (
          <span key={n} className="mx-6 font-mono text-xs tracking-widest whitespace-nowrap text-zinc-500 uppercase">
            <span className="text-cyan/60">◆</span> {n}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
