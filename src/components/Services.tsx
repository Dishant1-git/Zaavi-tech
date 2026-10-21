"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

const icon = {
  agent: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" /><path d="M12 1.5v1.8M4.5 4.5l1.3 1.3M19.5 4.5l-1.3 1.3" /></>,
  llm: <><path d="M4 6h16M4 12h10M4 18h13" /><circle cx="19" cy="15" r="2.5" /></>,
  model: <><path d="M12 2l9 5v10l-9 5-9-5V7z" /><path d="M12 22V12M21 7l-9 5-9-5" /></>,
  vision: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  strategy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
};

const services = [
  { n: "01", title: "AI Agents & Automation", body: "Autonomous agents that reason, use tools and close loops across your CRM, ERP and support stack, with humans in the loop where it matters.", tags: ["Multi-agent", "Tool use", "RPA+"], icon: icon.agent },
  { n: "02", title: "LLM & GenAI Integration", body: "Retrieval-augmented copilots, private knowledge assistants and content engines grounded in your data, evaluated and guarded for production.", tags: ["RAG", "Fine-tuning", "Evals"], icon: icon.llm },
  { n: "03", title: "Custom ML Models", body: "Forecasting, scoring, recommendation and anomaly detection models trained on your signals and shipped with measurable lift.", tags: ["PyTorch", "XGBoost", "AutoML"], icon: icon.model },
  { n: "04", title: "Computer Vision", body: "Detection, segmentation and OCR pipelines that run in the cloud or on the edge, from factory floors to retail shelves.", tags: ["Edge", "OCR", "Video"], icon: icon.vision },
  { n: "05", title: "Data Engineering & MLOps", body: "Feature stores, vector databases and CI/CD for models. Monitoring, drift detection and rollbacks are built in from day one.", tags: ["Pipelines", "Vector DB", "Observability"], icon: icon.data },
  { n: "06", title: "AI Strategy & Consulting", body: "Opportunity mapping, ROI modelling and governance frameworks that take you from AI curiosity to a roadmap your board signs off on.", tags: ["Roadmaps", "Governance", "ROI"], icon: icon.strategy },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: pinned horizontal gallery, cards swing in from 3D space.
    mm.add("(min-width: 1024px)", () => {
      const track = root.current!.querySelector<HTMLElement>(".svc-track")!;
      const distance = () => track.scrollWidth - window.innerWidth + 96;
      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".svc-pin",
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const n = Math.min(services.length, Math.floor(self.progress * services.length) + 1);
            const el = root.current?.querySelector(".svc-count");
            if (el) el.textContent = String(n).padStart(2, "0");
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card) => {
        gsap.fromTo(
          card,
          { rotateY: -38, z: -260, autoAlpha: 0.15, filter: "blur(4px)" },
          {
            rotateY: 0, z: 0, autoAlpha: 1, filter: "blur(0px)", ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 105%", end: "left 55%", scrub: true },
          }
        );
        gsap.fromTo(card.querySelector(".svc-num"), { xPercent: 60 }, {
          xPercent: -60, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
        });
      });

      gsap.to(".svc-bigword", { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".svc-pin", start: "top top", end: () => `+=${distance()}`, scrub: true } });
      gsap.fromTo(".svc-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".svc-pin", start: "top top", end: () => `+=${distance()}`, scrub: true } });
    });

    // Smaller screens: cards rise and unfold as they enter.
    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      gsap.set(cards, { autoAlpha: 0, y: 70, rotateX: -25 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" }),
      });
    });

    return () => mm.revert();
  }, { scope: root });

  const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} id="services" className="relative z-[1]">
      <div className="svc-pin relative flex flex-col justify-center overflow-hidden py-28 lg:h-screen lg:py-0">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
        <div aria-hidden className="svc-bigword pointer-events-none absolute bottom-[4%] left-0 font-display text-[22vw] leading-none font-bold tracking-tighter whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)] max-lg:hidden">
          CAPABILITIES · SYSTEMS · INTELLIGENCE
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              parallax={false}
              eyebrow="Capabilities"
              title={<>Everything AI. <span className="text-zinc-500">Engineered end-to-end.</span></>}
            />
            <div className="hidden items-center gap-4 font-mono text-xs text-zinc-500 lg:flex">
              <span><span className="svc-count text-white">01</span> / {String(services.length).padStart(2, "0")}</span>
              <span className="relative h-px w-40 bg-white/10">
                <span className="svc-progress absolute inset-0 origin-left bg-gradient-to-r from-cyan to-violet" />
              </span>
              <span>SCROLL ▸</span>
            </div>
          </div>
        </div>

        <div className="mt-14 lg:mt-12 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          <div className="svc-track grid gap-4 px-6 [perspective:1400px] md:grid-cols-2 lg:flex lg:w-max lg:px-0 lg:pr-24">
            {services.map((s) => (
              <article
                key={s.n}
                onPointerMove={trackPointer}
                className="svc-card spotlight group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-ink-3/90 to-ink/90 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-cyan/20 lg:flex lg:h-[460px] lg:w-[400px] lg:shrink-0 lg:flex-col"
              >
                <span aria-hidden className="svc-num pointer-events-none absolute -right-4 -bottom-10 font-display text-[11rem] leading-none font-bold text-transparent [-webkit-text-stroke:1px_rgba(34,211,238,0.12)]">
                  {s.n}
                </span>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-ink-3 text-cyan transition-all duration-500 group-hover:border-cyan/40 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        {s.icon}
                      </svg>
                    </div>
                    <span className="font-mono text-xs text-zinc-600 transition-colors group-hover:text-cyan">[{s.n}]</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-medium text-white lg:mt-auto">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">{s.body}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-ink/50 px-3 py-1 font-mono text-[11px] text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
