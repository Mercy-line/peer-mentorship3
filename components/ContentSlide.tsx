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
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <section
      className={`absolute inset-0 z-10 flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[6vh] transition-all duration-700 ${
        hasBg ? "text-ink" : "bg-white text-[#12102a]"
      } ${
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

      {/* Split Row Container */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        
        {/* Left Column: Wordings */}
        <div className="flex flex-col items-start w-full md:max-w-[55%] text-left">
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
            className={`relative z-10 font-display font-bold text-[clamp(38px,6.4vw,84px)] leading-[1.02] tracking-[-0.01em] max-w-[16ch] ${
              hasBg ? "text-ink" : "text-[#12102a]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.16s" } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {/* Description / Subtext */}
          <div
            className={`relative z-10 font-mono text-[clamp(12px,1vw,14px)] mt-[14px] tracking-[0.02em] ${
              hasBg ? "text-ink-dim [&_b]:text-ink" : "text-[#475569] [&_b]:text-[#12102a]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.24s" } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.who }}
          />

          {/* Keyword Chips */}
          <div
            className={`relative z-10 flex flex-wrap gap-[12px] mt-[36px] max-w-full ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.32s" } : undefined}
          >
            {slide.keywords.map((kw, i) => (
              <span
                key={i}
                className={`font-mono text-[clamp(12px,0.95vw,15px)] px-[18px] py-[10px] rounded-[100px] whitespace-nowrap shadow-sm ${
                  kw.strong
                    ? "text-white font-bold border-none"
                    : hasBg
                    ? "bg-white/10 text-ink border-none"
                    : "bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]"
                }`}
                style={
                  kw.strong
                    ? {
                        backgroundColor: "var(--accent)",
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
            className={`relative z-10 mt-[44px] font-display font-semibold text-[clamp(18px,1.7vw,26px)] max-w-[34ch] border-l-3 border-[var(--accent)] pl-[18px] ${
              hasBg ? "text-ink [&_span]:text-[var(--accent)]" : "text-[#12102a] [&_span]:text-[var(--accent)]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.4s" } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.tagline }}
          />
        </div>

        {/* Right Column: Page Image (Inline Integrated, NOT FLOATING OVERLAY) */}
        {slide.contentImages && slide.contentImages.length > 0 && (
          <div
            className={`w-full md:w-[38vw] max-w-[420px] aspect-[4/3] rounded-2xl border bg-[#1a1640]/5 p-2 shadow-2xl backdrop-blur-md transition-all duration-700 ${
              hasBg ? "border-line bg-[#1a1640]/40" : "border-black/5 bg-[#0ea5e9]/5"
            } ${
              isActive
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 translate-x-8 pointer-events-none"
            }`}
            style={
              isActive
                ? {
                    boxShadow: hasBg
                      ? `0 20px 40px -15px var(--accent2), 0 0 30px -10px var(--accent)`
                      : `0 20px 40px -15px rgba(14,165,233,0.15)`,
                    transitionDelay: "0.45s",
                  }
                : undefined
            }
          >
            <img
              src={slide.contentImages[0]}
              alt="Slide Illustration"
              className="w-full h-full object-cover rounded-xl border border-white/5"
            />
          </div>
        )}

      </div>
    </section>
  );
};
export default ContentSlide;
