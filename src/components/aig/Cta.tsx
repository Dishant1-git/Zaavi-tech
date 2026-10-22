import Link from "next/link";
import type { IconName } from "@/lib/content";
import Icon from "@/components/ag/icons";
import { SectionHeading } from "./ui";

/* Floating tiles around the closing call to action; each keeps its tilt and scales up on scroll. */
const tiles: { icon: IconName; grow: number }[] = [
  { icon: "spark", grow: 30 },
  { icon: "chat", grow: -12 },
  { icon: "chart", grow: -15 },
  { icon: "workflow", grow: -15 },
  { icon: "cloud", grow: 15 },
  { icon: "brain", grow: 30 },
];

export default function Cta({ title, body, cta, href = "/contact", sub = "Get started" }: { title: string; body?: string; cta: string; href?: string; sub?: string }) {
  return (
    <section className="section-tools">
      {tiles.map((t, i) => (
        <span key={t.icon} className={`float f${i + 1}`} data-grow={t.grow} aria-hidden>
          <Icon name={t.icon} />
        </span>
      ))}
      <div className="aig-container">
        <div className="mx-auto max-w-[540px] text-center">
          <SectionHeading sub={sub} center className="mb-6 md:mb-12">{title}</SectionHeading>
          {body && <p className="text effectFade fadeUp">{body}</p>}
          <Link href={href} className="tf-btn effectFade fadeRotateX">{cta}</Link>
        </div>
      </div>
    </section>
  );
}
