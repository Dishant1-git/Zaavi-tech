import { reasons, type IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { Glyph, SectionHeading } from "./ui";

const reason = (title: string) => reasons.find((r) => r.title === title) ?? reasons[0];

function Content({ title }: { title: string }) {
  const r = reason(title);
  return (
    <div className="content relative">
      <h3 className="title h6 fw-semibold">{r.title}</h3>
      <p className="t-sec">{r.copy}</p>
    </div>
  );
}

/** "Measured results": metric bars that grow as they scroll in. */
function Progress() {
  const bars: { label: string; icon: IconName; value: number }[] = [
    { label: "Hours saved", icon: "gauge", value: 60 },
    { label: "Accuracy", icon: "target", value: 100 },
    { label: "Response time", icon: "refresh", value: 40 },
    { label: "Adoption", icon: "chart", value: 80 },
  ];
  return (
    <div className="progress-list">
      {bars.map((b) => (
        <div key={b.label} className="progress-item">
          <div className="progress-line" data-progress={b.value * 0.7} />
          <div className="progress-text neo"><Icon name={b.icon} /> {b.label}</div>
        </div>
      ))}
    </div>
  );
}

/** "Proof before scale": three checkpoints on a rail. */
function Steps() {
  return (
    <div className="step-row">
      <div className="line-step" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="step-item neo"><Glyph name="check" strokeWidth={2.4} /></div>
      ))}
    </div>
  );
}

/** "Secure by design": embossed shield with a lock. */
function Shield() {
  return (
    <div className="shield-art">
      <svg viewBox="0 0 231 278" fill="none" aria-hidden>
        <defs>
          <filter id="sh-d" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodOpacity="0.12" />
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.1" />
          </filter>
          <linearGradient id="sh-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f8ad0" />
            <stop offset="1" stopColor="#1f3f8a" />
          </linearGradient>
        </defs>
        <path filter="url(#sh-d)" d="M69 23c12.3-6.6 26-14.6 46.5-14.6S149.6 16.4 162 23c12.3 6.6 23.5 12.3 44 12.3h9v9c0 69.5-23.6 114.7-47.5 142-23.9 27.2-48.6 37-48.6 37l-3.4 1.1-3.4-1.1S87.4 213 63.5 185.8C39.6 158.5 16 113.4 16 44.1v-9h9c20.7 0 31.8-5.7 44-12.3Z" fill="#f1f4f8" />
        <path d="M76 42c10-5.4 21.2-11.9 39.5-11.9S145 36.6 155 42c9.6 5.2 19 10.1 35 11.2-2 55-21.5 92.5-41 114.7-17 19.3-34.5 28.4-33.5 28.4h0c1 0-16.6-9.2-33.6-28.6C62.4 145.6 43 108.2 41 53.2c16-1.1 25.4-6 35-11.2Z" fill="#f8f9fc" stroke="#e2e7ef" />
        <rect x="88" y="104" width="55" height="46" rx="10" fill="url(#sh-b)" />
        <path d="M100 104v-12a15.5 15.5 0 0 1 31 0v12" stroke="#10203a" strokeWidth="7" strokeLinecap="round" />
        <circle cx="115.5" cy="124" r="6" fill="#fff" />
        <path d="M115.5 128v8" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** "Built into your systems": the solution wired into existing tools. */
function Hub() {
  const nodes: { label: string; icon: IconName; cls: string; anim: string }[] = [
    { label: "CRM", icon: "chat", cls: "n1", anim: "rightleft" },
    { label: "ERP", icon: "server", cls: "n2", anim: "updown" },
    { label: "Data warehouse", icon: "dashboard", cls: "n3", anim: "updown" },
    { label: "Helpdesk", icon: "doc", cls: "n4", anim: "rightleft" },
  ];
  return (
    <div className="hub-art">
      <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <g stroke="#cfd6e2" strokeWidth="1.5" strokeDasharray="4 6" fill="none" vectorEffect="non-scaling-stroke">
          <path d="M14 14 C 30 14, 32 46, 44 48" vectorEffect="non-scaling-stroke" />
          <path d="M18 84 C 32 84, 32 54, 44 52" vectorEffect="non-scaling-stroke" />
          <path d="M84 10 C 70 10, 68 46, 56 48" vectorEffect="non-scaling-stroke" />
          <path d="M80 80 C 68 80, 68 54, 56 52" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
      <div className="center neo"><span className="brand-tile"><Icon name="link" /></span></div>
      {nodes.map((n) => (
        <div key={n.label} className={`node neo ${n.cls} ${n.anim}`}><Icon name={n.icon} /> {n.label}</div>
      ))}
    </div>
  );
}

/** "Business problem first": AI is recommended only where it beats simpler options. */
function Compare() {
  const rows = [
    { label: "Process redesign", tag: "Considered" },
    { label: "Conventional software", tag: "Considered" },
    { label: "AI solution", tag: "Best fit", best: true },
  ];
  return (
    <div className="compare-list">
      {rows.map((r) => (
        <div key={r.label} className={`compare-item ${r.best ? "best" : "neo"}`}>
          <span className="flex items-center gap-2">
            {r.best && <Glyph name="check" className="h-5 w-5 text-[var(--brand)]" />}
            {r.label}
          </span>
          <span className="tag">{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

/** "Ready to scale and supported": rising bars. */
function Grow() {
  return (
    <div className="grow-art" aria-hidden>
      {[34, 52, 74, 98, 130, 170].map((h) => (
        <span key={h} className="neo" style={{ height: h }} />
      ))}
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="flat-spacing pt-0">
      <div className="aig-container">
        <SectionHeading sub="Why Zaavi Technologies" center className="mb-8 md:mb-[70px]">
          AI with a Clear <br /> Business Purpose
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="benefits-box effectFade fadeUp">
              <Compare />
              <Content title="Business problem first" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="benefits-box effectFade fadeUp" data-delay="0.1">
              <Steps />
              <Content title="Proof before scale" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="benefits-box effectFade fadeUp">
              <Shield />
              <Content title="Secure by design" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="benefits-box effectFade fadeUp" data-delay="0.1">
              <Hub />
              <Content title="Built into your systems" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="benefits-box effectFade fadeUp">
              <Progress />
              <Content title="Measured results" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="benefits-box effectFade fadeUp" data-delay="0.1">
              <Grow />
              <Content title="Ready to scale and supported" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
