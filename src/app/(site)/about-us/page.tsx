import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ag/PageHero";
import Timeline from "@/components/ag/Timeline";
import CtaBand from "@/components/ag/CtaBand";
import Motion from "@/components/ag/Motion";
import Icon from "@/components/ag/icons";
import { ArtTile, Tube } from "@/components/ag/art";
import { Arrow, container, Eyebrow, Heading, notch } from "@/components/ag/ui";
import { aboutPage as p } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/about-us" },
};

export default function AboutUs() {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} title={p.h1} sub={p.sub} cta={{ label: p.closing.cta, href: "/contact" }} />

      {/* Who we are / Why we exist */}
      <section className="relative overflow-hidden pt-24 pb-24 lg:pt-32">
        <div className={`${container} grid items-center gap-16 lg:grid-cols-[1fr_1fr]`}>
          <div className="relative" data-reveal="right">
            <div className="aspect-[5/4] overflow-hidden rounded-[24px]" style={notch(80)}>
              <div data-parallax-inner className="h-[120%] w-full"><ArtTile variant={5} seed={21} /></div>
            </div>
            <Tube shape="spiral" data-parallax="-80" className="pointer-events-none absolute -bottom-16 -left-10 w-[220px]" width={40} />
          </div>
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <p data-reveal="up" className="font-ag text-[22px] leading-[1.55] font-bold text-ag-dark sm:text-[26px]">{p.who}</p>
            <div className="mt-12">
              <Eyebrow>Why we exist</Eyebrow>
              {p.why.map((w) => <p key={w} data-reveal="up" className="mt-4 text-[16px] leading-[1.9] font-medium text-ag-text">{w}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="relative">
        <div className={`${container} grid gap-6 md:grid-cols-2`}>
          {[{ k: "Our mission", v: p.mission, icon: "target" as const }, { k: "Our vision", v: p.vision, icon: "rocket" as const }].map((m) => (
            <div key={m.k} data-reveal="up" className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#0b1f5c,#0a3fb8)] p-10 text-white">
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#1f8bff]/40 blur-[80px]" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#7cc4ff]"><Icon name={m.icon} className="h-7 w-7" /></span>
              <h2 className="relative mt-6 font-ag text-[28px] font-extrabold">{m.k}</h2>
              <p className="relative mt-4 text-[17px] leading-[1.8] text-white/80">{m.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="relative mt-24 bg-[linear-gradient(120deg,#e9f0fb,#e3eefc_45%,#eef4fb)] py-24">
        <div className={container}>
          <div className="mx-auto max-w-[600px] text-center">
            <Eyebrow center>How we think</Eyebrow>
            <Heading center>Our Principles</Heading>
          </div>
          <div className="mx-auto mt-14 max-w-[1000px] overflow-hidden rounded-[26px] bg-white shadow-[0_30px_60px_-40px_rgba(13,26,66,0.5)]">
            {p.principles.map((pr, i) => (
              <div key={pr.title} data-reveal="up" className="group grid gap-3 border-b border-ag-border px-8 py-7 transition-colors last:border-0 hover:bg-ag-light sm:grid-cols-[60px_260px_1fr] sm:items-center">
                <span className="font-ag text-2xl font-extrabold text-[#bcd3f5] transition-colors group-hover:text-ag-base">0{i + 1}</span>
                <h3 className="font-ag text-lg font-bold text-ag-dark">{pr.title}</h3>
                <p className="text-[15px] leading-[1.7] font-medium text-ag-text">{pr.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative pt-24">
        <div className={container}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Our services</Eyebrow>
              <Heading>What We Do</Heading>
            </div>
            <Link href="/ai-solutions" className="group inline-flex items-center gap-2 font-ag text-sm font-bold text-ag-base uppercase">
              All AI solutions <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.whatWeDo.map((w) => (
              <Link key={w.text} href={w.href} data-reveal="up" className="group flex items-center gap-4 rounded-[20px] border border-ag-border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.45)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ag-light text-ag-base transition-all group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                  <Icon name={w.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1 font-ag text-[15px] leading-[1.5] font-bold text-ag-dark">{w.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Timeline eyebrow="Our process" title="How We Engage" items={p.engage.map((e) => ({ title: e.title, rows: [{ text: e.body }] }))} />

      {/* Commitment */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1320px] px-3 sm:px-5">
          <div className="relative overflow-hidden rounded-[60px] bg-[linear-gradient(120deg,#0b1a8a,#0b1f5c_45%,#0b2a6b_75%,#0a1840)] px-6 py-20 sm:px-16 lg:py-24">
            <div className="grain-local opacity-[0.12]" />
            <div className="relative mx-auto max-w-[900px] text-center">
              <Eyebrow light center>Our commitment</Eyebrow>
              <p data-split className="font-ag text-[26px] leading-[1.35] font-extrabold text-white sm:text-[36px]">{p.commitment[0]}</p>
              <p data-reveal="up" className="mx-auto mt-8 max-w-[720px] text-[17px] leading-[1.85] text-[#b5c3e8]">{p.commitment[1]}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={p.closing.h2} body={p.closing.body} cta={p.closing.cta} />
      <Motion />
    </>
  );
}
