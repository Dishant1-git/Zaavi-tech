"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph } from "./ui";

const R = 24;
const C = 2 * Math.PI * R;

/** Round "back to top" button whose ring fills as you scroll. */
export default function BackTop() {
  const ring = useRef<SVGCircleElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
      setShow(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" aria-label="Back to top" className={`go-top ${show ? "show" : ""}`}>
      <svg viewBox="0 0 52 52" className="progress-ring" aria-hidden>
        <circle cx="26" cy="26" r={R} fill="none" stroke="var(--n200)" strokeWidth="2" />
        <circle ref={ring} cx="26" cy="26" r={R} fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} transform="rotate(-90 26 26)" />
      </svg>
      <Glyph name="arrowDown" className="relative h-5 w-5 rotate-180" />
    </a>
  );
}
