"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { Glyph, SectionHeading } from "./ui";

type Step = { title: string; body: string; receive?: string };

/** Heading on the left, step cards in a horizontal slider on the right. */
export default function Process({
  id,
  sub,
  title,
  intro,
  steps,
  icons,
  cta,
}: {
  id?: string;
  sub: string;
  title: React.ReactNode;
  intro?: string;
  steps: Step[];
  icons: IconName[];
  cta?: { label: string; href: string };
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const total = String(steps.length).padStart(2, "0");

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section id={id} className="flat-spacing pt-0">
      <div className="aig-container">
        <div className="grid gap-6 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col justify-center">
            <SectionHeading sub={sub} className="mb-10 lg:mb-20">{title}</SectionHeading>
            {intro && <p className="t-sec mb-8 max-w-[420px] effectFade fadeUp">{intro}</p>}
            <div className="flex flex-wrap items-center gap-3 max-lg:mb-8">
              <button type="button" className="nav-btn" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous step">
                <Glyph name="left" />
              </button>
              <button type="button" className="nav-btn" onClick={() => go(1)} disabled={edge.end} aria-label="Next step">
                <Glyph name="right" />
              </button>
              {cta && <Link href={cta.href} className="tf-btn ml-2">{cta.label}</Link>}
            </div>
          </div>

          <div className="process-slide min-w-0">
            <div ref={track} className="process-track">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <article className="process-card">
                    <span className="brand-tile"><Icon name={icons[i % icons.length]} /></span>
                    <div className="content">
                      <h3 className="title h4 fw-semibold">{s.title}</h3>
                      <p className="t-sec">{s.body}</p>
                    </div>
                    <div className="bot">
                      {s.receive ? (
                        <div className="time body-3 fw-semibold">
                          <b>You receive</b>
                          {s.receive}
                        </div>
                      ) : <span />}
                      <div className="number">
                        <span className="t-n400">{String(i + 1).padStart(2, "0")}</span>
                        <span className="t-n200">/{total}</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
