"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs } from "@/lib/content";
import { Glyph, SectionHeading } from "./ui";

export default function Faq({ items = faqs.slice(0, 5), heading = true, showAll = true }: { items?: typeof faqs; heading?: boolean; showAll?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`flat-spacing ${heading ? "" : "pt-0"}`}>
      <div className="aig-container">
        {heading && (
          <SectionHeading sub="FAQs" center className="mb-6 md:mb-16">
            Frequently Asked <br /> Questions
          </SectionHeading>
        )}
        <div className="mx-auto lg:w-2/3">
          <div className="faq-list">
            {items.map((f, i) => (
              <div key={f.q} className={`faq-item effectFade fadeRotateX ${open === i ? "open" : ""}`} data-delay={Math.min(i, 3) * 0.1}>
                <button type="button" className="faq-btn" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span className="pm" aria-hidden />
                </button>
                <div className="faq-panel" role="region" aria-hidden={open !== i}>
                  <div><p className="faq-body">{f.a}</p></div>
                </div>
              </div>
            ))}
          </div>
          {showAll && (
            <div className="mt-10 text-center effectFade fadeUp">
              <Link href="/faq" className="tf-btn-2">
                View all FAQs <Glyph name="arrowUpRight" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
