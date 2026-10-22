import Link from "next/link";
import { home } from "@/lib/content";
import { photos } from "@/lib/images";
import Photo from "./Photo";
import { QuoteMark, SectionHeading } from "./ui";

export default function About() {
  const { lead, body, approach } = home.intro;
  return (
    <section id="about" className="section-about flat-spacing">
      <div className="aig-container">
        <SectionHeading sub="Introduction" grad="grad-2">
          Intelligence That Works <br /> for Your Business.
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[7fr_5fr]">
          <div className="about-left">
            <div className="relative z-[5]">
              <div className="pill">
                <span className="dot" />
                Our approach
              </div>
              <h3 className="title h5 fw-semibold">{lead}</h3>
              <Link href="/contact" className="tf-btn">{home.hero.cta}</Link>
            </div>
            <div className="earth effectFade fadeRotateX" aria-hidden />
          </div>

          <div>
            <div className="review-box">
              <p className="desc body-1 fw-semibold">{body[0]}</p>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <ol className="steps">
                  {approach.map((a, i) => (
                    <li key={a} className="step">
                      <span className="n">{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ol>
                <div className="counter" aria-label={`${approach.length} steps`}>0{approach.length}</div>
              </div>
            </div>

            <div className="box-quotes effectFade fadeRotateX">
              <Photo photo={photos.teamCollab} className="image" sizes="(min-width: 768px) 160px, 100vw" />
              <div className="content">
                <QuoteMark />
                <p className="desc body-1 fw-semibold">{body[1]}</p>
                <div className="cite body-3">
                  <span className="fw-semibold">Zaavi Technologies</span>
                  <span className="bar" />
                  <span className="t-sec">Our promise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
