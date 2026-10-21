import Marquee from "../Marquee";

/** Gradient band of service lines (the homepage trust strip; proof figures are added only once verified). */
export default function TrustStrip({ words }: { words: string[] }) {
  return (
    <div className="trust-strip relative z-10">
      <div className="rounded-br-[60px] bg-[linear-gradient(90deg,#1f8bff,#1565d8_50%,#0a3fb8)] py-6 sm:rounded-br-[80px]">
        <Marquee duration={28} className="[mask-image:none]">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="mx-7 flex items-center gap-7 font-ag text-[24px] font-extrabold tracking-[-0.02em] whitespace-nowrap text-white uppercase sm:text-[32px]">
              {w}
              <svg viewBox="0 0 100 100" className="h-5 w-5 fill-white/70" aria-hidden><path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" /></svg>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
