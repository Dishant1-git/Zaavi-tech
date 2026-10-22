"use client";

import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll animations for every site page, matching the template's behaviour:
 *  .effectFade.fadeUp       rises 50px and fades in
 *  .effectFade.fadeRotateX  tips forward from 45° as it rises
 *  [data-progress=N]        bar grows from 15% to N%
 *  [data-drift]             hero chips drift up-left on scroll
 *  [data-grow=deg]          floating tiles scale up and rotate on scroll
 * `data-delay` on any .effectFade element staggers it. Re-runs on every route change.
 */
export default function AigMotion() {
  const pathname = usePathname();
  useGSAP(() => {
    const els = gsap.utils.toArray<HTMLElement>(".aig .effectFade");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(els, { autoAlpha: 1 });
      gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => gsap.set(el, { width: `${el.dataset.progress}%` }));
      return;
    }

    els.forEach((el) => {
      const delay = Number(el.dataset.delay ?? 0);
      const rotate = el.classList.contains("fadeRotateX");
      gsap.fromTo(
        el,
        rotate ? { autoAlpha: 0, rotationX: 45, yPercent: 100, transformOrigin: "top center -50", transformPerspective: 400 } : { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          rotationX: 0,
          yPercent: 0,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
      gsap.fromTo(el, { width: "15%" }, {
        width: `${el.dataset.progress}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
      gsap.to(el, { x: -20, y: -20, ease: "none", scrollTrigger: { trigger: el, scrub: 2, start: "top 60%", end: "top center" } });
    });

    gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
      const base = gsap.getProperty(el, "rotation") as number;
      gsap.fromTo(el, { scale: 1, rotation: base }, {
        scale: 1.15,
        rotation: Number(el.dataset.grow),
        ease: "none",
        scrollTrigger: { trigger: el, scrub: 2, start: "top 90%", end: "top center" },
      });
    });
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
