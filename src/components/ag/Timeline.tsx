import { container, Eyebrow, Heading } from "./ui";

type Item = { title: string; rows: { label?: string; text: string }[] };

/** Horizontal numbered cards joined by a gradient line (engagement models, "How we engage"). */
export default function Timeline({ eyebrow, title, items, intro }: { eyebrow: string; title: string; items: Item[]; intro?: string }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 lg:pt-32">
      <div className={container}>
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow center>{eyebrow}</Eyebrow>
          <Heading center>{title}</Heading>
          {intro && <p data-reveal="up" className="mt-6 leading-[1.8] font-medium text-ag-text">{intro}</p>}
        </div>
        <div className="relative mt-16">
          <div className="tl-line absolute top-8 right-[12%] left-[12%] hidden h-[2px] origin-left bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)] lg:block" />
          <ol className={`tl-list relative grid gap-6 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {items.map((it, i) => (
              <li key={it.title} data-reveal="up" className="tl-item group text-center">
                <span className="tl-dot relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] font-ag text-lg font-extrabold text-white shadow-[0_10px_30px_-10px_rgba(31,139,255,0.8)] transition-[scale] duration-500 group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-6 h-[calc(100%-5.5rem)] rounded-[22px] border border-ag-border bg-white p-7 text-left transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.4)]">
                  <h3 className="font-ag text-xl font-bold text-ag-dark">{it.title}</h3>
                  {it.rows.map((r) => (
                    <div key={r.text} className="mt-4">
                      {r.label && <div className="font-ag text-[11px] font-bold tracking-[0.15em] text-ag-base uppercase">{r.label}</div>}
                      <p className="mt-1 text-[15px] leading-[1.7] font-medium text-ag-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
