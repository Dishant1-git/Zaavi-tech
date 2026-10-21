"use client";

import { useRef } from "react";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";

const statement =
  "We don't bolt AI onto products. We engineer intelligence into the core of how your business thinks, decides and scales.";
const highlight = new Set(["intelligence", "thinks,", "decides", "scales."]);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: 0.8,
      },
    });

    // 1. Statement lights up word by word.
    tl.to(".mf-word", { opacity: 1, color: (i, el) => (el.dataset.hl ? "#22d3ee" : "#ffffff"), stagger: 0.05, duration: 0.3 })
      .to(".mf-scan", { top: "100%", duration: 1.6 }, 0)
      // 2. Statement recedes into depth.
      .to(".mf-statement", { scale: 0.7, z: -300, filter: "blur(14px)", autoAlpha: 0, duration: 0.6 }, "+=0.2")
      // 3. Portal tears open from the center.
      .fromTo(".mf-portal", { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(85% at 50% 50%)", duration: 1, ease: "power2.inOut" }, "<0.1")
      .fromTo(".mf-ring", { scale: 0.2, rotate: -120, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, stagger: 0.08, duration: 1, ease: "power3.out" }, "<0.15")
      .fromTo(".mf-core", { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, "<0.3")
      .to(counter, {
        v: 10,
        duration: 0.9,
        onUpdate: () => {
          if (num.current) num.current.textContent = counter.v.toFixed(1);
        },
      }, "<")
      .from(".mf-hud", { autoAlpha: 0, y: 20, stagger: 0.06, duration: 0.4 }, "<0.3")
      .to(".mf-ring", { rotate: (i) => (i % 2 ? -90 : 90), duration: 1 }, ">");

    gsap.to(".mf-tag", {
      scrambleText: { text: "TRANSMISSION // 001", chars: SCRAMBLE_CHARS, speed: 0.4 },
      duration: 1.4,
      scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative z-[1] h-screen overflow-hidden [perspective:1200px]">
      {/* Statement */}
      <div className="mf-statement absolute inset-0 flex items-center justify-center px-6">
        <div className="relative max-w-5xl">
          <div className="mf-tag mb-8 font-mono text-xs tracking-[0.3em] text-cyan">_______________</div>
          <p className="font-display text-3xl leading-[1.15] font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {statement.split(" ").map((w, i) => (
              <span key={i} data-hl={highlight.has(w) || undefined} className="mf-word inline-block text-white opacity-[0.12]">
                {w}&nbsp;
              </span>
            ))}
          </p>
          <div className="mf-scan pointer-events-none absolute -inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent shadow-[0_0_20px_2px_rgba(34,211,238,0.6)]" />
        </div>
      </div>

      {/* Portal */}
      <div className="mf-portal absolute inset-0 bg-ink" style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.18),rgba(139,92,246,0.12)_35%,transparent_70%)]" />
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 grid place-items-center">
          {[
            "h-[34vmin] w-[34vmin] border-cyan/50",
            "h-[50vmin] w-[50vmin] border-dashed border-violet/40",
            "h-[66vmin] w-[66vmin] border-cyan/20",
            "h-[84vmin] w-[84vmin] border-dotted border-white/15",
          ].map((c, i) => (
            <div key={i} className={`mf-ring absolute rounded-full border ${c}`}>
              <span className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]" />
            </div>
          ))}
          <div className="mf-core relative grid h-[26vmin] w-[26vmin] place-items-center rounded-full">
            <div className="absolute inset-0 animate-spin-slow rounded-full opacity-80 blur-xl [background:conic-gradient(from_0deg,#22d3ee,#8b5cf6,#22d3ee)]" />
            <div className="absolute inset-[6%] rounded-full bg-ink/90" />
            <div className="relative text-center">
              <div className="font-display text-[5.5vmin] leading-none font-semibold text-white tabular-nums">
                <span ref={num}>0.0</span>M
              </div>
              <div className="mt-2 font-mono text-[max(8px,1.2vmin)] tracking-[0.25em] text-cyan">PREDICTIONS / HOUR</div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-6 font-mono text-[10px] tracking-widest text-zinc-400">
          <div className="mf-hud absolute top-28 left-6"><span className="text-cyan">◢ CORE TEMP</span><br />OPTIMAL · 41.2°C</div>
          <div className="mf-hud absolute top-28 right-6 text-right"><span className="text-violet">GPU CLUSTER ◣</span><br />2,048 H200 · 87% UTIL</div>
          <div className="mf-hud absolute bottom-16 left-6"><span className="text-cyan">◥ MODELS ONLINE</span><br />124 / 124</div>
          <div className="mf-hud absolute right-6 bottom-16 text-right"><span className="text-violet">LATENCY ◤</span><br />P95 · 42MS</div>
        </div>
      </div>
    </section>
  );
}
