import Link from "next/link";
import { categories } from "@/lib/content";
import Icon from "./icons";
import { Arrow, container } from "./ui";

/** Every service with its description, grouped A–F (Part 3). */
export default function ServiceGrid() {
  return (
    <section className="relative pt-24 pb-10">
      <div className={`${container} space-y-20`}>
        {categories.map((c) => (
          <div key={c.letter} id={`cat-${c.letter}`} className="scroll-mt-28">
            <div data-reveal="up" className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] font-ag text-2xl font-extrabold text-white">{c.letter}</span>
              <h2 className="font-ag text-[28px] font-extrabold tracking-[-0.02em] text-ag-dark sm:text-[36px]">{c.name}</h2>
              <span className="hidden h-px flex-1 bg-ag-border sm:block" />
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {c.services.map((s) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ag-light text-ag-base transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <span className="font-ag text-4xl font-extrabold text-ag-light transition-colors group-hover:text-[#dbeafe]">{String(s.n).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 font-ag text-xl font-bold text-ag-dark">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.8] font-medium text-ag-text">{s.copy}</p>
                    {s.href && (
                      <span className="mt-5 inline-flex items-center gap-2 font-ag text-sm font-bold text-ag-base">
                        Learn more <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </>
                );
                const cls = "group flex h-full flex-col rounded-[22px] border border-ag-border bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.45)]";
                return s.href ? (
                  <Link key={s.n} href={s.href} data-reveal="up" className={cls}>{inner}</Link>
                ) : (
                  <div key={s.n} data-reveal="up" className={cls}>{inner}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
