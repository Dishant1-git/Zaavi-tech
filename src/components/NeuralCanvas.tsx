"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; layer: number };
type Edge = { a: number; b: number };
type Pulse = { edge: number; t: number; speed: number; hue: number };

const LAYERS = [4, 7, 9, 7, 3];

/** Layered network with signal pulses travelling along its synapses. */
export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const pulses: Pulse[] = [];
    const glow = new Float32Array(64);
    const mouse = { x: -999, y: -999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      edges = [];
      const padX = 40, padY = 30;
      LAYERS.forEach((count, l) => {
        const x = padX + (l / (LAYERS.length - 1)) * (w - padX * 2);
        for (let i = 0; i < count; i++) {
          const y = padY + ((i + 0.5) / count) * (h - padY * 2);
          nodes.push({ x, y, layer: l });
        }
      });
      for (let a = 0; a < nodes.length; a++)
        for (let b = 0; b < nodes.length; b++)
          if (nodes[b].layer === nodes[a].layer + 1 && Math.random() < 0.55) edges.push({ a, b });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    // Firing: start a pulse from an input-layer node; it propagates forward on arrival.
    const fire = (fromNode?: number) => {
      const candidates = edges
        .map((e, i) => ({ e, i }))
        .filter(({ e }) => (fromNode === undefined ? nodes[e.a].layer === 0 : e.a === fromNode));
      if (!candidates.length) return;
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      pulses.push({ edge: pick.i, t: 0, speed: 0.012 + Math.random() * 0.012, hue: Math.random() });
    };

    let raf = 0, last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (now - last > 220) { fire(); last = now; }

      ctx.clearRect(0, 0, w, h);

      for (const e of edges) {
        const A = nodes[e.a], B = nodes[e.b];
        ctx.strokeStyle = "rgba(148,163,184,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        const e = edges[p.edge];
        const A = nodes[e.a], B = nodes[e.b];
        if (p.t >= 1) {
          glow[e.b % 64] = 1;
          pulses.splice(i, 1);
          if (Math.random() < 0.85) fire(e.b);
          continue;
        }
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        const tail = Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(A.x + (B.x - A.x) * tail, A.y + (B.y - A.y) * tail, x, y);
        const c = p.hue > 0.5 ? "34,211,238" : "139,92,246";
        grad.addColorStop(0, `rgba(${c},0)`);
        grad.addColorStop(1, `rgba(${c},0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(A.x + (B.x - A.x) * tail, A.y + (B.y - A.y) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${c},1)`;
        ctx.shadowColor = `rgba(${c},1)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      nodes.forEach((n, i) => {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 60 ? 1 : 0;
        const g = Math.max(glow[i % 64], near);
        glow[i % 64] *= 0.94;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4 + g * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9,11,19,1)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(34,211,238,${0.25 + g * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (g > 0.05) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 12 + g * 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34,211,238,${g * 0.12})`;
          ctx.fill();
        }
      });
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden data-cursor />;
}
