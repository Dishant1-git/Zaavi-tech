import type { Metadata } from "next";
import Hero from "@/components/aig/Hero";
import About from "@/components/aig/About";
import Partner from "@/components/aig/Partner";
import Services from "@/components/aig/Services";
import Process from "@/components/aig/Process";
import Benefits from "@/components/aig/Benefits";
import Industries from "@/components/aig/Industries";
import Engagements from "@/components/aig/Engagements";
import HomeBlog from "@/components/aig/HomeBlog";
import Faq from "@/components/aig/Faq";
import Cta from "@/components/aig/Cta";
import { home, sixSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: home.seoTitle },
  description: home.metaDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Partner />
      <div className="box-white">
        <Services />
        <Process
          id="how-we-work"
          sub="How we work"
          title={<>From Idea to <br /> Impact in Six Steps</>}
          intro="Every project follows the same proven path, and at each step you know exactly what you receive."
          steps={sixSteps}
          icons={["compass", "target", "doc", "workflow", "shield", "rocket"]}
          cta={{ label: home.hero.cta, href: "/contact" }}
        />
        <Benefits />
        <Industries />
      </div>
      <div className="h-6" />
      <Engagements />
      <HomeBlog />
      <Faq />
      <Cta title={home.closing.h2} body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
