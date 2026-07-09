import React from "react";
import { ContentSlideData } from "@/types/slide";

interface ContentSlideProps {
  slide: ContentSlideData;
  isActive: boolean;
}

export const ContentSlide: React.FC<ContentSlideProps> = ({
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
      {/* Background Media */}
      {slide.bgVideo ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            src={slide.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#12102a]/70 backdrop-blur-[1px]" />
        </div>
      ) : slide.bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#12102a]/70 backdrop-blur-[1px]" />
        </div>
      ) : null}

      {/* Big Slide Number in Background */}
      <div
        className={`absolute right-[7vw] top-[8vh] font-mono text-[clamp(60px,9vw,150px)] font-bold text-ink opacity-[0.07] line-height-none select-none z-10 ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.05s" } : undefined}
      >
        {slide.bignum}
      </div>

      {/* Eyebrow header */}
      <div
        className={`relative z-10 font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.08s" } : undefined}
      >
        {slide.eyebrow}
      </div>

      {/* Main Headline */}
      <h1
        className={`relative z-10 font-display font-bold text-[clamp(38px,6.4vw,84px)] leading-[1.02] tracking-[-0.01em] max-w-[16ch] text-ink ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.16s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />

      {/* Description / Subtext */}
      <div
        className={`relative z-10 font-mono text-[clamp(12px,1vw,14px)] text-ink-dim mt-[14px] tracking-[0.02em] [&_b]:text-ink ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.24s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.who }}
      />

      {/* Keyword Chips */}
      <div
        className={`relative z-10 flex flex-wrap gap-[12px] mt-[36px] max-w-full sm:max-w-[60vw] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.32s" } : undefined}
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

      {/* Tagline quote */}
      <div
        className={`relative z-10 mt-[44px] font-display font-semibold text-[clamp(18px,1.7vw,26px)] text-ink max-w-[34ch] border-l-3 border-[var(--accent)] pl-[18px] [&_span]:text-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.4s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.tagline }}
      />
    </section>
  );
};
export default ContentSlide;
