"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    prefix + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useGSAP(() => {
    const o = { v: 0 };
    gsap.to(o, {
      v: to,
      duration,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmt(o.v);
      },
    });
  }, { dependencies: [to] });

  return <span ref={ref} className="tabular-nums">{fmt(0)}</span>;
}
