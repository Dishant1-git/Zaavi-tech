import Link from "next/link";
import { deliverCards } from "@/lib/content";
import { DotWave, Tube } from "./art";
import Icon from "./icons";
import { Arrow, container, Eyebrow, Heading, notch } from "./ui";

export default function Deliver() {
  return (
    <section id="solutions" className="relative pb-10">
      <div className="relative mx-auto max-w-[1320px] px-3 sm:px-5">
        <div className="dl-panel relative overflow-hidden rounded-[60px] bg-[linear-gradient(135deg,#eaf0fb,#e3eefc_50%,#eef4fd)] pt-20 pb-24 lg:pt-28 lg:pb-28">
          <DotWave className="pointer-events-none absolute top-[10%] right-0 h-[80%] w-[70%] opacity-60" />
          <div className={`${container} relative`}>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <Eyebrow>Our AI solutions</Eyebrow>
                <Heading>What We Deliver</Heading>
              </div>
              <Link href="/ai-solutions" className="group inline-flex items-center gap-2 font-ag text-sm font-bold text-ag-base uppercase">
                View all AI solutions <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="dl-grid mt-14 grid gap-6 [perspective:1400px] md:grid-cols-2 lg:grid-cols-3">
              {deliverCards.map((c) => (
                <Link key={c.title} href={c.href} className="dl-item group relative block transition-[translate] duration-500 hover:-translate-y-2">
                  <div
                    className="dl-card relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#1d2c5e,#121c45)] px-8 pt-8 pb-9 shadow-[0_30px_60px_-30px_rgba(13,26,66,0.7)]"
                    style={notch(52)}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(31,139,255,0.35),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#7cc4ff] transition-colors duration-500 group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                      <Icon name={c.icon} className="h-7 w-7" />
                    </span>
                    <div className="relative mt-7 font-ag text-xs font-bold tracking-[0.15em] text-[#7cc4ff] uppercase">{c.title}</div>
                    <h3 className="relative mt-3 font-ag text-[23px] leading-[1.25] font-bold tracking-tight text-white">{c.headline}</h3>
                    <p className="relative mt-4 flex-1 text-[15px] leading-[1.8] text-[#a9b6dc]">{c.copy}</p>
                    <span className="relative mt-7 inline-flex items-center gap-2 font-ag text-sm font-bold text-white">
                      {c.link}
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-[#1f8bff]">
                        <Arrow className="h-4 w-4" />
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Tube shape="spiral" data-parallax="-120" className="pointer-events-none absolute -right-4 -bottom-24 hidden w-[340px] lg:block" width={46} />
      </div>
    </section>
  );
}
