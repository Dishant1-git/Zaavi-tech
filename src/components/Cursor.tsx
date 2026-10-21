"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    gsap.set([dot.current, ring.current], { autoAlpha: 1 });

    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      gsap.to(ring.current, { scale: hit ? 1.8 : 1, borderColor: hit ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.35)", duration: 0.3 });
      gsap.to(dot.current, { scale: hit ? 0 : 1, duration: 0.2 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none invisible fixed top-0 left-0 z-[100] -mt-4 -ml-4 h-8 w-8 rounded-full border border-white/35 mix-blend-difference" />
      <div ref={dot} aria-hidden className="pointer-events-none invisible fixed top-0 left-0 z-[100] -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]" />
    </>
  );
}
