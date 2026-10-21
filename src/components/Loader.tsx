"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const counter = { v: 0 };
    gsap
      .timeline()
      .to(counter, {
        v: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
      .to(".loader-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
      .to(".loader-inner", { autoAlpha: 0, y: -20, duration: 0.35 }, ">-0.05")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut" }, "<")
      .set(root.current, { display: "none" });
  }, { scope: root });

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="loader-inner w-64 font-mono text-xs text-zinc-400">
        <div className="mb-3 flex items-center justify-between">
          <span className="tracking-[0.3em] text-white">ZAAVI/OS</span>
          <span><span ref={count}>000</span>%</span>
        </div>
        <div className="h-px w-full bg-white/10">
          <div className="loader-bar h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan to-violet" />
        </div>
        <div className="mt-3 tracking-widest text-zinc-500">INITIALIZING NEURAL CORE</div>
      </div>
    </div>
  );
}
