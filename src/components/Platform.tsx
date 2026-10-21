"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import NeuralCanvas from "./NeuralCanvas";
import Counter from "./Counter";

const fleet = [
  { name: "reasoning-xl", type: "LLM", lat: "38ms", load: 72 },
  { name: "vision-edge-v4", type: "CV", lat: "11ms", load: 48 },
  { name: "forecast-tsx", type: "Time-series", lat: "24ms", load: 61 },
  { name: "embed-multi-3", type: "Embeddings", lat: "6ms", load: 85 },
];

export default function Platform() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Panel rises out of the floor like a hologram, then keeps a slight lean while scrolling.
    gsap.fromTo(
      ".plat-panel",
      { rotateX: 62, y: 140, scale: 0.82, autoAlpha: 0.1, filter: "brightness(2) hue-rotate(40deg)" },
      {
        rotateX: 0, y: 0, scale: 1, autoAlpha: 1, filter: "brightness(1) hue-rotate(0deg)", ease: "power2.out",
        scrollTrigger: { trigger: ".plat-holo", start: "top 95%", end: "center 55%", scrub: 1 },
      }
    );
    gsap.to(".plat-panel", {
      rotateY: -8, rotateX: -4, ease: "none",
      scrollTrigger: { trigger: ".plat-holo", start: "center 55%", end: "bottom top", scrub: 1 },
    });
    gsap.fromTo(".plat-beam", { scaleY: 0, autoAlpha: 0 }, {
      scaleY: 1, autoAlpha: 1, ease: "none",
      scrollTrigger: { trigger: ".plat-holo", start: "top 90%", end: "center 55%", scrub: 1 },
    });
    gsap.from(".plat-stat", {
      autoAlpha: 0,
      y: 30,
      stagger: 0.12,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".plat-stats", start: "top 88%", once: true },
    });
    gsap.from(".fleet-bar", {
      scaleX: 0,
      stagger: 0.1,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: ".plat-panel", start: "top 70%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} id="platform" className="relative overflow-hidden py-32 lg:py-44">
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Zaavi Neural Platform"
            title={<>A neural fabric that <span className="text-gradient-accent">never sleeps.</span></>}
            description="Every model we ship runs on our managed inference platform: GPU autoscaling across 14 regions, real-time evaluation, and drift alerts before your users notice."
          />
          <div className="plat-stats mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div className="plat-stat">
              <div className="font-display text-3xl font-medium text-white sm:text-4xl"><Counter to={120} suffix="+" /></div>
              <div className="mt-1 text-sm text-zinc-500">models in production</div>
            </div>
            <div className="plat-stat">
              <div className="font-display text-3xl font-medium text-white sm:text-4xl"><Counter to={99.98} decimals={2} suffix="%" /></div>
              <div className="mt-1 text-sm text-zinc-500">uptime SLA</div>
            </div>
            <div className="plat-stat">
              <div className="font-display text-3xl font-medium text-white sm:text-4xl"><Counter to={42} prefix="<" suffix="ms" /></div>
              <div className="mt-1 text-sm text-zinc-500">p95 latency</div>
            </div>
          </div>
        </div>

        <div className="plat-holo relative [perspective:1600px]">
        <div aria-hidden className="plat-beam absolute -bottom-10 left-1/2 h-40 w-[90%] origin-bottom -translate-x-1/2 bg-gradient-to-t from-cyan/25 to-transparent blur-2xl" />
        <div aria-hidden className="absolute -bottom-12 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-[50%] border border-cyan/40 shadow-[0_0_40px_rgba(34,211,238,0.5)]" />
        <div className="plat-panel hud-frame relative origin-bottom rounded-3xl border border-white/10 bg-ink-2/80 p-2 backdrop-blur-xl">
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-3xl">
            <div className="scanline absolute inset-x-0 h-24 animate-[scan_4s_linear_infinite]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(34,211,238,0.03)_3px,rgba(34,211,238,0.03)_4px)]" />
          </div>
          <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
          <div className="flex items-center justify-between px-4 py-3 font-mono text-[11px] tracking-widest text-zinc-500">
            <span>INFERENCE CLUSTER · AP-SOUTH-1</span>
            <span className="flex items-center gap-2 text-lime">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-lime" /> ALL SYSTEMS NOMINAL
            </span>
          </div>
          <div className="h-72 rounded-2xl border border-white/5 bg-ink/60 sm:h-80">
            <NeuralCanvas />
          </div>
          <div className="grid gap-px p-2 sm:grid-cols-2">
            {fleet.map((m) => (
              <div key={m.name} className="rounded-xl p-4 transition-colors hover:bg-white/[0.03]">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white">{m.name}</span>
                  <span className="text-cyan">{m.lat}</span>
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">{m.type}</div>
                <div className="mt-3 h-1 rounded-full bg-white/5">
                  <div className="fleet-bar h-1 origin-left rounded-full bg-gradient-to-r from-cyan to-violet" style={{ width: `${m.load}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
