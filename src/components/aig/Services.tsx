"use client";

import Link from "next/link";
import { useState } from "react";
import { deliverCards } from "@/lib/content";
import { deliverPhotos, photos } from "@/lib/images";
import Photo from "./Photo";
import { Glyph, SectionHeading } from "./ui";

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="solutions" className="flat-spacing">
      <div className="aig-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="lg:w-[41%] xl:w-[34%]">
            <div className="services-left">
              <SectionHeading sub="Our AI solutions" className="mb-12">
                What We <br /> Deliver
              </SectionHeading>
              <p className="effectFade fadeUp">
                Practical AI, automation and analytics, designed around your processes and connected to the systems you already use.
              </p>
              <Link href="/ai-solutions" className="tf-btn-2 mt-8 effectFade fadeUp">
                View all AI solutions <Glyph name="arrowUpRight" />
              </Link>
            </div>
          </div>

          <div className="acc-list lg:w-1/2">
            {deliverCards.map((c, i) => (
              <div key={c.title} className={`acc-item effectFade fadeUp ${open === i ? "open" : ""}`}>
                <button type="button" className="acc-btn" aria-expanded={open === i} onClick={() => setOpen(i)}>
                  <span>{c.title}</span>
                  <span className="num">({String(i + 1).padStart(2, "0")})</span>
                </button>
                <div className="acc-panel" role="region" aria-hidden={open !== i}>
                  <div>
                    <div className="text">
                      <p className="headline body-1 fw-semibold">{c.headline}</p>
                      <p className="body-3 t-n300">{c.copy}</p>
                    </div>
                    <div className="list-tags">
                      <Link href={c.href} tabIndex={open === i ? 0 : -1}>
                        {c.link} <Glyph name="arrowUpRight" className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="services-image effectFade fadeUp">
          {deliverCards.map((c, i) => (
            <Photo
              key={c.title}
              photo={deliverPhotos[c.href] ?? photos.aiLetters}
              icon={c.icon}
              label={c.title}
              tint
              sizes="416px"
              className={`absolute! inset-0 rounded-none! transition-opacity duration-500 ${open === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
