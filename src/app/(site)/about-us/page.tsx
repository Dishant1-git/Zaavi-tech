import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/aig/PageHero";
import Process from "@/components/aig/Process";
import Cta from "@/components/aig/Cta";
import Icon from "@/components/ag/icons";
import { Glyph, SectionHeading } from "@/components/aig/ui";
import { aboutPage as p } from "@/lib/content";
import { photos } from "@/lib/images";
import Photo from "@/components/aig/Photo";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/about-us" },
};

export default function AboutUs() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title={p.h1}
        sub={p.sub}
        cta={{ label: p.closing.cta, href: "/contact" }}
        icons={["compass", "brain", "rocket"]}
      />

      {/* Who we are / Why we exist */}
      <section className="flat-spacing">
        <div className="aig-container">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="who-media effectFade fadeUp">
              <Photo photo={photos.workshop} className="main" sizes="(min-width: 1024px) 600px, 100vw" />
              <Photo photo={photos.partnership} className="inset" sizes="(min-width: 1024px) 320px, 55vw" />
              <div className="badge neo">
                <span className="brand-tile"><Icon name="target" /></span>
                <span>
                  <span className="lbl block">Our focus</span>
                  <span className="fw-semibold">Business problem first</span>
                </span>
              </div>
            </div>

            <div>
              <SectionHeading sub="Who we are" className="mb-8">
                Practical AI, <br /> Built to Fit
              </SectionHeading>
              <p className="body-1 fw-semibold mb-10 effectFade fadeUp">{p.who}</p>
              <div className="lbl mb-4 effectFade fadeUp">Why we exist</div>
              <div className="grid gap-4">
                {p.why.map((w, i) => (
                  <div key={w} className={`why-item ${i ? "dark" : ""} effectFade fadeUp`} data-delay={i * 0.1}>
                    <span className="num-chip">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="fw-semibold mb-1">{i ? "Our answer" : "The problem"}</div>
                      <p className={i ? "t-n400" : "t-sec"}>{w}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3 effectFade fadeRotateX">
                <Link href="/contact" className="tf-btn">{p.closing.cta}</Link>
                <Link href="/ai-solutions" className="tf-btn-2">Our services <Glyph name="arrowUpRight" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="box-white">
        {/* Mission & vision */}
        <section className="flat-spacing">
          <div className="aig-container">
            <SectionHeading sub="Mission & vision" center className="mb-8 md:mb-16">
              Why We Do <br /> What We Do
            </SectionHeading>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { k: "Our mission", v: p.mission, icon: "target" as const, dark: false, photo: photos.whiteboard },
                { k: "Our vision", v: p.vision, icon: "rocket" as const, dark: true, photo: photos.earthNetwork },
              ].map((m, i) => (
                <div key={m.k} className={`${m.dark ? "card-dark" : "card"} effectFade fadeUp`} data-delay={i * 0.1}>
                  <Photo photo={m.photo} className="-mx-4 -mt-4 mb-[-36px] h-56 rounded-[28px]!" sizes="(min-width: 768px) 50vw, 100vw" />
                  <span className="brand-tile relative z-[1] mb-8 ml-4"><Icon name={m.icon} /></span>
                  <h3 className="h4 fw-semibold mb-4">{m.k}</h3>
                  <p className={m.dark ? "t-n400" : "t-sec"}>{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="flat-spacing pt-0">
          <div className="aig-container">
            <SectionHeading sub="How we think" center className="mb-8 md:mb-16">
              Our Principles
            </SectionHeading>
            <div className="grid-cards three">
              {p.principles.map((pr, i) => (
                <div key={pr.title} className="features-item effectFade fadeUp" data-delay={(i % 3) * 0.1}>
                  <span className="dark-tile text-lg fw-semibold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="title h6 fw-semibold">{pr.title}</h3>
                  <p className="t-sec">{pr.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="flat-spacing pt-0">
          <div className="aig-container">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading sub="Our services" className="mb-0">What We Do</SectionHeading>
              <Link href="/ai-solutions" className="tf-btn-2 self-start md:self-auto effectFade fadeUp">
                All AI solutions <Glyph name="arrowUpRight" />
              </Link>
            </div>
            <div className="grid-cards three mt-10 md:mt-16">
              {p.whatWeDo.map((w, i) => (
                <Link key={w.text} href={w.href} className="features-item effectFade fadeUp" data-delay={(i % 3) * 0.1}>
                  <span className="dark-tile"><Icon name={w.icon} /></span>
                  <h3 className="title h6 fw-semibold">{w.text}</h3>
                  <span className="more">Learn more <Glyph name="arrowUpRight" className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Process
          sub="Our process"
          title={<>How We <br /> Engage</>}
          intro="A simple, transparent way of working, from the first conversation to continuous improvement."
          steps={p.engage}
          icons={["chat", "doc", "rocket", "refresh"]}
          cta={{ label: p.closing.cta, href: "/contact" }}
        />
      </div>

      {/* Commitment */}
      <div className="h-6" />
      <div className="box-black">
        <div className="light-box" />
        <span className="light-line top" />
        <span className="light-line bot" />
        <section className="flat-spacing relative">
          <div className="aig-container">
            <div className="mx-auto max-w-[900px] text-center">
              <SectionHeading sub="Our commitment" center dark className="mb-8 md:mb-12" />
              <p className="h4 fw-semibold text-white effectFade fadeRotateX">{p.commitment[0]}</p>
              <p className="body-1 t-n400 mx-auto mt-8 max-w-[720px] effectFade fadeUp">{p.commitment[1]}</p>
            </div>
          </div>
        </section>
      </div>

      <Cta title={p.closing.h2} body={p.closing.body} cta={p.closing.cta} />
    </>
  );
}
