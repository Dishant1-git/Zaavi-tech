import Link from "next/link";
import { activeLandings } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "./Header";
import { container, SocialIcon } from "./ui";

const cols = [
  { title: "AI Solutions", items: activeLandings.filter((l) => l.group === "ai").map((l) => ({ label: l.nav, href: `/${l.slug}` })) },
  {
    title: "Company",
    items: [
      { label: "AI Solutions & Services", href: "/ai-solutions" },
      ...activeLandings.filter((l) => l.group === "enterprise").map((l) => ({ label: l.nav, href: `/${l.slug}` })),
      { label: "About Us", href: "/about-us" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1a4f] pt-24">
      <svg viewBox="0 0 1440 600" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <g fill="none" stroke="#2b6cff" strokeOpacity="0.3">
          {Array.from({ length: 22 }).map((_, i) => (
            <path key={i} d={`M${700 + i * 8} 0 C ${760 + i * 10} ${120 + i * 6}, ${1100 - i * 4} ${240 + i * 5}, 1440 ${120 + i * 9}`} />
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute bottom-0 left-[10%] h-[300px] w-[500px] rounded-full bg-ag-primary/20 blur-[120px]" />
      <div className={`${container} relative grid gap-12 pb-20 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.1fr_1fr_1.2fr]`}>
        <div>
          <Logo />
          <p className="mt-6 max-w-[330px] font-ag text-lg leading-[1.6] font-bold text-white">{site.tagline}</p>
          <p className="mt-3 max-w-[330px] text-[15px] leading-[1.8] text-[#8c9ed3]">
            Practical AI, automation and analytics, connected to your systems and proven before they scale.
          </p>
          <div className="mt-8 flex gap-3">
            {(["facebook", "x", "linkedin", "youtube"] as const).map((s) => (
              <a key={s} href={site.social[s]} aria-label={s} className="grid h-11 w-11 place-items-center rounded-full bg-[#0a1238] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)]">
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="font-ag text-xl font-bold text-white">{c.title}</h3>
            <span className="mt-2 block h-[2px] w-6 bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)]" />
            <ul className="mt-7 space-y-3">
              {c.items.map((it) => (
                <li key={it.href + it.label}>
                  <Link href={it.href} className="group inline-flex items-center font-ag text-[15px] font-medium text-[#8c9ed3] transition-colors hover:text-white">
                    <span className="mr-0 inline-block w-0 overflow-hidden text-ag-base transition-all duration-300 group-hover:mr-2 group-hover:w-3">›</span>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-ag text-xl font-bold text-white">Contact</h3>
          <span className="mt-2 block h-[2px] w-6 bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)]" />
          <p className="mt-7 font-ag text-[15px] leading-[1.9] font-medium text-[#8c9ed3]">{site.address}</p>
          <a href={`mailto:${site.email}`} className="mt-6 flex items-center gap-3 font-ag font-bold text-white hover:text-ag-base">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ag-base" fill="currentColor"><path d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7z" /></svg>
            {site.email}
          </a>
          <a href={`tel:${site.phone}`} className="mt-3 flex items-center gap-3 font-ag font-bold text-white hover:text-ag-base">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ag-base" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
            {site.phone}
          </a>
          <p className="mt-4 font-ag text-sm text-[#8c9ed3]">{site.hours}</p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-8 text-center font-ag text-[15px] font-medium text-[#8c9ed3]">
        © {new Date().getFullYear()} Zaavi Technologies. All rights reserved.
      </div>
    </footer>
  );
}
