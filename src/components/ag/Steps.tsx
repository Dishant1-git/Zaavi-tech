"use client";

import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { container, DiscoverButton, Eyebrow, Heading } from "./ui";

type Step = { title: string; body: string; receive?: string };

/** Dark panel with a sticky heading and steps that open one after another as you scroll. */
export default function Steps({
  id,
  eyebrow,
  title,
  intro,
  steps,
  cta,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  steps: Step[];
  cta?: { label: string; href: string };
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".st-list",
      start: "top 70%",
      end: "bottom 40%",
      onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
    });
  }, { scope: root });

  return (
    <section ref={root} id={id} className="relative z-10">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
        <div className="st-panel relative overflow-hidden rounded-[60px] bg-[linear-gradient(120deg,#0b1a8a,#0b1f5c_45%,#0b2a6b_75%,#0a1840)] py-24 lg:py-[120px]">
          <div className="grain-local opacity-[0.12]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-ag-base/35 blur-[140px]" />
          <div className={`${container} relative grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]`}>
            <div className="lg:sticky lg:top-32">
              <Eyebrow light>{eyebrow}</Eyebrow>
              <Heading light>{title}</Heading>
              {intro && <p data-reveal="up" className="mt-8 max-w-[460px] leading-[1.9] font-medium text-[#b5c3e8]">{intro}</p>}
              {cta && <div data-reveal="up" className="mt-10"><DiscoverButton href={cta.href} label={cta.label} /></div>}
              <div className="mt-10 hidden gap-2 lg:flex">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-[#7cc4ff]" : "w-4 bg-white/20"}`} />
                ))}
              </div>
            </div>

            <div className="st-list relative [perspective:1400px]">
              {steps.map((s, i) => {
                const on = active === i;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActive(i)}
                    className={`relative block w-full overflow-hidden text-left transition-colors duration-700 ${i === 0 ? "rounded-t-[24px]" : ""} ${on ? "bg-white" : "bg-[linear-gradient(180deg,#fff,#eef5ff)]"} ${i === steps.length - 1 ? "rounded-b-[24px]" : "border-b border-[#dbe7f7]"}`}
                    aria-expanded={on}
                  >
                    <div className="flex items-center justify-between gap-4 px-7 py-6 sm:px-10">
                      <span className="font-ag text-[22px] font-extrabold tracking-tight text-ag-dark sm:text-[26px]">{s.title}</span>
                      <span className={`shrink-0 font-ag text-sm font-bold tracking-[0.12em] uppercase transition-colors ${on ? "text-ag-base" : "text-ag-gray"}`}>Step {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="mx-7 grid grid-cols-[auto_1fr] items-start gap-6 border-t border-ag-border pt-8 pb-8 sm:mx-10 sm:gap-8">
                          <span className="bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] bg-clip-text font-ag text-[84px] leading-[0.8] font-extrabold tracking-[-0.06em] text-transparent sm:text-[110px]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="text-[15px] leading-[1.8] font-medium text-ag-text">{s.body}</p>
                            {s.receive && (
                              <div className="mt-4 rounded-xl bg-ag-light px-4 py-3">
                                <div className="font-ag text-[11px] font-bold tracking-[0.15em] text-ag-base uppercase">What you receive</div>
                                <div className="mt-1 font-ag text-[15px] font-semibold text-ag-dark">{s.receive}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="h-[5px] bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
