"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import Tilt from "./Tilt";

const plans = [
  {
    name: "Pilot",
    desc: "Validate one high-impact use case.",
    monthly: 2900,
    features: ["1 AI use case", "Discovery workshop", "Working prototype in 4 weeks", "Evaluation report", "Email support"],
    cta: "Start a pilot",
  },
  {
    name: "Scale",
    desc: "A dedicated AI squad for your roadmap.",
    monthly: 7900,
    popular: true,
    features: ["Up to 4 parallel workstreams", "Dedicated ML + product engineers", "Managed inference platform", "Guardrails, evals & monitoring", "Weekly demos, priority Slack", "Quarterly ROI reviews"],
    cta: "Book a call",
  },
  {
    name: "Enterprise",
    desc: "Organization-wide AI transformation.",
    monthly: null,
    features: ["Everything in Scale", "On-prem / VPC deployment", "Custom SLAs & 24/7 support", "AI governance framework", "Security audits & red-teaming", "Executive AI enablement"],
    cta: "Talk to sales",
  },
];

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  const [annual, setAnnual] = useState(false);

  useGSAP(() => {
    // Cards fan out of a stacked deck in 3D space as the grid scrolls in.
    gsap.fromTo(
      ".price-card",
      { autoAlpha: 0, y: 160, z: -300, rotateX: 40, rotateY: (i: number) => (i - 1) * -30, xPercent: (i: number) => (1 - i) * 60 },
      {
        autoAlpha: 1, y: 0, z: 0, rotateX: 0, rotateY: 0, xPercent: 0, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: ".price-grid", start: "top 95%", end: "top 35%", scrub: 1 },
      }
    );
  }, { scope: root });

  // Tween each price to its new value when the billing period flips.
  useGSAP(() => {
    root.current!.querySelectorAll<HTMLElement>("[data-price]").forEach((el) => {
      const base = Number(el.dataset.price);
      const target = annual ? Math.round(base * 0.85) : base;
      const o = { v: Number(el.dataset.current ?? base) };
      gsap.to(o, {
        v: target,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `$${Math.round(o.v).toLocaleString("en-US")}`;
          el.dataset.current = String(o.v);
        },
      });
    });
  }, { scope: root, dependencies: [annual] });

  return (
    <section ref={root} id="pricing" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading align="center" eyebrow="Engagement" title="Simple, transparent pricing" description="Start small, prove value, then scale. No lock-in, and you own your IP and your models." />

        <div className="mt-10 flex justify-center">
          <div className="glass relative flex rounded-full p-1 text-sm">
            <span className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${annual ? "translate-x-full" : ""}`} />
            <button onClick={() => setAnnual(false)} className={`relative z-10 w-36 rounded-full py-2 transition-colors ${annual ? "text-zinc-400" : "text-ink"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`relative z-10 w-36 rounded-full py-2 transition-colors ${annual ? "text-ink" : "text-zinc-400"}`}>
              Annual <span className={annual ? "text-violet" : "text-cyan"}>−15%</span>
            </button>
          </div>
        </div>

        <div className="price-grid mt-16 grid gap-5 [perspective:1600px] lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`price-card ${p.popular ? "lg:-my-4" : ""}`}>
            <Tilt max={6} className="h-full rounded-3xl">
            <div
              className={`relative h-full rounded-3xl p-px ${p.popular ? "bg-gradient-to-b from-cyan via-violet/60 to-white/5 shadow-[0_0_80px_-20px_rgba(34,211,238,0.5)]" : "bg-white/[0.08]"}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan to-violet px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-ink uppercase">
                  Most popular
                </div>
              )}
              <div className={`flex h-full flex-col rounded-[calc(1.5rem-1px)] p-8 ${p.popular ? "bg-ink-2 lg:py-12" : "bg-ink"}`}>
                <div className="font-display text-xl font-medium text-white">{p.name}</div>
                <p className="mt-1 text-sm text-zinc-500">{p.desc}</p>
                <div className="mt-8 flex items-baseline gap-2">
                  {p.monthly ? (
                    <>
                      <span data-price={p.monthly} className="font-display text-5xl font-medium tracking-tight text-white tabular-nums">
                        ${p.monthly.toLocaleString("en-US")}
                      </span>
                      <span className="text-sm text-zinc-500">/ month</span>
                    </>
                  ) : (
                    <span className="font-display text-5xl font-medium tracking-tight text-white">Custom</span>
                  )}
                </div>
                <ul className="mt-8 flex-1 space-y-3 border-t border-white/10 pt-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                      <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8.5l3 3 7-7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <a
                    href="#contact"
                    className={`mt-10 inline-flex rounded-full px-6 py-3 text-sm font-medium transition-all ${p.popular ? "bg-white text-ink hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]" : "border border-white/15 text-white hover:border-cyan/60 hover:text-cyan"}`}
                  >
                    {p.cta}
                  </a>
                </Magnetic>
              </div>
            </div>
            </Tilt>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-zinc-500">
          All engagements include code ownership, documentation, and a 30-day post-launch warranty.
        </p>
      </div>
    </section>
  );
}
