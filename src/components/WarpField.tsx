"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Star = { x: number; y: number; z: number; pz: number; hue: number };

/** Fixed starfield behind the page; scrolling fast stretches stars into warp streaks. */
export default function WarpField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0;
    const COUNT = window.innerWidth < 768 ? 120 : 260;
    const stars: Star[] = [];
    const spawn = (s: Star, far = false) => {
      s.x = (Math.random() - 0.5) * 2;
      s.y = (Math.random() - 0.5) * 2;
      s.z = far ? 1 : Math.random();
      s.pz = s.z;
      s.hue = Math.random();
    };
    for (let i = 0; i < COUNT; i++) {
      const s = {} as Star;
      spawn(s);
      stars.push(s);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let boost = 0, target = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => (target = Math.min(Math.abs(self.getVelocity()) / 4000, 1)),
    });

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      target *= 0.92;
      boost += (target - boost) * 0.12;
      const speed = still ? 0 : 0.0014 + boost * 0.03;

      ctx.fillStyle = `rgba(4,5,10,${0.55 - boost * 0.35})`;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.5;
      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) { spawn(s, true); continue; }
        const x = cx + (s.x / s.z) * f * 0.5, y = cy + (s.y / s.z) * f * 0.5;
        const px = cx + (s.x / s.pz) * f * 0.5, py = cy + (s.y / s.pz) * f * 0.5;
        if (x < 0 || x > w || y < 0 || y > h) { spawn(s, true); continue; }
        const a = Math.min(1, (1 - s.z) * 1.2) * (0.3 + boost * 0.3);
        const c = s.hue < 0.15 ? "139,92,246" : s.hue < 0.45 ? "34,211,238" : "226,232,240";
        ctx.strokeStyle = `rgba(${c},${a})`;
        ctx.lineWidth = (1 - s.z) * 1.4 + 0.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x + 0.1, y + 0.1);
        ctx.stroke();
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />;
}
