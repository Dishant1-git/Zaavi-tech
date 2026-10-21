"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactCta, nav } from "@/lib/content";
import { site } from "@/lib/site";
import BrandLogo from "./BrandLogo";
import Icon from "./icons";
import { container, GRAD, SocialIcon } from "./ui";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center" aria-label="Zaavi Technologies home">
      <BrandLogo tone={dark ? "dark" : "light"} className="h-11 w-auto sm:h-[50px]" />
    </Link>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

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
    item.href === "/" ? pathname === "/" : pathname === item.href || !!item.children?.some((c) => c.href === pathname);

  return (
    <header className={`z-50 w-full transition-all duration-500 ${stuck ? "fixed top-0 left-0 animate-[ag-drop_.6s_ease]" : "absolute top-0 left-0 pt-4 sm:pt-[30px]"}`}>
      <div className={stuck ? "" : container}>
        <div className={`transition-all ${stuck ? "rounded-none bg-ag-dark/90 shadow-[0_10px_40px_rgba(8,20,53,0.4)] backdrop-blur-xl" : "rounded-[20px] border border-white/10 bg-white/[0.03] backdrop-blur-md"}`}>
          {!stuck && (
            <div className="hidden items-center justify-between rounded-t-[20px] bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)] px-8 py-3 text-[13px] font-semibold text-white md:flex lg:px-10">
              <div className="flex items-center gap-7">
                <span className="hidden items-center gap-2 lg:flex">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                  {site.city}
                </span>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7z" /></svg>
                  {site.email}
                </a>
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:opacity-80">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
                  {site.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                {(["facebook", "x", "linkedin", "youtube"] as const).map((s) => (
                  <a key={s} href={site.social[s]} aria-label={s} className="transition-transform hover:-translate-y-0.5"><SocialIcon name={s} className="h-3.5 w-3.5" /></a>
                ))}
              </div>
            </div>
          )}

          <div className={`flex items-center justify-between px-5 lg:px-10 ${stuck ? "mx-auto max-w-[1200px] py-3" : "py-5 lg:py-6"}`}>
            <Logo />
            <nav className="hidden xl:block" aria-label="Main">
              <ul className="flex items-center gap-7">
                {nav.map((item) => (
                  <li key={item.href} className="group/nav relative">
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1.5 py-3 font-ag text-[14px] font-bold tracking-tight uppercase transition-colors hover:text-white ${isActive(item) ? "text-white" : "text-white/60"}`}
                    >
                      {item.label}
                      {item.children && <Chevron className="transition-transform duration-300 group-hover/nav:rotate-180" />}
                      <span className={`absolute bottom-1 left-0 h-[2px] bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)] transition-all duration-300 ${isActive(item) ? "w-full" : "w-0"}`} />
                    </Link>
                    {item.children && (
                      <div className="invisible absolute top-full left-1/2 z-20 w-[330px] -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                        <ul className="overflow-hidden rounded-2xl border border-ag-border bg-white p-2 shadow-[0_30px_60px_-20px_rgba(8,20,53,0.45)]">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className={`group/item flex items-center gap-3 rounded-xl px-3 py-2.5 font-ag text-[14px] font-semibold transition-colors hover:bg-ag-light ${pathname === c.href ? "text-ag-base" : "text-ag-dark"}`}
                              >
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ag-light text-ag-base transition-colors group-hover/item:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover/item:text-white">
                                  <Icon name={c.icon} className="h-[18px] w-[18px]" />
                                </span>
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/contact" className={`${GRAD} hidden rounded-full px-6 py-3 font-ag text-xs font-bold whitespace-nowrap text-white uppercase sm:inline-block`}>
                {contactCta}
              </Link>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white xl:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-500 xl:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className="absolute inset-0 bg-ag-dark2/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside className={`absolute top-0 right-0 flex h-full w-[min(360px,88vw)] flex-col overflow-y-auto bg-ag-dark p-7 transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">✕</button>
          </div>
          <ul className="mt-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <Link href={item.href} className={`block flex-1 py-4 font-ag font-bold uppercase ${isActive(item) ? "text-[#7cc4ff]" : "text-white"}`}>{item.label}</Link>
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
                        <Link href={c.href} className="flex items-center gap-3 py-2 pl-2 font-ag text-sm text-white/75 hover:text-white">
                          <Icon name={c.icon} className="h-4 w-4 text-[#7cc4ff]" /> {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className={`${GRAD} mt-8 rounded-full py-4 text-center font-ag text-sm font-bold text-white uppercase`}>{contactCta}</Link>
        </aside>
      </div>
    </header>
  );
}
