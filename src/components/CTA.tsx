"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Magnetic, { PrimaryButton, GhostButton } from "./Magnetic";

export default function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Characters light up as the heading scrolls through the viewport.
    const split = SplitText.create(".cta-title", { type: "words,chars" });
    gsap.fromTo(
      split.chars,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: { trigger: ".cta-title", start: "top 85%", end: "bottom 45%", scrub: true },
      }
    );
    gsap.fromTo(
      ".cta-orb",
      { scale: 0.5, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } }
    );
    gsap.fromTo(".cta-floor", { scaleY: 0.2, autoAlpha: 0 }, {
      scaleY: 1, autoAlpha: 1, transformOrigin: "50% 100%", ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
    });
    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} id="contact" className="relative overflow-hidden py-40 lg:py-56">
      <div className="cta-orb pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 animate-spin-slow rounded-full opacity-50 blur-[90px] [background:conic-gradient(from_0deg,#22d3ee,#8b5cf6,#04050a,#22d3ee)]" />
        <div className="absolute inset-[30%] rounded-full bg-ink blur-2xl" />
      </div>
      <div aria-hidden className="cta-floor pointer-events-none absolute inset-x-0 bottom-0 h-[50%] overflow-hidden [perspective-origin:50%_0%] [perspective:600px] [mask-image:linear-gradient(to_bottom,transparent,black_45%)]">
        <div className="absolute -inset-x-1/2 top-0 h-[400%] origin-top animate-[grid-run_1.2s_linear_infinite] [transform:rotateX(75deg)] [background-image:linear-gradient(rgba(34,211,238,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.5)_1px,transparent_1px)] [background-size:70px_70px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-cyan shadow-[0_0_30px_6px_rgba(34,211,238,0.6)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 font-mono text-xs tracking-[0.3em] text-cyan uppercase">// Ready when you are</div>
        <h2 className="cta-title font-display text-5xl leading-[1] font-medium tracking-[-0.03em] text-white sm:text-7xl lg:text-8xl">
          Let&apos;s build the intelligence behind your next decade.
        </h2>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Magnetic><PrimaryButton href="mailto:hello@zaavi.tech">Start your AI project</PrimaryButton></Magnetic>
          <Magnetic><GhostButton href="mailto:sales@zaavi.tech">Talk to an expert</GhostButton></Magnetic>
        </div>
        <p className="mt-8 font-mono text-xs text-zinc-500">Free 30-minute AI readiness session · Response within 24h</p>
      </div>
    </section>
  );
}
