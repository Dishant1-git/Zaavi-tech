"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { home } from "@/lib/content";
import { Orb, Sparkle, Tube } from "./art";
import Dashboard from "./Dashboard";
import { container, DiscoverButton, GhostButton } from "./ui";

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const { h1, sub, body, cta, secondary } = home.hero;

  useGSAP(() => {
    const split = SplitText.create(".hh-title", { type: "lines,words", mask: "lines" });
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".hh-ring", { scale: 0.6, autoAlpha: 0, rotate: -40, duration: 1.8 })
      .from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.04 }, 0.15)
      .from(".hh-fade", { autoAlpha: 0, y: 26, stagger: 0.12, duration: 1 }, 0.55)
      .from(".hh-visual", { autoAlpha: 0, scale: 0.88, x: 70, rotateY: -12, duration: 1.6 }, 0.3)
      .from(".hh-spark", { scale: 0, rotate: -180, stagger: 0.12, duration: 1.2, ease: "back.out(2)" }, 0.9);

    gsap.to(".hh-float", { y: -18, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6 });
    gsap.to(".hh-spark", { rotate: 360, duration: 18, ease: "none", repeat: -1 });

    const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hh-visual", { yPercent: 14, ease: "none", scrollTrigger: st });
    gsap.to(".hh-copy", { yPercent: -8, autoAlpha: 0.25, ease: "none", scrollTrigger: st });
    gsap.to(".hh-ring", { rotate: 50, ease: "none", scrollTrigger: st });
    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0a1340] pt-48 pb-24 sm:pt-60 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_40%,rgba(31,139,255,0.5),transparent_70%),radial-gradient(50%_60%_at_10%_80%,rgba(10,63,184,0.5),transparent_70%)]" />
      <div className="grain-local opacity-[0.1]" />
      <div className="hh-ring pointer-events-none absolute top-1/2 -left-[640px] h-[900px] w-[900px] -translate-y-1/2 rounded-full border-[70px] border-transparent opacity-50 [background:linear-gradient(#0a1340,#0a1340)_padding-box,conic-gradient(from_200deg,#1f8bff,#0a3fb8,#22d3ee,#1f8bff)_border-box]" />

      <div className={`${container} relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]`}>
        <div className="hh-copy relative z-10">
          <div className="hh-fade mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-ag text-xs font-bold tracking-[0.18em] text-[#7cc4ff] uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> AI · Automation · Analytics
          </div>
          <h1 className="hh-title font-ag text-[40px] leading-[1.05] font-extrabold tracking-[-0.04em] text-white sm:text-[58px] xl:text-[68px]">
            {h1}
          </h1>
          <p className="hh-fade mt-7 max-w-[600px] font-ag text-lg leading-[1.5] font-bold text-[#7cc4ff] sm:text-xl">{sub}</p>
          <p className="hh-fade mt-5 max-w-[600px] text-[16px] leading-[1.85] text-white/70">{body}</p>
          <div className="hh-fade mt-10 flex flex-wrap items-center gap-4">
            <DiscoverButton href="/contact" label={cta} />
            <GhostButton href="/ai-solutions" label={secondary} />
          </div>
          <Sparkle className="hh-spark absolute -top-14 right-[6%] hidden h-14 w-14 lg:block" color="#38bdf8" />
        </div>

        <div className="hh-visual relative [perspective:1200px]">
          <Dashboard />
          <Orb className="hh-float absolute -top-8 right-[4%] h-14 w-14" hue="blue" />
          <Tube shape="loop" className="hh-float pointer-events-none absolute -bottom-[14%] -left-[8%] w-[40%]" width={56} />
        </div>
      </div>
    </section>
  );
}
