"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";

const badges = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "DPDP Act"];
const pillars = [
  { title: "Private by design", body: "Your data never trains shared models. Deploy in your VPC or on-prem, with no egress." },
  { title: "Guardrails & red-teaming", body: "Prompt-injection defense, PII redaction and adversarial testing before every release." },
  { title: "Explainable outputs", body: "Citations, confidence scores and audit trails for every decision a model makes." },
  { title: "Zero-trust access", body: "SSO, RBAC and encryption in transit and at rest, plus key management you control." },
];

export default function Security() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".sec-badge", {
      autoAlpha: 0, scale: 0.8, stagger: 0.07, duration: 0.8, ease: "back.out(2)",
      scrollTrigger: { trigger: ".sec-badges", start: "top 88%", once: true },
    });
    gsap.fromTo(
      ".sec-pillar",
      { autoAlpha: 0, rotateY: 75, z: -200, transformOrigin: "0% 50%" },
      {
        autoAlpha: 1, rotateY: 0, z: 0, stagger: 0.15, ease: "none",
        scrollTrigger: { trigger: ".sec-pillars", start: "top 90%", end: "center 55%", scrub: 1 },
      }
    );
    gsap.from(".sec-radar", {
      autoAlpha: 0, scale: 0.6, rotate: -90, duration: 1.8, ease: "expo.out",
      scrollTrigger: { trigger: ".sec-radar", start: "top 85%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden py-32 lg:py-44">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Responsible AI"
            title={<>Trust is <span className="text-gradient-accent">non-negotiable.</span></>}
            description="Enterprise-grade security and governance are part of the architecture, never bolted on afterwards."
          />
          <div className="sec-badges mt-10 flex flex-wrap gap-3">
            {badges.map((b) => (
              <span key={b} className="sec-badge glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-zinc-300">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-lime" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8.5l3 3 7-7" /></svg>
                {b}
              </span>
            ))}
          </div>

          {/* Radar */}
          <div className="sec-radar relative mt-14 hidden aspect-square w-64 sm:block">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="absolute rounded-full border border-cyan/15" style={{ inset: `${i * 12.5}%` }} />
            ))}
            <span className="absolute inset-0 animate-spin-slow rounded-full [animation-duration:5s] [background:conic-gradient(from_0deg,transparent_0deg,rgba(34,211,238,0.35)_50deg,transparent_60deg)]" />
            <span className="absolute top-1/2 left-0 h-px w-full bg-cyan/10" />
            <span className="absolute top-0 left-1/2 h-full w-px bg-cyan/10" />
            <span className="absolute top-[30%] left-[62%] h-1.5 w-1.5 animate-pulse-dot rounded-full bg-lime shadow-[0_0_10px_#a3e635]" />
            <span className="absolute top-[64%] left-[28%] h-1.5 w-1.5 animate-pulse-dot rounded-full bg-violet shadow-[0_0_10px_#8b5cf6] [animation-delay:0.7s]" />
            <span className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2l8 3v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V5z" />
                <path d="M8.5 12l2.5 2.5 4.5-5" />
              </svg>
            </span>
          </div>
        </div>

        <div className="sec-pillars grid gap-4 [perspective:1400px] sm:grid-cols-2">
          {pillars.map((p, i) => (
            <div key={p.title} className={`sec-pillar ${i % 2 ? "sm:mt-10 sm:-mb-10" : ""}`}>
              <Tilt className="h-full rounded-3xl">
                <div className="group h-full rounded-3xl border border-white/[0.07] bg-gradient-to-br from-ink-3/90 to-ink/80 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-violet/40">
              <div className="mb-8 font-mono text-xs text-zinc-600 transition-colors group-hover:text-violet">0{i + 1}</div>
              <h3 className="font-display text-xl font-medium text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
