import type { Metadata } from "next";
import PageHero from "@/components/ag/PageHero";
import FaqList from "@/components/ag/FaqList";
import CtaBand from "@/components/ag/CtaBand";
import Motion from "@/components/ag/Motion";
import { faqPage as p, faqs, home } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Faq() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]} title={p.h1} sub={p.sub} />
      <FaqList items={faqs} heading={false} />
      <CtaBand title={home.closing.h2} body={home.closing.body} cta={home.closing.cta} />
      <Motion />
    </>
  );
}
