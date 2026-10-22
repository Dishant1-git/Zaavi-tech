import Link from "next/link";
import type { IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { HeroBackdrop } from "./Hero";
import { Glyph } from "./ui";

/**
 * Banner at the top of every inner page (the template's "Hero v1"): breadcrumbs, the page's single H1
 * with the brand pill beside its last word, then lead text and buttons. With `visual`, it becomes a
 * two-column, left-aligned layout.
 */
export default function PageHero({
  crumbs,
  title,
  sub,
  body,
  cta,
  secondary,
  icons = ["spark", "workflow", "chart"],
  visual,
  small = false,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  sub?: string;
  body?: string[];
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  icons?: [IconName, IconName, IconName];
  visual?: React.ReactNode;
  /** Smaller title for long headings such as article titles. */
  small?: boolean;
}) {
  const words = title.split(" ");
  const head = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  const copy = (
    <div className="hero-content">
      <nav aria-label="Breadcrumb" className="breadcrumbs effectFade fadeUp">
        {crumbs.map((c, i) => (
          <span key={c.label} className="flex items-center gap-2">
            {i > 0 && <span className="sep" aria-hidden>/</span>}
            {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </span>
        ))}
      </nav>
      <h1 className={`hero-title page-title ${small ? "sm" : ""} effectFade fadeRotateX`}>
        <span className="fw-semibold grad-1">{head} </span>
        <span className="title2">
          <span className="fw-semibold grad-1">{last}</span>
          {!visual && !small && (
            <span className="title-icon hidden md:block" aria-hidden>
              <span className="box" />
              <span className="wrap">
                {icons.map((ic, i) => (
                  <span key={ic + i} className={`chip c${i + 1}`} data-drift><Icon name={ic} /></span>
                ))}
              </span>
            </span>
          )}
        </span>
      </h1>
      {sub && <p className="hero-lead effectFade fadeUp">{sub}</p>}
      {body?.map((p) => <p key={p} className="hero-text effectFade fadeUp">{p}</p>)}
      {(cta || secondary) && (
        <div className="bot-btns mt-8 effectFade fadeRotateX">
          {cta && <Link href={cta.href} className="tf-btn">{cta.label}</Link>}
          {secondary && <Link href={secondary.href} className="tf-btn-2">{secondary.label} <Glyph name="arrowUpRight" /></Link>}
        </div>
      )}
    </div>
  );

  return (
    <section className={`section-hero v1 ${visual ? "with-visual" : ""}`}>
      <div className="hero-image"><HeroBackdrop /></div>
      <div className="aig-container">
        {visual ? (
          <div className="grid items-center gap-x-16 lg:grid-cols-[1.2fr_1fr]">
            {copy}
            <div className="pb-16 lg:pt-24 lg:pb-0 effectFade fadeUp">{visual}</div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
