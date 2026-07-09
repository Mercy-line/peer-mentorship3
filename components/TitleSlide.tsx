import React from "react";
import { TitleSlideData } from "@/types/slide";

interface TitleSlideProps {
  slide: TitleSlideData;
  isActive: boolean;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide, isActive }) => {
  return (
    <section
      className={`absolute inset-0 z-10 flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[6vh] transition-all duration-700 ${
        isActive
          ? "opacity-100 pointer-events-auto animate-riseIn"
          : "opacity-0 pointer-events-none translate-y-[26px]"
      }`}
      style={{
        "--accent": slide.accent,
        "--accent2": slide.accent2,
      } as React.CSSProperties}
    >
      <div
        className={`font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.05s" } : undefined}
      >
        {slide.eyebrow}
      </div>

      <h1
        className={`font-display font-bold text-[clamp(46px,8vw,108px)] leading-[0.98] tracking-[-0.015em] [&_.glow]:glow-text ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.15s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />

      <div
        className={`mt-[22px] font-mono text-[clamp(13px,1.1vw,17px)] text-ink-dim tracking-[0.03em] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.3s" } : undefined}
      >
        {slide.subtitle}
      </div>

      <div className="flex flex-col-reverse gap-2 mt-12">
        {slide.stackColors.map((color, i) => (
          <div
            key={i}
            className={`rounded-[6px] ${isActive ? "animate-popIn" : ""}`}
            style={{
              width: `${60 + i * 40}px`,
              background: color,
              animationDelay: isActive ? `${0.5 + i * 0.1}s` : "0s",
              height: "10px",
            }}
          />
        ))}
      </div>
    </section>
  );
};
export default TitleSlide;
