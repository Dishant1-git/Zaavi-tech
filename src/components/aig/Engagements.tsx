import { engagements, type IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { SectionHeading } from "./ui";

const icons: IconName[] = ["compass", "flask", "rocket", "refresh"];

/** "Ways to work with us" on the template's black panel, in its awards-row layout. */
export default function Engagements() {
  return (
    <div className="box-black">
      <div className="light-box" />
      <span className="light-line top" />
      <span className="light-line bot" />
      <section className="flat-spacing relative">
        <div className="aig-container">
          <SectionHeading sub="Ways to work with us" center dark className="mb-8 md:mb-16">
            Start Small. <br /> Scale Fast.
          </SectionHeading>
          <div className="awards-list">
            {engagements.map((e, i) => (
              <div key={e.title} className="awards-item effectFade fadeUp" data-delay={i * 0.1}>
                <div className="c-icon"><span className="ic"><Icon name={icons[i]} /></span></div>
                <div className="c-title body-1 fw-semibold text-white">{e.title}</div>
                <div className="c-text body-1 text-white"><b>Best for</b>{e.bestFor}</div>
                <div className="c-text body-1 text-white"><b>Outcome</b>{e.outcome}</div>
                <div className="c-year body-1 t-n400">/ {String(i + 1).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
