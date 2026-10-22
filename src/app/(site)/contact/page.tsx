import type { Metadata } from "next";
import PageHero from "@/components/aig/PageHero";
import ContactForm from "@/components/aig/ContactForm";
import Icon from "@/components/ag/icons";
import { SectionHeading } from "@/components/aig/ui";
import { contactPage as p, type IconName } from "@/lib/content";
import { site } from "@/lib/site";
import { photos } from "@/lib/images";
import Photo from "@/components/aig/Photo";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const details: { k: string; v: string; href?: string; icon: IconName }[] = [
    { k: "Email", v: site.email, href: `mailto:${site.email}`, icon: "chat" },
    { k: "Phone / WhatsApp", v: site.phone, href: `tel:${site.phone}`, icon: "signal" },
    { k: "Office", v: site.address, icon: "building" },
    { k: "Business hours", v: site.hours, icon: "gauge" },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={p.h1}
        sub={p.sub}
        body={[p.body]}
        icons={["chat", "spark", "rocket"]}
      />
      <section className="flat-spacing">
        <div className="aig-container">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <div className="flex h-full flex-col justify-between gap-12 lg:py-10">
              <div>
                <SectionHeading sub="Contact" className="mb-10 md:mb-12">
                  Let&apos;s Build <br /> Intelligent Things
                </SectionHeading>
                <div className="grid gap-5">
                  {details.map((d, i) => (
                    <div key={d.k} className="contact-item effectFade fadeRotateX" data-delay={i * 0.1}>
                      <span className="ic"><Icon name={d.icon} /></span>
                      <div>
                        <div className="fw-semibold mb-0.5">{d.k}</div>
                        {d.href ? <a href={d.href} className="t-sec link1">{d.v}</a> : <div className="t-sec">{d.v}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Photo photo={photos.laptopPointing} className="h-60 rounded-[32px]! shadow-[var(--sh-card)] effectFade fadeUp" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="card-dark effectFade fadeUp">
                <h2 className="h5 fw-semibold mb-6">What happens next</h2>
                <ol className="grid gap-5">
                  {p.next.map((n, i) => (
                    <li key={n.bold} className="flex gap-4">
                      <span className="num-chip h-9! w-9! text-sm">{i + 1}</span>
                      <p className="t-n400"><strong className="text-white fw-semibold">{n.bold}</strong> {n.rest}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="effectFade fadeUp"><ContactForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
