import Link from "next/link";
import { home } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { Glyph, Sparkles } from "./ui";

/** Blurred glass arc with a brand-coloured edge glow, drawn instead of the template's hero photo. */
export function HeroBackdrop() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <filter id="hb-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60" /></filter>
        <filter id="hb-mid" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="hb-fine" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <linearGradient id="hb-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fb0c8" stopOpacity="0.15" />
          <stop offset="0.55" stopColor="#3a5276" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0b1828" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <ellipse cx="760" cy="560" rx="520" ry="380" fill="#ffffff" opacity="0.75" filter="url(#hb-soft)" />
      <circle cx="760" cy="980" r="900" fill="none" stroke="url(#hb-ring)" strokeWidth="26" filter="url(#hb-mid)" opacity="0.55" />
      <path d="M1180 120 C 1420 260 1520 520 1500 900" fill="none" stroke="rgb(63,138,208)" strokeWidth="150" strokeLinecap="round" opacity="0.55" filter="url(#hb-soft)" />
      <path d="M1210 110 C 1440 250 1545 520 1525 920" fill="none" stroke="#1f3f8a" strokeWidth="22" strokeLinecap="round" opacity="0.8" filter="url(#hb-mid)" />
      <path d="M1450 640 C 1500 760 1520 880 1515 1000" fill="none" stroke="#0b1828" strokeWidth="70" strokeLinecap="round" opacity="0.85" filter="url(#hb-mid)" />
      <path d="M1222 118 C 1450 255 1552 520 1534 930" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" filter="url(#hb-fine)" />
      <circle cx="250" cy="420" r="520" fill="none" stroke="#6f84a6" strokeWidth="10" opacity="0.18" filter="url(#hb-mid)" />
    </svg>
  );
}

export default function Hero() {
  const { h1, sub, cta, secondary } = home.hero;
  const words = h1.split(" ");
  const line1 = words.slice(0, -2).join(" ");
  const line2 = words.slice(-2).join(" ");

  return (
    <section className="section-hero">
      <div className="hero-image"><HeroBackdrop /></div>
      <div className="aig-container">
        <div className="hero-content">
          <div className="hero-sub effectFade fadeUp">
            <Sparkles />
            AI · Automation · Analytics
          </div>
          <h1 className="hero-title display-2 effectFade fadeRotateX">
            <span className="fw-semibold grad-1">{line1}</span>
            <span className="title2">
              <span className="fw-semibold grad-1">{line2}</span>
              <span className="title-icon" aria-hidden>
                <span className="box" />
                <span className="wrap">
                  <span className="chip c1" data-drift><Icon name="spark" /></span>
                  <span className="chip c2" data-drift><Icon name="workflow" /></span>
                  <span className="chip c3" data-drift><Icon name="chart" /></span>
                </span>
              </span>
            </span>
          </h1>
          <p className="hero-text effectFade fadeUp">{sub}</p>
          <div className="bot-btns effectFade fadeRotateX">
            <Link href="/contact" className="tf-btn">{cta}</Link>
            <Link href="/ai-solutions" className="tf-btn-2">{secondary}</Link>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-more">
        <span className="link1">Scroll for more</span>
        <span className="ic"><Glyph name="arrowDown" /></span>
      </a>
    </section>
  );
}
