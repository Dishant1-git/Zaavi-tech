import type { Metadata } from "next";
import PageHero from "@/components/aig/PageHero";
import Faq from "@/components/aig/Faq";
import Cta from "@/components/aig/Cta";
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

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]} title={p.h1} sub={p.sub} icons={["chat", "doc", "target"]} />
      <div className="h-16 md:h-24" />
      <Faq items={faqs} heading={false} showAll={false} />
      <Cta title={home.closing.h2} body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
