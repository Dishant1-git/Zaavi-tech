"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, container, Eyebrow, Heading } from "./ui";

export default function FaqList({
  items,
  title = "Frequently Asked Questions",
  showAllLink = false,
  heading = true,
}: {
  items: { q: string; a: string }[];
  title?: string;
  showAllLink?: boolean;
  heading?: boolean;
}) {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative pt-24 pb-24">
      <div className={container}>
        {heading && (
          <div className="mx-auto max-w-[620px] text-center">
            <Eyebrow center>FAQ</Eyebrow>
            <Heading center>{title}</Heading>
          </div>
        )}
        <div className={`mx-auto max-w-[1000px] space-y-4 ${heading ? "mt-14" : ""}`}>
          {items.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} data-reveal="up" className={`rounded-[26px] p-px transition-all duration-500 ${active ? "bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)]" : "bg-transparent"}`}>
                <div className={`overflow-hidden rounded-[25px] transition-colors duration-500 ${active ? "bg-white" : "bg-ag-light"}`}>
                  <button onClick={() => setOpen(active ? -1 : i)} className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left sm:px-10" aria-expanded={active}>
                    <h3 className="font-ag text-[17px] font-bold text-ag-dark sm:text-[19px]">{f.q}</h3>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl transition-all duration-500 ${active ? "rotate-180 bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] text-white" : "bg-white text-ag-dark"}`}>
                      {active ? "−" : "+"}
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden px-7 text-[15px] leading-[1.9] font-medium text-ag-text sm:px-10">
                      <span className="block pb-7">{f.a}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {showAllLink && (
          <div className="mt-10 text-center">
            <Link href="/faq" className="group inline-flex items-center gap-2 font-ag text-sm font-bold text-ag-base uppercase">
              See all questions <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
