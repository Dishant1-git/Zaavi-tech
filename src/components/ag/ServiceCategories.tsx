"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { categories } from "@/lib/content";
import { Chrome3D } from "./art";

const ART = ["blob", "capsule", "ring", "knot", "blob", "ring"] as const;
const ROMAN = ["I", "II", "III", "IV", "V"];

/** Dark list of the six service categories; rows light up as they scroll into focus. */
export default function ServiceCategories() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create(".svc-intro", { type: "words,chars" });
    gsap.fromTo(split.chars, { opacity: 0.18 }, {
      opacity: 1, stagger: 0.02, ease: "none",
      scrollTrigger: { trigger: ".svc-intro", start: "top 80%", end: "bottom 45%", scrub: true },
    });
    gsap.fromTo(".svc-rule", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".svc-head", start: "top 95%", end: "top 60%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row) => {
      ScrollTrigger.create({ trigger: row, start: "top 62%", endTrigger: ".svc-list", end: "bottom top", toggleClass: "is-active" });
      gsap.from(row, { autoAlpha: 0, y: 40, duration: 1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 92%", once: true } });
    });
    gsap.utils.toArray<HTMLElement>(".svc-art").forEach((el, i) => {
      gsap.to(el, { rotate: i % 2 ? -40 : 40, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative mx-auto mt-24 max-w-[1440px] overflow-clip rounded-[40px] bg-[#070b24] pt-24 text-white sm:mx-5 sm:rounded-[60px] lg:pt-28 2xl:mx-auto">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-ag-base/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1320px] gap-8 px-5 lg:grid-cols-[1fr_2.6fr] lg:px-[72px]">
        <div className="self-start pt-3 font-ag text-xs font-bold tracking-[0.22em] text-[#7cc4ff] uppercase">Six service areas</div>
        <p className="svc-intro font-ag text-[26px] leading-[1.3] font-medium tracking-[-0.03em] sm:text-[36px] lg:text-[42px]">
          Zaavi Technologies delivers the full journey: strategy, development, integration, infrastructure and ongoing improvement.
        </p>
      </div>

      <div className="relative mt-16">
        <div className="svc-rule h-px origin-left bg-[linear-gradient(90deg,#1f8bff,#0a3fb8,rgba(255,255,255,0.2))]" />
        <div className="svc-head mx-auto hidden max-w-[1320px] grid-cols-3 px-5 py-5 font-ag text-[15px] text-white md:grid lg:px-[72px]">
          {["Category", "Services", ""].map((h) => (
            <span key={h} className="flex items-center gap-3">
              {h && <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v12m0 0-4.5-4.5M8 14l4.5-4.5" /></svg>}
              {h}
            </span>
          ))}
        </div>

        <div className="svc-list pb-20">
          {categories.map((c, i) => (
            <a key={c.letter} href={`#cat-${c.letter}`} className="svc-row group relative block transition-colors duration-700 [&.is-active]:bg-white/[0.06]">
              <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[linear-gradient(180deg,#1f8bff,#0a3fb8)] transition-transform duration-700 group-[.is-active]:scale-y-100" />
              <div className="mx-auto grid max-w-[1320px] gap-6 px-5 py-10 md:grid-cols-3 lg:px-[72px]">
                <h2 className="flex items-start gap-4 font-ag text-[24px] font-medium tracking-[-0.03em] text-white/35 transition-colors duration-700 group-[.is-active]:text-white sm:text-[30px]">
                  <span className="mt-1 font-ag text-base font-bold text-white/35 group-[.is-active]:text-[#7cc4ff]">{c.letter}.</span>
                  {c.name}
                </h2>
                <ul className="space-y-1.5 font-ag text-[16px] text-white/35 transition-colors duration-700 group-[.is-active]:text-white">
                  {c.services.map((s, k) => (
                    <li key={s.n} className="transition-transform duration-500 group-[.is-active]:translate-x-1" style={{ transitionDelay: `${k * 70}ms` }}>
                      <span className="text-white/50 group-[.is-active]:text-[#8cc8ff]">{ROMAN[k]}.</span> {s.title}
                    </li>
                  ))}
                </ul>
                <div className="relative hidden h-[130px] md:block">
                  <div className="absolute top-1/2 left-0 h-[170px] w-[170px] -translate-y-1/2 scale-50 -rotate-45 opacity-0 transition-all duration-1000 ease-[cubic-bezier(.2,.9,.2,1.2)] group-[.is-active]:scale-100 group-[.is-active]:rotate-0 group-[.is-active]:opacity-100">
                    <div className="svc-art h-full w-full">
                      <Chrome3D variant={ART[i % ART.length]} className="h-full w-full animate-[tube-float_6s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
