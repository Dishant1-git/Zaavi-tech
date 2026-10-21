"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    n: "I",
    title: "Discover",
    body: "We map your workflows, data and KPIs to find the use cases with the highest ROI and the lowest risk.",
    meta: "Week 1–2",
    file: "discovery.yaml",
    code: [
      ["k", "audit:"],
      ["", "  sources: [crm, erp, tickets, docs]"],
      ["", "  records_scanned: 18_402_931"],
      ["k", "opportunities:"],
      ["", "  - support_triage   roi: 4.1x"],
      ["", "  - invoice_ocr      roi: 3.6x"],
      ["ok", "✓ roadmap generated"],
    ],
  },
  {
    n: "II",
    title: "Prototype",
    body: "A working proof of value in weeks, not quarters, measured against your baseline with real users.",
    meta: "Week 3–5",
    file: "agent.ts",
    code: [
      ["k", "const agent = zaavi.agent({"],
      ["", "  model: 'reasoning-xl',"],
      ["", "  tools: [crm.search, email.send],"],
      ["", "  memory: vectorStore('support'),"],
      ["k", "});"],
      ["", "await agent.eval(goldenSet);"],
      ["ok", "✓ accuracy 93.4%  (+31% vs baseline)"],
    ],
  },
  {
    n: "III",
    title: "Engineer",
    body: "Hardened for production with guardrails, evals, observability, security reviews and integration into your stack.",
    meta: "Week 6–9",
    file: "pipeline.py",
    code: [
      ["k", "@pipeline(schedule='realtime')"],
      ["k", "def serve(req):"],
      ["", "    x = guardrails.check(req)"],
      ["", "    y = model.predict(x)"],
      ["", "    monitor.log(y, drift=True)"],
      ["", "    return y"],
      ["ok", "✓ p95 latency 42ms · 0 PII leaks"],
    ],
  },
  {
    n: "IV",
    title: "Scale",
    body: "Roll out across teams and regions. We keep improving the models while your costs per inference keep dropping.",
    meta: "Ongoing",
    file: "deploy.log",
    code: [
      ["", "$ zaavi deploy --regions all"],
      ["", "  ▸ us-east   ████████████ 100%"],
      ["", "  ▸ eu-west   ████████████ 100%"],
      ["", "  ▸ ap-south  ████████████ 100%"],
      ["", "  replicas: 48  autoscale: on"],
      ["ok", "✓ live in 27s · cost/inference ↓ 38%"],
    ],
  },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: ".process-pin",
        start: "top top",
        end: `+=${steps.length * 70}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          if (i !== activeRef.current) {
            activeRef.current = i;
            setActive(i);
          }
          gsap.set(".process-bar", { scaleY: self.progress });
        },
      });
    });
    // Terminal swings in from 3D space before the section pins.
    gsap.fromTo(
      ".proc-term",
      { rotateY: -32, rotateX: 18, z: -250, autoAlpha: 0.2 },
      { rotateY: 0, rotateX: 0, z: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 10%", scrub: 1 } }
    );
    return () => mm.revert();
  }, { scope: root });

  // Type out the terminal lines whenever the active step changes.
  useEffect(() => {
    const lines = root.current?.querySelectorAll(".term-line");
    if (!lines?.length) return;
    // Brief holographic glitch on every phase change.
    gsap.timeline()
      .set(".proc-term", { filter: "hue-rotate(70deg) brightness(1.6)", x: -6, skewX: 4 })
      .set(".proc-term", { x: 5, skewX: -3 }, 0.05)
      .set(".proc-term", { x: 0, skewX: 0, filter: "none" }, 0.1);
    gsap.fromTo(
      lines,
      { clipPath: "inset(0 100% 0 0)", autoAlpha: 0.3 },
      { clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 0.45, stagger: 0.09, ease: "power2.out" }
    );
  }, [active]);

  const step = steps[active];

  return (
    <section ref={root} id="process" className="relative">
      <div className="process-pin relative flex min-h-screen items-center overflow-hidden py-24">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              parallax={false}
              eyebrow="Process"
              title={<>Four phases. <span className="text-zinc-500">Zero guesswork.</span></>}
            />
            <div className="relative mt-12 pl-8">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/10">
                <div className="process-bar h-full w-px origin-top scale-y-0 bg-gradient-to-b from-cyan to-violet shadow-[0_0_10px_#22d3ee] max-lg:scale-y-100" />
              </div>
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  className={`block w-full py-4 text-left transition-all duration-500 ${i === active ? "opacity-100" : "opacity-35 hover:opacity-70"}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className={`w-8 font-mono text-sm ${i === active ? "text-cyan" : "text-zinc-500"}`}>{s.n}</span>
                    <span className="font-display text-2xl font-medium text-white sm:text-3xl">{s.title}</span>
                    <span className="ml-auto font-mono text-[11px] tracking-widest text-zinc-500 uppercase">{s.meta}</span>
                  </div>
                  <div className={`grid transition-all duration-500 ${i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden pt-2 pl-12 leading-relaxed text-zinc-400">{s.body}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="[perspective:1400px]">
          <div className="proc-term hud-frame relative">
            <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
            <div className="absolute -inset-10 -z-10 rounded-full bg-cyan/10 blur-[100px]" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-xs text-zinc-400">{step.file}</span>
                <span className="ml-auto flex items-center gap-2 font-mono text-[10px] tracking-widest text-lime">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-lime" />
                  RUNNING
                </span>
              </div>
              <div className="relative min-h-[300px] p-6 font-mono text-[13px] leading-7">
                <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-16 animate-[scan_3s_linear_infinite]" />
                {step.code.map(([kind, line], i) => (
                  <div key={`${active}-${i}`} className="term-line flex gap-5 whitespace-pre">
                    <span className="w-4 text-right text-zinc-600 select-none">{i + 1}</span>
                    <span className={kind === "k" ? "text-violet" : kind === "ok" ? "text-lime" : "text-zinc-300"}>{line}</span>
                  </div>
                ))}
                <div className="mt-1 flex gap-5">
                  <span className="w-4" />
                  <span className="h-5 w-2 animate-pulse bg-cyan" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 font-mono text-[11px] text-zinc-500">
                <span>PHASE {step.n} / IV</span>
                <span className="flex gap-1">
                  {steps.map((_, i) => (
                    <span key={i} className={`h-1 w-6 rounded-full transition-colors duration-500 ${i <= active ? "bg-cyan" : "bg-white/10"}`} />
                  ))}
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
