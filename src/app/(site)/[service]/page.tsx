import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/aig/PageHero";
import Flow from "@/components/aig/Flow";
import Cta from "@/components/aig/Cta";
import Icon from "@/components/ag/icons";
import { Glyph, SectionHeading } from "@/components/aig/ui";
import Photo from "@/components/aig/Photo";
import { activeLandings, landingBySlug } from "@/lib/content";
import { serviceCover, servicePhotos } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeLandings.map((l) => ({ service: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const l = landingBySlug((await params).service);
  if (!l) return {};
  return { title: { absolute: l.seoTitle }, description: l.metaDescription, alternates: { canonical: `/${l.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const l = landingBySlug((await params).service);
  if (!l) notFound();
  const groupLabel = l.group === "ai" ? "AI Solutions" : "Enterprise Technology";
  const related = activeLandings.filter((o) => o.slug !== l.slug).slice(0, 3);
  const contactHref = `/contact?service=${l.slug}`;
  const useCasePhotos = servicePhotos[l.slug];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: groupLabel, href: l.group === "ai" ? "/ai-solutions" : undefined }, { label: l.nav }]}
        title={l.h1}
        body={[l.intro]}
        cta={{ label: l.cta, href: contactHref }}
        secondary={{ label: "All AI solutions", href: "/ai-solutions" }}
        visual={<Flow steps={l.flow} icon={l.icon} />}
      />

      <div className="box-white mt-6">
        {/* What we deliver */}
        <section className="flat-spacing">
          <div className="aig-container">
            <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-6">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading sub={l.nav} className="mb-10">What We <br /> Deliver</SectionHeading>
                <span className="brand-tile h-20! w-20! effectFade fadeUp"><Icon name={l.icon} /></span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {l.deliver.map((d, i) => (
                  <li key={d} className="features-item flex flex-col gap-6 effectFade fadeUp" data-delay={(i % 2) * 0.1}>
                    <span className="num-chip">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h6 fw-semibold">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Where it helps */}
        <section className="flat-spacing pt-0">
          <div className="aig-container">
            <div className="mb-8 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
              <SectionHeading sub="Use cases" className="mb-0">Where It Helps</SectionHeading>
              <div className="lbl effectFade fadeUp">{String(l.helps.length).padStart(2, "0")} use cases</div>
            </div>
            <div className="grid gap-8">
              {l.helps.map((h, i) => (
                <article key={h} className="use-card md:sticky effectFade fadeUp" style={{ top: 120 + i * 24 }}>
                  <Photo photo={useCasePhotos[i % 3]} className="image" sizes="(min-width: 768px) 55vw, 100vw" />
                  <div className="content">
                    <div className="pagi-dot">
                      {l.helps.map((_, k) => <span key={k} className={k === i ? "active" : ""} />)}
                    </div>
                    <div className="lbl mb-2">Use case {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="h4 fw-semibold mb-8">{h}</h3>
                    <Link href={contactHref} className="tf-btn self-start">{l.cta}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related services (internal links, Part 7) */}
        <section className="flat-spacing pt-0">
          <div className="aig-container">
            <div className="mb-8 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
              <SectionHeading sub="Explore more" className="mb-0">Related Solutions</SectionHeading>
              <Link href="/ai-solutions" className="tf-btn-2 self-start md:self-auto effectFade fadeUp">
                All AI solutions <Glyph name="arrowUpRight" />
              </Link>
            </div>
            <div className="grid-cards three">
              {related.map((r, i) => (
                <Link key={r.slug} href={`/${r.slug}`} className="features-item hover-zoom effectFade fadeUp" data-delay={i * 0.1}>
                  <Photo photo={serviceCover(r.slug)} sizes="(min-width: 1024px) 400px, 100vw" />
                  <span className="dark-tile"><Icon name={r.icon} /></span>
                  <h3 className="title h6 fw-semibold">{r.nav}</h3>
                  <p className="t-sec">{r.intro}</p>
                  <span className="more">Learn more <Glyph name="arrowUpRight" className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Cta title={l.closing} cta={l.cta} href={contactHref} />
    </>
  );
}
