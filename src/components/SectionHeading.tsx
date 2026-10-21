"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  parallax = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Off inside pinned sections, where drift would fight the pin. */
  parallax?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = SplitText.create(root.current!.querySelector("h2")!, { type: "words", mask: "words" });
    root.current!.querySelector(".sh-eyebrow-text")!.textContent = "";
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      defaults: { ease: "expo.out" },
    });
    tl.from(".sh-eyebrow-line", { scaleX: 0, duration: 0.8 })
      .to(".sh-eyebrow-text", { scrambleText: { text: eyebrow, chars: SCRAMBLE_CHARS, speed: 0.6 }, duration: 1.1, ease: "none" }, 0)
      .from(split.words, { yPercent: 120, rotateX: -70, filter: "blur(10px)", transformOrigin: "50% 100%", duration: 1.2, stagger: 0.06 }, 0.1)
      .from(".sh-desc", { autoAlpha: 0, y: 20, filter: "blur(6px)", duration: 1 }, 0.4);

    // Gentle parallax drift while the section is on screen.
    if (parallax) gsap.to(root.current, {
      y: -60,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => split.revert();
  }, { scope: root });

  const center = align === "center";
  return (
    <div ref={root} className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-cyan uppercase ${center ? "justify-center" : ""}`}>
        <span className="sh-eyebrow-line h-px w-8 origin-left bg-gradient-to-r from-transparent to-cyan" />
        <span className="sh-eyebrow-text">{eyebrow}</span>
        <span className="h-1 w-1 animate-pulse-dot bg-cyan" />
      </div>
      <h2 data-skew className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-white [perspective:800px] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="sh-desc mt-6 text-lg leading-relaxed text-zinc-400">{description}</p>}
    </div>
  );
}
