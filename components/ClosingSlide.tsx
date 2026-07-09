import React from "react";
import { ClosingSlideData } from "@/types/slide";

interface ClosingSlideProps {
  slide: ClosingSlideData;
  isActive: boolean;
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({
  slide,
  isActive,
}) => {
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
      {/* Eyebrow */}
      <div
        className={`font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.05s" } : undefined}
      >
        {slide.eyebrow}
      </div>

      {/* Main Headline */}
      <h1
        className={`font-display font-bold text-[clamp(34px,5.4vw,72px)] leading-[1.02] tracking-[-0.01em] max-w-[20ch] text-ink ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.15s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />

      {/* Closing Stack Summary (Chips) */}
      <div
        className={`flex flex-wrap gap-[12px] mt-[36px] max-w-full sm:max-w-[60vw] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.25s" } : undefined}
      >
        {slide.keywords.map((kw, i) => (
          <span
            key={i}
            className={`font-mono text-[clamp(12px,0.95vw,15px)] font-medium px-[18px] py-[10px] rounded-[100px] border whitespace-nowrap ${
              kw.strong
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--line)] bg-white/3 text-ink"
            }`}
            style={
              kw.strong
                ? {
                    backgroundColor:
                      "color-mix(in srgb, var(--accent) 12%, transparent)",
                  }
                : undefined
            }
          >
            {kw.text}
          </span>
        ))}
      </div>

      {/* Thanks message */}
      <div
        className={`mt-[30px] font-mono text-[14px] text-ink-dim ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.35s" } : undefined}
      >
        {slide.thanks}
      </div>
    </section>
  );
};
export default ClosingSlide;
