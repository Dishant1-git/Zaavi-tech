import Image from "next/image";
import { industries } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { industryPhotos } from "@/lib/images";
import Photo from "./Photo";
import { SectionHeading } from "./ui";

function Item({ ind, delay }: { ind: (typeof industries)[number]; delay?: number }) {
  return (
    <div className="features-item hover-zoom effectFade fadeUp" data-delay={delay}>
      {industryPhotos[ind.name] && <Photo photo={industryPhotos[ind.name]} sizes="(min-width: 1024px) 400px, 100vw" />}
      <span className="dark-tile"><Icon name={ind.icon} /></span>
      <h3 className="title h6 fw-semibold">{ind.name}</h3>
      <p className="t-sec">{ind.challenge}</p>
      <p className="help"><b>How Zaavi helps</b>{ind.help}</p>
    </div>
  );
}

export default function Industries() {
  const half = Math.ceil(industries.length / 2);
  return (
    <section id="industries" className="flat-spacing pt-0">
      <div className="aig-container">
        <SectionHeading sub="Industries" center className="mb-6 md:mb-16">
          AI Applied to Real <br /> Industry Challenges
        </SectionHeading>
      </div>
      <div className="relative">
        <div className="aig-container">
          <div className="features-wrap">
            <div className="features-col">
              {industries.slice(0, half).map((ind) => <Item key={ind.name} ind={ind} />)}
            </div>
            <div className="features-center">
              <Image src="/logo-light.png" alt="Zaavi Technologies" width={1000} height={352} className="h-auto w-full" />
            </div>
            <div className="features-col">
              {industries.slice(half).map((ind) => <Item key={ind.name} ind={ind} delay={0.1} />)}
            </div>
          </div>
        </div>
        <div className="side-line-main hidden lg:block" aria-hidden>
          <div className="aig-container">
            <div className="side-line-col">
              <div className="side-line-wrap">
                <div className="link-break-line">
                  <span className="item top" />
                  <span className="item bottom" />
                </div>
                <div className="link-break-center">
                  <span className="simu-electric left" />
                  <span className="simu-electric right" />
                </div>
                <div className="link-break-line right">
                  <span className="item top" />
                  <span className="item bottom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
