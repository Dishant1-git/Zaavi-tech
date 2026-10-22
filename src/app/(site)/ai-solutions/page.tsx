import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/aig/PageHero";
import Cta from "@/components/aig/Cta";
import Icon from "@/components/ag/icons";
import { Glyph, SectionHeading } from "@/components/aig/ui";
import { categories, solutionsPage as p } from "@/lib/content";
import { categoryPhotos } from "@/lib/images";
import Photo from "@/components/aig/Photo";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/ai-solutions" },
};

export default function AiSolutions() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Solutions" }]}
        title={p.h1}
        sub={p.sub}
        body={p.body}
        cta={{ label: p.cta, href: "/contact" }}
        secondary={{ label: "Browse services", href: "#services" }}
      />

      {/* Service areas overview */}
      <div className="box-black mt-6">
        <div className="light-box" />
        <span className="light-line top" />
        <span className="light-line bot" />
        <section className="flat-spacing relative">
          <div className="aig-container">
            <SectionHeading sub={`${categories.length} service areas`} center dark className="mb-8 md:mb-16">
              The Full AI <br /> Journey
            </SectionHeading>
            <div className="awards-list">
              {categories.map((c, i) => (
                <a key={c.letter} href={`#cat-${c.letter}`} className="awards-item effectFade fadeUp" data-delay={Math.min(i, 3) * 0.1}>
                  <div className="c-icon"><span className="ic text-lg fw-semibold">{c.letter}</span></div>
                  <div className="c-title body-1 fw-semibold text-white">{c.name}</div>
                  <ul className="c-list body-3 grid gap-1 py-4">
                    {c.services.map((s) => <li key={s.n}>{s.title}</li>)}
                  </ul>
                  <div className="c-year body-1 t-n400">/ {String(c.services.length).padStart(2, "0")}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Every service, grouped */}
      <div id="services" className="box-white mt-6 scroll-mt-28">
        <section className="flat-spacing">
          <div className="aig-container space-y-20 md:space-y-28">
            {categories.map((c) => (
              <div key={c.letter} id={`cat-${c.letter}`} className="scroll-mt-28">
                <div className="mb-8 grid items-center gap-6 md:mb-12 md:grid-cols-[1fr_380px]">
                  <div className="flex items-center gap-5 effectFade fadeUp">
                    <span className="cat-chip">{c.letter}</span>
                    <h2 className="h4 grad-3 fw-semibold md:text-[48px]! md:leading-[56px]!">{c.name}</h2>
                  </div>
                  {categoryPhotos[c.letter] && (
                    <Photo photo={categoryPhotos[c.letter]} className="h-44 rounded-[28px]! shadow-[var(--sh-card)] effectFade fadeUp" sizes="380px" />
                  )}
                </div>
                <div className="grid-cards">
                  {c.services.map((s, i) => {
                    const inner = (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <span className="dark-tile"><Icon name={s.icon} /></span>
                          <span className="text-[40px] leading-none fw-semibold t-n200">{String(s.n).padStart(2, "0")}</span>
                        </div>
                        <h3 className="title h6 fw-semibold">{s.title}</h3>
                        <p className="t-sec">{s.copy}</p>
                        {s.href && <span className="more">Learn more <Glyph name="arrowUpRight" className="h-4 w-4" /></span>}
                      </>
                    );
                    const cls = "features-item h-full effectFade fadeUp";
                    return s.href ? (
                      <Link key={s.n} href={s.href} className={cls} data-delay={(i % 2) * 0.1}>{inner}</Link>
                    ) : (
                      <div key={s.n} className={cls} data-delay={(i % 2) * 0.1}>{inner}</div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Cta title={p.closing.h2} body={p.closing.body} cta={p.closing.cta} />
    </>
  );
}
