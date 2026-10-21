import { reasons } from "@/lib/content";
import { ArtTile, Tube } from "./art";
import Icon from "./icons";
import { container, Eyebrow, Heading, notch } from "./ui";

export default function WhyZaavi() {
  return (
    <section className="relative overflow-hidden pt-28 pb-28 lg:pt-36">
      <div className={`${container} grid items-start gap-16 lg:grid-cols-[0.8fr_1.4fr]`}>
        <div className="relative lg:sticky lg:top-32" data-reveal="right">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]" style={notch(80)}>
            <div className="why-cover absolute inset-0 z-10 origin-top bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)]" />
            <div data-parallax-inner className="h-[120%] w-full">
              <ArtTile variant={3} seed={77} />
            </div>
          </div>
          <div className="why-quote absolute right-6 bottom-6 left-6 z-20 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <div className="font-ag text-lg font-bold text-white">Practical AI, connected to your systems and proven before it scales.</div>
          </div>
          <Tube shape="hook" data-parallax="-80" className="pointer-events-none absolute -bottom-20 -left-16 w-[260px]" width={64} />
        </div>

        <div>
          <Eyebrow>Why Zaavi Technologies</Eyebrow>
          <Heading>AI with a Clear Business Purpose</Heading>
          <div className="why-grid mt-12 grid gap-5 [perspective:1200px] sm:grid-cols-2">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="why-card group relative rounded-[22px] border border-ag-border bg-white p-7 transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_25px_50px_-25px_rgba(10,63,184,0.45)]"
              >
                <div className="flex items-center justify-between">
                  <span className="why-icon grid h-14 w-14 place-items-center rounded-full bg-ag-light text-ag-base transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] group-hover:text-white">
                    <Icon name={r.icon} className="h-6 w-6" />
                  </span>
                  <span className="why-num font-ag text-4xl font-extrabold text-ag-light transition-colors duration-500 group-hover:text-[#dbeafe]">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-ag text-xl font-bold text-ag-dark">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] font-medium text-ag-text">{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
