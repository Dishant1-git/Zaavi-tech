"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactCta, nav } from "@/lib/content";
import BrandLogo from "@/components/ag/BrandLogo";
import Icon from "@/components/ag/icons";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

/** Floating frosted pill with the menu; sticks to the top once you scroll past the hero. */
export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (item: (typeof nav)[number]) =>
    item.href === "/" ? pathname === "/" : pathname === item.href || !!item.children?.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`));

  return (
    <header
      className={`aig-header z-50 w-full transition-all duration-500 ${
        stuck ? "stuck fixed top-0 left-0 animate-[ag-drop_.6s_ease] pt-3" : "absolute top-0 left-0 pt-6 lg:pt-12"
      }`}
    >
      <div className="mx-4 sm:mx-8 xl:mx-auto xl:max-w-[1080px]">
        <div className="pill">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Zaavi Technologies home">
            <BrandLogo tone="dark" className="h-9 w-auto sm:h-10" />
          </Link>
          <nav className="hidden xl:block" aria-label="Main">
            <ul className="flex items-center gap-6">
              {nav.map((item) => (
                <li key={item.href} className={item.children ? "has-child" : ""}>
                  <Link href={item.href} className={`item-link ${isActive(item) ? "active" : ""}`}>
                    {item.label}
                    {item.children && <Chevron />}
                  </Link>
                  {item.children && (
                    <ul className="sub-menu">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={pathname === c.href ? "active" : ""}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/contact" className="cta hidden md:inline-flex">{contactCta}</Link>
            <button className="burger grid xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-500 xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-[#0b1828]/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside className={`drawer absolute top-0 right-0 flex h-full w-[min(380px,88vw)] flex-col overflow-y-auto p-7 transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <BrandLogo tone="light" className="h-10 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">✕</button>
          </div>
          <ul className="mt-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <Link href={item.href} className={`block flex-1 py-4 text-xl font-semibold ${isActive(item) ? "text-[#2098d8]" : "text-white"}`}>{item.label}</Link>
                  {item.children && (
                    <button onClick={() => setSub(sub === item.href ? null : item.href)} aria-label={`Show ${item.label}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white">
                      <Chevron className={`transition-transform ${sub === item.href ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.children && sub === item.href && (
                  <ul className="pb-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="flex items-center gap-3 py-2 pl-2 text-white/75 hover:text-white">
                          <Icon name={c.icon} className="h-4 w-4 text-[#2098d8]" /> {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="cta mt-8 inline-flex justify-center">{contactCta}</Link>
        </aside>
      </div>
    </header>
  );
}
