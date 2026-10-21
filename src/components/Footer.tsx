"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Logo } from "./Nav";

const cols = [
  { title: "Services", links: ["AI Agents", "LLM Integration", "Custom ML", "Computer Vision", "MLOps"] },
  { title: "Company", links: ["About", "Case studies", "Careers", "Blog"] },
  { title: "Resources", links: ["Documentation", "AI Readiness Guide", "Security", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA"] },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-word span", {
      yPercent: 100,
      stagger: 0.06,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: ".footer-word", start: "top 95%", once: true },
    });
  }, { scope: root });

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/5 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              Production AI for teams that ship. Built in India, deployed worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {["X", "in", "GH"].map((s) => (
                <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 font-mono text-xs text-zinc-400 transition-colors hover:border-cyan/50 hover:text-cyan">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-zinc-400 transition-colors hover:text-white">
                      {l}
                      {l === "Careers" && <span className="ml-2 rounded-full bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">Hiring</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/5 py-6 text-xs text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Zaavi Technology. All rights reserved.</span>
          <span className="flex items-center gap-2 font-mono">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-lime" /> All systems operational
          </span>
        </div>
      </div>

      <div className="footer-word pointer-events-none flex justify-center overflow-hidden leading-[0.8] select-none" aria-hidden>
        {"ZAAVI".split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block bg-gradient-to-b from-white/15 to-transparent bg-clip-text font-display text-[34vw] font-semibold tracking-[-0.06em] text-transparent"
          >
            {ch}
          </span>
        ))}
      </div>
    </footer>
  );
}
