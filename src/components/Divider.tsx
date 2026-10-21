"use client";

import { useRef } from "react";
import { gsap, useGSAP, SCRAMBLE_CHARS } from "@/lib/gsap";

/** HUD scanner line between sections; draws itself as it scrolls through the viewport. */
export default function Divider({ index, label }: { index: string; label: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top 92%", end: "top 35%", scrub: 0.6 },
    });
    tl.fromTo(".dv-line", { scaleX: 0 }, { scaleX: 1, ease: "none" })
      .fromTo(".dv-dot", { left: "0%" }, { left: "100%", ease: "none" }, 0)
      .fromTo(".dv-ticks span", { scaleY: 0 }, { scaleY: 1, stagger: 0.02, ease: "none" }, 0);

    gsap.to(".dv-label", {
      scrambleText: { text: label, chars: SCRAMBLE_CHARS, speed: 0.5 },
      duration: 1.2,
      scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
    });
  }, { scope: root });

  return (
    <div ref={root} aria-hidden className="relative z-[1] mx-auto max-w-7xl px-6 py-2">
      <div className="mb-3 flex justify-between font-mono text-[10px] tracking-[0.3em] text-zinc-600">
        <span>
          <span className="text-cyan">SEC.{index}</span> // <span className="dv-label">{"".padEnd(label.length, "_")}</span>
        </span>
        <span className="hidden sm:inline">SIGNAL ▮▮▮▮▯ · SYNC OK</span>
      </div>
      <div className="relative h-px bg-white/[0.04]">
        <div className="dv-line absolute inset-0 origin-left bg-gradient-to-r from-cyan/0 via-cyan/70 to-violet/70" />
        <div className="dv-dot absolute top-1/2 h-1.5 w-12 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent to-white shadow-[0_0_16px_4px_rgba(34,211,238,0.6)]" />
      </div>
      <div className="dv-ticks mt-2 flex justify-between">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`block w-px origin-top bg-white/15 ${i % 6 === 0 ? "h-2.5" : "h-1"}`} />
        ))}
      </div>
    </div>
  );
}
