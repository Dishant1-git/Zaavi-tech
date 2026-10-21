import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import WarpField from "@/components/WarpField";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Platform from "@/components/Platform";
import Metrics from "@/components/Metrics";
import Stack from "@/components/Stack";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import VelocitySkew from "@/components/VelocitySkew";

export const metadata = { title: "Zaavi Technology | Neo" };

export default function Neo() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <VelocitySkew />
      <Loader />
      <WarpField />
      <Nav />
      <div className="relative z-[1] overflow-x-clip">
        <main>
          <Hero />
          <Manifesto />
          <Divider index="02" label="CAPABILITIES" />
          <Services />
          <Divider index="03" label="PROCESS" />
          <Process />
          <Divider index="04" label="NEURAL PLATFORM" />
          <Platform />
          <Metrics />
          <Divider index="05" label="INTEGRATIONS" />
          <Stack />
          <Divider index="06" label="SECURITY" />
          <Security />
          <Divider index="07" label="TESTIMONIALS" />
          <Testimonials />
          <Divider index="08" label="PRICING" />
          <Pricing />
          <CTA />
        </main>
        <Footer />
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}
