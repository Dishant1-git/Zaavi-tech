import { home } from "@/lib/content";
import { Sparkles } from "./ui";

/** Service-line ticker in the slot the template uses for client logos (logos only once verified). */
export default function Partner() {
  const row = [...home.trust, ...home.trust];
  return (
    <div className="aig-container">
      <div className="partner-wrap">
        <p className="label t-sec fw-semibold">What we <br className="hidden md:block" /> deliver</p>
        <div className="partner-track">
          <div className="partner-row">
            {[...row, ...row].map((w, i) => (
              <span key={i} aria-hidden={i >= home.trust.length || undefined}>
                {w}
                <Sparkles />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
