import type { Metadata } from "next";
import PageHero from "@/components/ag/PageHero";
import ContactForm from "@/components/ag/ContactForm";
import Motion from "@/components/ag/Motion";
import { container } from "@/components/ag/ui";
import { contactPage as p } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: p.seoTitle },
  description: p.metaDescription,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const details = [
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Phone / WhatsApp", v: site.phone, href: `tel:${site.phone}` },
    { k: "Office", v: site.address },
    { k: "Business hours", v: site.hours },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} title={p.h1} sub={p.sub} body={[p.body]} />
      <section className="relative pt-20 pb-28">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]`}>
          <div data-reveal="up"><ContactForm /></div>
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div data-reveal="left" className="rounded-[30px] bg-[linear-gradient(135deg,#0b1f5c,#0a3fb8)] p-8 text-white">
              <h2 className="font-ag text-xl font-extrabold">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {p.next.map((n, i) => (
                  <li key={n.bold} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 font-ag text-sm font-extrabold">{i + 1}</span>
                    <p className="text-[15px] leading-[1.7] text-white/80"><strong className="text-white">{n.bold}</strong> {n.rest}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div data-reveal="left" className="rounded-[30px] border border-ag-border bg-ag-light p-8">
              <h2 className="font-ag text-xl font-extrabold text-ag-dark">Contact details</h2>
              <dl className="mt-5 space-y-4">
                {details.map((d) => (
                  <div key={d.k}>
                    <dt className="font-ag text-[11px] font-bold tracking-[0.15em] text-ag-base uppercase">{d.k}</dt>
                    <dd className="mt-1 font-ag text-[15px] font-semibold text-ag-dark">
                      {d.href ? <a href={d.href} className="hover:text-ag-base">{d.v}</a> : d.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
      <Motion />
    </>
  );
}
