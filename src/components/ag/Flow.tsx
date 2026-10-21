import type { IconName } from "@/lib/content";
import Icon from "./icons";

/** "How it works" diagram for a service page (Part 10): input → Zaavi solution → outcome. */
export default function Flow({ steps, icon }: { steps: [string, string, string]; icon: IconName }) {
  const icons: IconName[] = ["doc", icon, "target"];
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_50%_50%,rgba(31,139,255,0.4),transparent_70%)] blur-2xl" />
      <div className="relative rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-6 font-ag text-[11px] font-bold tracking-[0.22em] text-[#7cc4ff] uppercase">How it works</div>
        <ol className="relative">
          {steps.map((s, i) => (
            <li key={s} className="relative flex items-center gap-5 pb-10 last:pb-0">
              {i < steps.length - 1 && (
                <span className="absolute top-14 left-7 h-[calc(100%-3.5rem)] w-[2px] overflow-hidden bg-white/10">
                  <span className="absolute inset-x-0 h-6 animate-[flow-drop_1.8s_linear_infinite] bg-[linear-gradient(180deg,transparent,#7cc4ff)]" style={{ animationDelay: `${i * 0.6}s` }} />
                </span>
              )}
              <span className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${i === 1 ? "bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] text-white shadow-[0_0_40px_rgba(31,139,255,0.6)]" : "border border-white/15 bg-white/10 text-[#7cc4ff]"}`}>
                <Icon name={icons[i]} className="h-6 w-6" />
              </span>
              <div>
                <div className="font-ag text-[11px] font-bold tracking-[0.15em] text-white/45 uppercase">{["Input", "Zaavi solution", "Outcome"][i]}</div>
                <div className="mt-1 font-ag text-[17px] font-bold text-white">{s}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
