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
      {/* Background Media */}
      {slide.bgVideo ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            src={slide.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #000000f0 0%, #000000c0 30%, #00000040 70%, transparent 100%)",
            }}
          />
        </div>
      ) : slide.bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #000000f0 0%, #000000c0 30%, #00000040 70%, transparent 100%)",
            }}
          />
        </div>
      ) : null}

      {/* Centered Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[850px] mx-auto">
        
        {/* Eyebrow */}
        <div
          className={`relative z-10 font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center justify-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] after:content-[''] after:w-[26px] after:h-[2px] after:bg-[var(--accent)] ${
            isActive ? "animate-fadeUp" : ""
          }`}
          style={isActive ? { animationDelay: "0.05s" } : undefined}
        >
          {slide.eyebrow}
        </div>

        {/* Main Headline */}
        <h1
          className={`relative z-10 font-display font-bold text-[clamp(34px,5.4vw,72px)] leading-[1.02] tracking-[-0.01em] text-ink ${
            isActive ? "animate-fadeUp" : ""
          }`}
          style={isActive ? { animationDelay: "0.15s" } : undefined}
          dangerouslySetInnerHTML={{ __html: slide.title }}
        />

        {/* Closing Stack Summary (Chips) */}
        <div
          className={`relative z-10 flex flex-wrap justify-center gap-[12px] mt-[32px] max-w-full ${
            isActive ? "animate-fadeUp" : ""
          }`}
          style={isActive ? { animationDelay: "0.25s" } : undefined}
        >
          {slide.keywords.map((kw, i) => (
            <span
              key={i}
              className={`relative z-10 font-mono text-[clamp(12px,0.95vw,15px)] font-medium px-[18px] py-[10px] rounded-[100px] border whitespace-nowrap ${
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
          className={`relative z-10 mt-[26px] font-mono text-[14px] text-ink-dim ${
            isActive ? "animate-fadeUp" : ""
          }`}
          style={isActive ? { animationDelay: "0.35s" } : undefined}
        >
          {slide.thanks}
        </div>

        {/* Integrated cards side-by-side, NOT stacked overlapping */}
        {slide.contentImages && slide.contentImages.length > 0 && (
          <div
            className={`flex flex-row justify-center items-center gap-[24px] mt-[36px] w-full max-w-[620px] transition-all duration-700 ${
              isActive
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-8 pointer-events-none"
            }`}
            style={isActive ? { transitionDelay: "0.4s" } : undefined}
          >
            {/* Card 1 */}
            <div
              className="w-[45%] aspect-[4/3] rounded-2xl border border-line bg-[#1a1640]/40 p-2 shadow-2xl backdrop-blur-md"
              style={{
                boxShadow: `0 15px 35px -10px var(--accent2)`,
              }}
            >
              <img
                src={slide.contentImages[0]}
                alt="Emphasis 1"
                className="w-full h-full object-cover rounded-xl border border-white/5"
              />
            </div>

            {/* Card 2 */}
            {slide.contentImages.length > 1 && (
              <div
                className="w-[45%] aspect-[4/3] rounded-2xl border border-line bg-[#1a1640]/40 p-2 shadow-2xl backdrop-blur-md"
                style={{
                  boxShadow: `0 15px 35px -10px var(--accent2), 0 0 20px -8px var(--accent)`,
                }}
              >
                <img
                  src={slide.contentImages[1]}
                  alt="Emphasis 2"
                  className="w-full h-full object-cover rounded-xl border border-white/5"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default ClosingSlide;
