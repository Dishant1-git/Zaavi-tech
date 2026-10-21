"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Elements marked [data-skew] lean with scroll velocity and spring back when it stops. */
export default function VelocitySkew() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const proxy = { skew: 0 };
    const targets = () => document.querySelectorAll("[data-skew]");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const skew = gsap.utils.clamp(-7, 7, self.getVelocity() / -350);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => gsap.set(targets(), { skewY: proxy.skew }),
          });
        }
      },
    });
    return () => st.kill();
  }, []);
  return null;
}
