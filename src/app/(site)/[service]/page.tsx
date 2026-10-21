import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ag/PageHero";
import Flow from "@/components/ag/Flow";
import CtaBand from "@/components/ag/CtaBand";
import UseCaseStack from "@/components/ag/UseCaseStack";
import Motion from "@/components/ag/Motion";
import Icon from "@/components/ag/icons";
import { Arrow, container, Eyebrow, Heading } from "@/components/ag/ui";
import { activeLandings, landingBySlug } from "@/lib/content";

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

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: groupLabel, href: l.group === "ai" ? "/ai-solutions" : undefined }, { label: l.nav }]}
        eyebrow={groupLabel}
        title={l.h1}
        body={[l.intro]}
        cta={{ label: l.cta, href: contactHref }}
        visual={<Flow steps={l.flow} icon={l.icon} />}
      />

      {/* What we deliver */}
      <section className="relative pt-24 pb-24 lg:pt-32">
        <div className={`${container} grid gap-14 lg:grid-cols-[0.8fr_1.2fr]`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{l.nav}</Eyebrow>
            <Heading>What We Deliver</Heading>
            <div data-reveal="up" className="mt-8 grid h-20 w-20 place-items-center rounded-3xl bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] text-white shadow-[0_20px_40px_-15px_rgba(31,139,255,0.7)]">
              <Icon name={l.icon} className="h-10 w-10" />
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {l.deliver.map((d, i) => (
              <li key={d} data-reveal="up" className="group flex gap-4 rounded-[22px] border border-ag-border bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.45)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ag-light font-ag text-sm font-extrabold text-ag-base transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-2 font-ag text-[16px] leading-[1.55] font-semibold text-ag-dark">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <UseCaseStack items={l.helps} seed={activeLandings.indexOf(l) * 3 + 1} cta={l.cta} href={contactHref} />

      {/* Related services (internal links, Part 7) */}
      <section className="relative pt-24 pb-16">
        <div className={container}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Explore more</Eyebrow>
              <Heading>Related Solutions</Heading>
            </div>
            <Link href="/ai-solutions" className="group inline-flex items-center gap-2 font-ag text-sm font-bold text-ag-base uppercase">
              All AI solutions <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} data-reveal="up" className="group flex items-center gap-4 rounded-[22px] border border-ag-border bg-ag-light p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.45)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-ag-base transition-all group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                  <Icon name={r.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1 font-ag text-[16px] font-bold text-ag-dark">{r.nav}</span>
                <Arrow className="h-5 w-5 text-ag-base transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={l.closing} cta={l.cta} href={contactHref} />
      <Motion />
    </>
  );
}
