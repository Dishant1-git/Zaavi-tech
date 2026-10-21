import type { Metadata } from "next";
import HomeHero from "@/components/ag/HomeHero";
import TrustStrip from "@/components/ag/TrustStrip";
import Intro from "@/components/ag/Intro";
import Deliver from "@/components/ag/Deliver";
import WhyZaavi from "@/components/ag/WhyZaavi";
import Steps from "@/components/ag/Steps";
import Industries from "@/components/ag/Industries";
import Timeline from "@/components/ag/Timeline";
import FaqList from "@/components/ag/FaqList";
import CtaBand from "@/components/ag/CtaBand";
import Motion from "@/components/ag/Motion";
import HomeMotion from "@/components/ag/HomeMotion";
import { engagements, faqs, home, sixSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: home.seoTitle },
  description: home.metaDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustStrip words={home.trust} />
      <Intro />
      <Deliver />
      <WhyZaavi />
      <Steps
        id="how-we-work"
        eyebrow="How we work"
        title="From Idea to Impact in Six Steps"
        intro="Every project follows the same proven path, and at each step you know exactly what you receive."
        steps={sixSteps}
        cta={{ label: home.hero.cta, href: "/contact" }}
      />
      <Industries />
      <Timeline
        eyebrow="Ways to work with us"
        title="Start Small. Scale Fast."
        items={engagements.map((e) => ({ title: e.title, rows: [{ label: "Best for", text: e.bestFor }, { label: "Outcome", text: e.outcome }] }))}
      />
      <FaqList items={faqs.slice(0, 5)} showAllLink />
      <CtaBand title={home.closing.h2} body={home.closing.body} cta={home.closing.cta} />
      <Motion />
      <HomeMotion />
    </>
  );
}
