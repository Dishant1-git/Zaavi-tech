import type { Metadata } from "next";
import PageHero from "@/components/ag/PageHero";
import ServiceCategories from "@/components/ag/ServiceCategories";
import ServiceGrid from "@/components/ag/ServiceGrid";
import CtaBand from "@/components/ag/CtaBand";
import Motion from "@/components/ag/Motion";
import { solutionsPage as p } from "@/lib/content";

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
      />
      <ServiceCategories />
      <ServiceGrid />
      <CtaBand title={p.closing.h2} body={p.closing.body} cta={p.closing.cta} />
      <Motion />
    </>
  );
}
