"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArtTile } from "./art";
import { Arrow, container, Eyebrow, Heading } from "./ui";

/**
 * "Where It Helps" use cases as sticky stacked cards: each card pins near the top while the
 * next slides over it, and the one underneath shrinks and dims. Images are generated artwork
 * (swap ArtTile for next/image once real visuals exist).
 */
export default function UseCaseStack({ items, seed, cta, href }: { items: string[]; seed: number; cta: string; href: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".uc-card");
      cards.forEach((card, i) => {
        // Image drifts inside its frame.
        gsap.fromTo(card.querySelector(".uc-img"), { yPercent: -8, scale: 1.15 }, {
          yPercent: 8, scale: 1, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
        // Text rises in as the card arrives.
        gsap.from(card.querySelectorAll(".uc-text > *"), {
          y: 40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
        });
        // When the next card slides over, this one sinks back.
        const next = cards[i + 1];
        if (next) {
          gsap.to(card.querySelector(".uc-inner"), {
            scale: 0.9, filter: "brightness(0.5)", ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        }
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="relative">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
        <div className="relative overflow-clip rounded-[60px] bg-[linear-gradient(120deg,#0b1a8a,#0b1f5c_45%,#0b2a6b_75%,#0a1840)] pt-24 pb-24">
          <div className="grain-local opacity-[0.12]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-ag-base/35 blur-[140px]" />
          <div className={`${container} relative`}>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-[560px]">
                <Eyebrow light>Use cases</Eyebrow>
                <Heading light>Where It Helps</Heading>
              </div>
              <div className="font-ag text-sm font-bold tracking-[0.2em] text-white/50 uppercase">
                {String(items.length).padStart(2, "0")} use cases
              </div>
            </div>

            <div className="mt-14">
              {items.map((h, i) => (
                <article key={h} className="uc-card sticky mb-8 last:mb-0" style={{ top: 110 + i * 24 }}>
                  <div className="uc-inner origin-top overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1840] shadow-[0_-25px_60px_rgba(0,0,0,0.45)]">
                    <div className="grid md:grid-cols-[1.1fr_1fr]">
                      <div className="relative h-[240px] overflow-hidden sm:h-[300px] md:h-[380px]">
                        <div className="uc-img absolute -inset-y-[10%] inset-x-0">
                          <ArtTile variant={(seed + i * 2) % 6} seed={seed + i * 7} />
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,#0d1840)] max-md:bg-[linear-gradient(180deg,transparent_55%,#0d1840)]" />
                        <span className="absolute top-5 left-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-ag text-[11px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur">
                          Use case {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="uc-text relative flex flex-col justify-center p-8 sm:p-12">
                        <span className="font-ag text-[80px] leading-none font-extrabold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="mt-2 font-ag text-[26px] leading-[1.25] font-extrabold tracking-tight text-white sm:text-[32px]">{h}</h3>
                        <div className="mt-6 h-1 w-16 rounded-full bg-[linear-gradient(90deg,#1f8bff,#7cc4ff)]" />
                        <Link href={href} className="group mt-8 inline-flex items-center gap-3 font-ag text-sm font-bold text-white uppercase">
                          {cta}
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] transition-transform duration-500 group-hover:-rotate-45">
                            <Arrow className="h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
