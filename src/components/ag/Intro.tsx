import { home } from "@/lib/content";
import { container, Eyebrow } from "./ui";

export default function Intro() {
  const { lead, body, approach } = home.intro;
  return (
    <section className="relative overflow-hidden pt-24 pb-24 lg:pt-32">
      <div className={`${container} grid gap-14 lg:grid-cols-[1.2fr_1fr]`}>
        <div>
          <Eyebrow>Introduction</Eyebrow>
          <h2 data-split className="font-ag text-[34px] leading-[1.2] font-extrabold tracking-[-0.02em] text-ag-dark sm:text-[46px] lg:text-[54px]">
            Intelligence That{" "}
            <span className="inline-block rounded-full bg-[linear-gradient(90deg,#1f8bff,#1a73e8)] px-5 leading-[1.25] text-white">Works</span>{" "}
            for Your Business.
          </h2>
          <p className="intro-lead mt-8 font-ag text-xl leading-[1.5] font-bold text-ag-base">{lead}</p>
        </div>
        <div className="space-y-6 lg:pt-14">
          {body.map((p) => (
            <p key={p} data-reveal="left" className="text-[16px] leading-[1.9] font-medium text-ag-text">{p}</p>
          ))}
        </div>
      </div>

      {/* Approach strip */}
      <div className={`${container} mt-16`}>
        <div className="ap-panel relative overflow-hidden rounded-[30px] bg-[linear-gradient(120deg,#0b1f5c,#0a3fb8)] px-6 py-10 sm:px-12">
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(124,196,255,0.25)_1.5px,transparent_1.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_100%_50%,black,transparent_70%)]" />
          <div className="relative mb-6 font-ag text-xs font-bold tracking-[0.25em] text-[#7cc4ff] uppercase">Our approach</div>
          <ol className="relative grid gap-6 md:grid-cols-3">
            {approach.map((a, i) => (
              <li key={a} className="ap-step flex items-center gap-4">
                <span className="ap-num grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 font-ag text-lg font-extrabold text-white">0{i + 1}</span>
                <span className="ap-text font-ag text-xl font-bold text-white">{a}</span>
                {i < approach.length - 1 && (
                  <svg viewBox="0 0 40 16" className="ap-arrow ml-auto hidden h-4 w-10 text-[#7cc4ff] md:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M0 8h36m0 0-6-6m6 6-6 6" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
