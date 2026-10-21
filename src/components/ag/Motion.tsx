"use client";

import { useGSAP, gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * Declarative scroll animations for the agency page:
 *  [data-split]           heading words rise out of a mask
 *  [data-reveal=up|left|right|zoom|fade]
 *  [data-count=N]         number counts up when it enters
 *  [data-parallax=px]     element drifts by px across its scroll range
 *  [data-parallax-inner]  image inside a frame drifts for depth
 */
export default function Motion() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const splits: SplitText[] = [];

    gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
      const split = SplitText.create(el, { type: "lines,words", mask: "lines" });
      splits.push(split);
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    const from: Record<string, gsap.TweenVars> = {
      up: { y: 70, autoAlpha: 0 },
      left: { x: 80, autoAlpha: 0 },
      right: { x: -80, autoAlpha: 0 },
      zoom: { scale: 0.85, autoAlpha: 0 },
      fade: { autoAlpha: 0 },
    };
    const reveal = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveal.forEach((el) => gsap.set(el, from[el.dataset.reveal ?? "up"] ?? from.up));
    ScrollTrigger.batch(reveal, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 1.2, stagger: 0.12, ease: "expo.out", overwrite: true }),
    });

    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count);
      const o = { v: 0 };
      gsap.to(o, {
        v: to,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString("en-US")),
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.fromTo(el, { y: 0 }, {
        y: Number(el.dataset.parallax),
        rotate: Number(el.dataset.parallax) / 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax-inner]").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Tube blobs grow along their path as they scroll in, then the glint starts running.
    gsap.utils.toArray<SVGSVGElement>("[data-tube]").forEach((svg) => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: svg, start: "top 95%", end: "center 55%", scrub: 1 },
      });
      tl.fromTo(svg.querySelectorAll(".tube-body"), { strokeDashoffset: 1, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: 1, duration: 1 })
        .fromTo(svg.querySelector(".tube-sheen"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.85);
    });

    return () => splits.forEach((s) => s.revert());
  });

  return null;
}
