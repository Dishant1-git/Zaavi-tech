"use client";

import { useEffect, useRef, useState } from "react";

/** Vertical "BACK TOP" link with a progress bar, pinned to the right edge. */
export default function BackTop() {
  const bar = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      setShow(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className={`fixed right-4 bottom-10 z-40 hidden flex-col items-center gap-3 transition-all duration-500 sm:flex ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <span className="relative h-16 w-[3px] overflow-hidden rounded-full bg-ag-dark/15">
        <span ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-[linear-gradient(180deg,#1f8bff,#0a3fb8)]" />
      </span>
      <span className="font-ag text-xs font-bold tracking-[0.15em] text-ag-base uppercase [writing-mode:vertical-rl] rotate-180">Back top</span>
    </a>
  );
}
