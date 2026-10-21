"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Orb, Sparkle, Tube } from "./art";
import { container, DiscoverButton } from "./ui";

/** Dark banner used at the top of every inner page. Holds the page's single H1. */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  sub,
  body,
  cta,
  visual,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  sub?: string;
  body?: string[];
  cta?: { label: string; href: string };
  visual?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create(".ph-title", { type: "lines,words", mask: "lines" });
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".ph-crumbs", { autoAlpha: 0, y: 16, duration: 0.8 })
      .from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.1)
      .from(".ph-fade", { autoAlpha: 0, y: 24, stagger: 0.1, duration: 1 }, 0.45)
      .from(".ph-visual", { autoAlpha: 0, scale: 0.9, x: 60, duration: 1.4 }, 0.3);
    gsap.to(".ph-ring", { rotate: 60, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".ph-float", { y: -16, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.5 });
    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0a1340] pt-48 pb-24 sm:pt-60 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_85%_30%,rgba(31,139,255,0.45),transparent_70%),radial-gradient(45%_55%_at_5%_90%,rgba(10,63,184,0.5),transparent_70%)]" />
      <div className="grain-local opacity-[0.1]" />
      <div className="ph-ring pointer-events-none absolute top-1/2 -right-[520px] h-[800px] w-[800px] -translate-y-1/2 rounded-full border-[60px] border-transparent opacity-40 [background:linear-gradient(#0a1340,#0a1340)_padding-box,conic-gradient(from_200deg,#1f8bff,#0a3fb8,#22d3ee,#1f8bff)_border-box]" />

      <div className={`${container} relative grid items-center gap-14 ${visual ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        <div className={visual ? "" : "max-w-[860px]"}>
          <nav aria-label="Breadcrumb" className="ph-crumbs mb-7 flex flex-wrap items-center gap-2 font-ag text-[13px] font-semibold text-white/60">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#7cc4ff]">/</span>}
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
              </span>
            ))}
          </nav>
          {eyebrow && <div className="ph-fade mb-4 font-ag text-xs font-bold tracking-[0.25em] text-[#7cc4ff] uppercase">{eyebrow}</div>}
          <h1 className="ph-title font-ag text-[38px] leading-[1.08] font-extrabold tracking-[-0.03em] text-white sm:text-[54px] lg:text-[64px]">{title}</h1>
          {sub && <p className="ph-fade mt-6 font-ag text-lg leading-[1.5] font-bold text-[#7cc4ff] sm:text-xl">{sub}</p>}
          {body?.map((p) => (
            <p key={p} className="ph-fade mt-5 max-w-[680px] text-[16px] leading-[1.85] text-white/70">{p}</p>
          ))}
          {cta && <div className="ph-fade mt-10"><DiscoverButton href={cta.href} label={cta.label} /></div>}
        </div>
        {visual && <div className="ph-visual relative">{visual}</div>}
      </div>
      <Sparkle className="ph-float pointer-events-none absolute top-36 right-[12%] hidden h-12 w-12 lg:block" color="#38bdf8" />
      <Orb className="ph-float pointer-events-none absolute bottom-16 left-[46%] hidden h-10 w-10 lg:block" hue="blue" />
      {!visual && <Tube shape="spiral" className="ph-float pointer-events-none absolute right-[6%] bottom-6 hidden w-[260px] lg:block" width={40} />}
    </section>
  );
}
