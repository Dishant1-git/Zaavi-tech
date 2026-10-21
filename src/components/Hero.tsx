"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, INTRO_DELAY } from "@/lib/gsap";
import ShaderBackground from "./ShaderBackground";
import Marquee from "./Marquee";
import Magnetic, { PrimaryButton, GhostButton } from "./Magnetic";

const stats = [
  { value: "12x", label: "faster support resolution", client: "Fintech" },
  { value: "68%", label: "lower ops cost", client: "Logistics" },
  { value: "3.2M", label: "documents processed / day", client: "Legal" },
  { value: "94%", label: "defect detection accuracy", client: "Manufacturing" },
  { value: "40h", label: "saved per analyst / month", client: "Insurance" },
  { value: "<90ms", label: "p95 inference latency", client: "Retail" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create(".hero-l1", { type: "chars" });
    const tl = gsap.timeline({ delay: INTRO_DELAY, defaults: { ease: "expo.out" } });
    tl.from(".hero-shader", { autoAlpha: 0, scale: 1.2, duration: 2.2 })
      .from(".hero-badge", { autoAlpha: 0, y: 20, duration: 1 }, 0.1)
      .from(split.chars, { yPercent: 60, rotateX: -80, autoAlpha: 0, filter: "blur(10px)", duration: 1.3, stagger: 0.03 }, 0.2)
      .from(".hero-l2", { yPercent: 110, duration: 1.4 }, 0.45)
      .from(".hero-sub", { autoAlpha: 0, y: 24, filter: "blur(8px)", duration: 1.2 }, 0.7)
      .from(".hero-cta > *", { autoAlpha: 0, y: 20, stagger: 0.1, duration: 1 }, 0.85)
      .from(".hud", { autoAlpha: 0, scale: 0.85, stagger: 0.08, duration: 1 }, 0.9)
      .from(".hero-stats", { autoAlpha: 0, y: 30, duration: 1.2 }, 1.1);

    // Scroll-out: content lifts and fades, shader zooms.
    const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero-content", { yPercent: -30, autoAlpha: 0, ease: "none", scrollTrigger: st });
    gsap.to(".hero-shader-wrap", { scale: 1.2, autoAlpha: 0.3, ease: "none", scrollTrigger: st });
    gsap.to(".hud-layer", { yPercent: -60, ease: "none", scrollTrigger: st });
    // Title dissolves forward into the camera as you leave the hero.
    gsap.to(".hero-title", { scale: 1.35, letterSpacing: "0.04em", filter: "blur(12px)", ease: "none", scrollTrigger: { ...st, end: "60% top" } });
    gsap.to(".hero-sub, .hero-cta", { y: 80, ease: "none", scrollTrigger: st });

    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-shader-wrap absolute inset-0">
        <ShaderBackground className="hero-shader" />
      </div>
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* HUD readouts */}
      <div className="hud-layer pointer-events-none absolute inset-0 mx-auto hidden max-w-7xl px-6 font-mono text-[10px] tracking-widest text-zinc-500 lg:block">
        <div className="hud absolute top-32 left-6">
          <div className="text-cyan">// SYS.STATUS</div>
          <div>NEURAL CORE ...... ONLINE</div>
          <div>AGENTS ACTIVE .... 1,284</div>
        </div>
        <div className="hud absolute top-32 right-6 text-right">
          <div className="text-violet">LAT 30.7333 N</div>
          <div>LON 76.7794 E</div>
          <div>UPLINK ▲ 99.98%</div>
        </div>
        <div className="hud hud-frame absolute bottom-48 left-6 h-24 w-40 border border-white/5">
          <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
          <div className="flex h-full items-end gap-1 p-3">
            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85].map((h, i) => (
              <span key={i} className="w-full bg-gradient-to-t from-cyan/10 to-cyan/60" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="hud absolute right-6 bottom-48 grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-cyan/30" />
          <span className="absolute inset-3 rounded-full border border-violet/30" />
          <span className="text-cyan">SCAN</span>
        </div>
      </div>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 pt-32 pb-16 text-center">
        <a href="#services" className="hero-badge glass mb-8 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-xs text-zinc-300">
          <span className="rounded-full bg-gradient-to-r from-cyan to-violet px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-ink">NEW</span>
          Autonomous Agents 2.0 are live
          <span className="text-cyan">→</span>
        </a>

        <h1 className="hero-title font-display text-[13vw] leading-[0.95] font-medium tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <span className="hero-l1 block [perspective:600px]">Intelligence,</span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span className="hero-l2 text-gradient inline-block">engineered.</span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Zaavi Technology designs, builds and scales production-grade AI: autonomous agents, LLM systems and
          custom models that turn your data into decisions in milliseconds.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic><PrimaryButton href="#contact">Start your AI project</PrimaryButton></Magnetic>
          <Magnetic>
            <GhostButton href="#process">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-current">
                <svg viewBox="0 0 10 10" className="ml-px h-2 w-2 fill-current"><path d="M2 1l7 4-7 4z" /></svg>
              </span>
              See how we build
            </GhostButton>
          </Magnetic>
        </div>
      </div>

      <div className="hero-stats relative z-10 border-t border-white/5 bg-ink/40 py-6 backdrop-blur-md">
        <Marquee duration={45}>
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-10">
              <span className="font-display text-3xl font-medium text-white">{s.value}</span>
              <span className="text-sm leading-tight text-zinc-400">
                {s.label}
                <span className="block font-mono text-[10px] tracking-widest text-cyan/70 uppercase">{s.client}</span>
              </span>
              <span className="ml-6 h-1 w-1 rotate-45 bg-violet" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
