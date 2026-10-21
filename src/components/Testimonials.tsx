"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Marquee from "./Marquee";

const quotes = [
  { quote: "Zaavi shipped an agent that now resolves 71% of our tier-one tickets without a human. Our CSAT went up while our backlog went to zero.", name: "Ananya Rao", role: "VP Customer Experience, Finverse", result: "71% auto-resolution" },
  { quote: "Their vision models caught defects our inspectors had missed for years. Payback came in under four months.", name: "Marcus Lindqvist", role: "Head of Operations, Nordform Industries", result: "4-month payback" },
  { quote: "Their team doesn't just build models, it builds systems. Evals, monitoring and guardrails were there from day one.", name: "Priya Mehta", role: "CTO, Clarion Health", result: "0 compliance incidents" },
  { quote: "We went from a slide deck to a production copilot used by 3,000 analysts in nine weeks. Nobody else came close.", name: "David Okafor", role: "Chief Data Officer, Meridian Capital", result: "9 weeks to production" },
];
const logos = ["Finverse", "Nordform", "Clarion Health", "Meridian", "Vertex Labs", "Helix AI", "Quantum Retail", "Atlas Freight"];
const DURATION = 7;

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setI((v) => (v + 1) % quotes.length), DURATION * 1000);
    return () => clearTimeout(id);
  }, [i]);

  useGSAP(() => {
    const split = SplitText.create(".t-quote", { type: "words" });
    gsap.from(split.words, { autoAlpha: 0, y: 12, filter: "blur(6px)", stagger: 0.025, duration: 0.7, ease: "power3.out" });
    gsap.from(".t-meta", { autoAlpha: 0, y: 10, duration: 0.6, delay: 0.3 });
    gsap.fromTo(".t-progress", { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none" });
    return () => split.revert();
  }, { scope: root, dependencies: [i], revertOnUpdate: true });

  const q = quotes[i];
  return (
    <section ref={root} className="relative overflow-hidden py-32 lg:py-40">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Client stories" title="What our clients say" />
          <div className="hidden font-mono text-sm text-zinc-500 sm:block">
            <span className="text-white">{String(i + 1).padStart(2, "0")}</span> / {String(quotes.length).padStart(2, "0")}
          </div>
        </div>

        <div className="hud-frame relative mt-14 rounded-3xl border border-white/[0.07] bg-ink-2/60 p-8 backdrop-blur-xl sm:p-14">
          <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
          <svg viewBox="0 0 32 24" className="h-8 w-10 text-cyan/50" fill="currentColor"><path d="M0 24V14C0 6 4 1 12 0l1 3c-4 1-6 4-6 8h5v13zm19 0V14c0-8 4-13 12-14l1 3c-4 1-6 4-6 8h5v13z" /></svg>
          <blockquote key={i} className="t-quote mt-8 min-h-[9rem] font-display text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
            {q.quote}
          </blockquote>
          <div className="t-meta mt-10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet font-display font-semibold text-ink">
                {q.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div>
                <div className="font-medium text-white">{q.name}</div>
                <div className="text-sm text-zinc-500">{q.role}</div>
              </div>
            </div>
            <span className="rounded-full border border-lime/30 bg-lime/5 px-4 py-2 font-mono text-xs text-lime">{q.result}</span>
          </div>
          <div className="mt-10 flex gap-2">
            {quotes.map((_, n) => (
              <button key={n} onClick={() => setI(n)} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10" aria-label={`Show testimonial ${n + 1}`}>
                {n === i && <span className="t-progress block h-full origin-left bg-gradient-to-r from-cyan to-violet" />}
                {n < i && <span className="block h-full bg-white/40" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 text-center font-mono text-xs tracking-[0.25em] text-zinc-600 uppercase">Trusted by forward-thinking teams</div>
      <Marquee duration={35} className="mt-8">
        {logos.map((l) => (
          <span key={l} className="mx-10 font-display text-2xl font-semibold whitespace-nowrap text-zinc-600 transition-colors hover:text-white">
            {l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
