"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/** Homepage-only scroll choreography, layered on top of the site-wide reveals in Motion.tsx. */
export default function HomeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".why-cover", { scaleY: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrub = (trigger: gsap.DOMTarget, start = "top bottom", end = "top 30%", s: number | boolean = 1) => ({ trigger, start, end, scrub: s });

      /* Hero: dashboard panels drift apart in depth as you scroll away. */
      const hero = document.querySelector(".hh-visual")?.closest("section");
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el, i) => {
        gsap.to(el, {
          y: [-70, 50, 80, -40][i % 4],
          x: [-24, 24, -14, 14][i % 4],
          rotate: [-2, 2, 1.5, -1.5][i % 4],
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      });

      /* Trust strip: marquee speeds up with scroll velocity and follows scroll direction. */
      const anim = document.querySelector<HTMLElement>(".trust-strip .animate-marquee")?.getAnimations()[0];
      if (anim) {
        const proxy = { rate: 1 };
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const dir = self.direction;
            proxy.rate = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 300, 8));
            anim.playbackRate = proxy.rate;
            gsap.to(proxy, { rate: dir, duration: 1, ease: "power2.out", overwrite: true, onUpdate: () => { anim.playbackRate = proxy.rate; } });
          },
        });
      }
      gsap.fromTo(".trust-strip", { rotate: -2.5, scale: 1.04 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: scrub(".trust-strip", "top bottom", "bottom 40%", true) });

      /* Intro: lead line fills in character by character. */
      const lead = SplitText.create(".intro-lead", { type: "words,chars" });
      gsap.fromTo(lead.chars, { opacity: 0.15 }, { opacity: 1, stagger: 0.03, ease: "none", scrollTrigger: scrub(".intro-lead", "top 85%", "bottom 55%", true) });

      /* Approach strip: panel zooms in, then the three steps switch on in sequence. */
      gsap.fromTo(".ap-panel", { scale: 0.86, borderRadius: 90, y: 80 }, { scale: 1, borderRadius: 30, y: 0, ease: "none", scrollTrigger: scrub(".ap-panel", "top bottom", "top 55%") });
      const ap = gsap.timeline({ scrollTrigger: scrub(".ap-panel", "top 75%", "bottom 40%") });
      gsap.utils.toArray<HTMLElement>(".ap-step").forEach((step) => {
        ap.fromTo(step.querySelector(".ap-num"), { scale: 0.6, backgroundColor: "rgba(255,255,255,0.1)" }, { scale: 1, backgroundColor: "#1f8bff", boxShadow: "0 0 30px rgba(31,139,255,0.8)", duration: 1 })
          .fromTo(step.querySelector(".ap-text"), { opacity: 0.3, x: -12 }, { opacity: 1, x: 0, duration: 1 }, "<");
        const arrow = step.querySelector(".ap-arrow");
        if (arrow) ap.fromTo(arrow, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8 });
      });

      /* What We Deliver: panel expands, cards rise and tilt upright one after another. */
      gsap.fromTo(".dl-panel", { scale: 0.9, borderRadius: 160 }, { scale: 1, borderRadius: 60, ease: "none", scrollTrigger: scrub(".dl-panel", "top bottom", "top 25%") });
      gsap.fromTo(".dl-card", { rotateX: 40, y: 140, opacity: 0, transformOrigin: "50% 100%" }, {
        rotateX: 0, y: 0, opacity: 1, stagger: 0.12, ease: "power2.out",
        scrollTrigger: scrub(".dl-grid", "top 95%", "top 25%"),
      });

      /* Why Zaavi: image wipes open, cards swing in from alternate sides, icons spin into place. */
      gsap.fromTo(".why-cover", { scaleY: 1 }, { scaleY: 0, ease: "power2.inOut", scrollTrigger: scrub(".why-cover", "top 85%", "top 35%") });
      gsap.fromTo(".why-quote", { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: scrub(".why-cover", "top 55%", "top 25%") });
      const why = gsap.utils.toArray<HTMLElement>(".why-card");
      why.forEach((c, i) => gsap.set(c, { autoAlpha: 0, y: 70, rotateY: i % 2 ? -35 : 35, transformOrigin: i % 2 ? "100% 50%" : "0% 50%" }));
      ScrollTrigger.batch(why, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { autoAlpha: 1, y: 0, rotateY: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" });
          gsap.from(batch.map((b) => b.querySelector(".why-icon")), { scale: 0, rotate: -180, duration: 1, stagger: 0.12, delay: 0.2, ease: "back.out(2)" });
          gsap.from(batch.map((b) => b.querySelector(".why-num")), { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, delay: 0.3, ease: "expo.out" });
        },
      });

      /* How We Work: dark panel zooms open, step rows slide in from the right. */
      gsap.fromTo(".st-panel", { scale: 0.88, borderRadius: 140 }, { scale: 1, borderRadius: 60, ease: "none", scrollTrigger: scrub(".st-panel", "top bottom", "top 20%") });
      gsap.fromTo(".st-list > button", { x: 120, rotateY: -18, opacity: 0 }, { x: 0, rotateY: 0, opacity: 1, stagger: 0.1, ease: "power2.out", scrollTrigger: scrub(".st-list", "top 95%", "top 40%") });

      /* Industries: cards flip open like panels, icons pop. */
      const ind = gsap.utils.toArray<HTMLElement>(".ind-card");
      gsap.set(ind, { autoAlpha: 0, rotateY: -75, transformOrigin: "0% 50%" });
      ScrollTrigger.batch(ind, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { autoAlpha: 1, rotateY: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" });
          gsap.from(batch.map((b) => b.querySelector(".ind-icon")), { scale: 0, duration: 0.8, stagger: 0.1, delay: 0.35, ease: "back.out(2.5)" });
        },
      });

      /* Ways to work: connecting line draws, numbered dots pop as it reaches them. */
      const tl = gsap.timeline({ scrollTrigger: scrub(".tl-list", "top 85%", "top 40%") });
      tl.fromTo(".tl-line", { scaleX: 0 }, { scaleX: 1, duration: 4, ease: "none" });
      gsap.utils.toArray<HTMLElement>(".tl-dot").forEach((d, i) => {
        tl.fromTo(d, { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" }, i * 1.15);
      });

      /* Closing CTA: panel scales up and the robot rises into frame, then idles. */
      gsap.fromTo(".cta-panel", { scale: 0.9, y: 60 }, { scale: 1, y: 0, ease: "none", scrollTrigger: scrub(".cta-panel", "top bottom", "top 45%") });
      gsap.fromTo(".cta-mascot", { y: 220, rotate: -12, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, ease: "power2.out", scrollTrigger: scrub(".cta-panel", "top 90%", "top 30%") });
      gsap.to(".cta-mascot svg", { y: -14, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      return () => lead.revert();
    });

    return () => mm.revert();
  });

  return null;
}
