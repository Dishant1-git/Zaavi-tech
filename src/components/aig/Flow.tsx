import type { IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";

/** "How it works" diagram for a service page: input → Zaavi solution → outcome. */
export default function Flow({ steps, icon }: { steps: [string, string, string]; icon: IconName }) {
  const icons: IconName[] = ["doc", icon, "target"];
  return (
    <div className="flow-card mx-auto w-full max-w-[480px]">
      <div className="heading-sub mb-8">How it works</div>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            {i < steps.length - 1 && <span className="rail" style={{ ["--d" as string]: `${i * 0.6}s` }} />}
            <span className={i === 1 ? "brand-tile" : "step-ic neo"}><Icon name={icons[i]} /></span>
            <div>
              <div className="lbl">{["Input", "Zaavi solution", "Outcome"][i]}</div>
              <div className="h6 fw-semibold mt-1">{s}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
