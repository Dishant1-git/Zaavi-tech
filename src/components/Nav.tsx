"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, INTRO_DELAY } from "@/lib/gsap";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#platform", label: "Platform" },
  { href: "#stack", label: "Stack" },
  { href: "#pricing", label: "Pricing" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Zaavi Technology home">
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute inset-0 rotate-45 rounded-md border border-cyan/60" />
        <span className="absolute inset-1.5 rotate-45 rounded-sm bg-gradient-to-br from-cyan to-violet" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Zaavi<span className="text-zinc-500">.tech</span>
      </span>
    </a>
  );
}

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.from(root.current, { yPercent: -120, duration: 1, ease: "expo.out", delay: INTRO_DELAY + 0.3 });

    let hidden = false;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        root.current?.classList.toggle("nav-scrolled", self.scroll() > 40);
        const hide = self.direction === 1 && self.scroll() > 400;
        if (hide !== hidden) {
          hidden = hide;
          gsap.to(root.current, { yPercent: hide ? -130 : 0, duration: 0.5, ease: "power3.out" });
        }
      },
    });
  }, { scope: root });

  return (
    <header ref={root} className="group fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-transparent px-4 py-3 transition-all duration-500 group-[.nav-scrolled]:border-white/10 group-[.nav-scrolled]:bg-ink/60 group-[.nav-scrolled]:backdrop-blur-xl">
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group/link relative rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white">
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan to-violet transition-transform duration-300 group-hover/link:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <a href="#contact" className="text-sm text-zinc-400 transition-colors hover:text-white">Sign in</a>
          <a
            href="#contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            Book a call
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-white transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-4 bg-white transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-zinc-300 hover:bg-white/5">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-ink">
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}
