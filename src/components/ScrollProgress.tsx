"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });
  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed top-0 left-0 z-[70] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-violet to-cyan shadow-[0_0_12px_rgba(34,211,238,0.8)]"
    />
  );
}
