"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Pulls its child toward the pointer while hovered. */
export default function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="inline-block">
      {children}
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-shadow hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-violet transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative transition-colors duration-300 group-hover:text-white">{children}</span>
      <svg className="relative h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors hover:border-cyan/50 hover:text-cyan"
    >
      {children}
    </a>
  );
}
