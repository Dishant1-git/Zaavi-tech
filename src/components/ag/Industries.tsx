import { industries } from "@/lib/content";
import Icon from "./icons";
import { container, Eyebrow, Heading } from "./ui";

export default function Industries() {
  return (
    <section id="industries" className="relative -mt-[120px] bg-[linear-gradient(120deg,#e9f0fb,#e3eefc_45%,#eef4fb_70%,#e8eefb)] pt-[220px] pb-28">
      <div className={container}>
        <div className="mx-auto max-w-[640px] text-center">
          <Eyebrow center>Industries</Eyebrow>
          <Heading center>AI Applied to Real Industry Challenges</Heading>
        </div>
        <div className="ind-grid mt-16 grid gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="ind-card group relative overflow-hidden rounded-[22px] bg-white p-7 shadow-[0_20px_50px_-35px_rgba(13,26,66,0.5)] transition-[translate] duration-500 hover:-translate-y-1.5"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)] transition-transform duration-500 group-hover:scale-x-100" />
              <span className="ind-icon grid h-12 w-12 place-items-center rounded-xl bg-ag-light text-ag-base transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                <Icon name={ind.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-ag text-lg font-bold text-ag-dark">{ind.name}</h3>
              <div className="mt-4 font-ag text-[11px] font-bold tracking-[0.15em] text-ag-gray uppercase">Common challenge</div>
              <p className="mt-1 text-[14px] leading-[1.65] font-medium text-ag-text">{ind.challenge}</p>
              <div className="my-4 flex items-center gap-2 text-ag-base">
                <span className="h-px flex-1 bg-ag-border" />
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 2v12m0 0-4-4m4 4 4-4" /></svg>
                <span className="h-px flex-1 bg-ag-border" />
              </div>
              <div className="font-ag text-[11px] font-bold tracking-[0.15em] text-ag-base uppercase">How Zaavi helps</div>
              <p className="mt-1 text-[14px] leading-[1.65] font-semibold text-ag-dark">{ind.help}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
