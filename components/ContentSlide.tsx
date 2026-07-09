import React from "react";
import { ContentSlideData } from "@/types/slide";

interface ContentSlideProps {
  slide: ContentSlideData;
  isActive: boolean;
  prevSlide?: () => void;
  nextSlide?: () => void;
  currentIndex?: number;
  totalSlides?: number;
}

export const ContentSlide: React.FC<ContentSlideProps> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex,
  totalSlides,
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
            className="w-full h-full object-cover opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 75%, transparent 100%)",
            }}
          />
        </div>
      ) : slide.bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 75%, transparent 100%)",
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
            style={
              isActive
                ? {
                    animationDelay: "0.08s",
                    textShadow: hasBg ? "0 2px 6px rgba(0,0,0,0.4)" : undefined,
                  }
                : undefined
            }
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
            style={
              isActive
                ? {
                    animationDelay: "0.16s",
                    textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined,
                  }
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {/* Description / Subtext */}
          <div
            className={`relative z-10 font-mono text-[clamp(12px,1vw,14px)] mt-[14px] tracking-[0.02em] ${
              hasBg ? "text-ink-dim [&_b]:text-ink" : "text-[#475569] [&_b]:text-[#12102a]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={
              isActive
                ? {
                    animationDelay: "0.24s",
                    textShadow: hasBg ? "0 2px 6px rgba(0,0,0,0.4)" : undefined,
                  }
                : undefined
            }
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
            style={
              isActive
                ? {
                    animationDelay: "0.4s",
                    textShadow: hasBg ? "0 2px 8px rgba(0,0,0,0.5)" : undefined,
                  }
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: slide.tagline }}
          />

          {/* Arrow navigation controller immediately after content on the left */}
          {prevSlide && nextSlide && typeof currentIndex === "number" && typeof totalSlides === "number" && (
            <div className="relative z-20 flex items-center gap-[14px] mt-[20px] pointer-events-auto">
              {/* Back Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                disabled={currentIndex === 0}
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-md cursor-pointer ${
                  hasBg
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    : "border-[#cbd5e1] bg-[#f8fafc] text-[#12102a] hover:bg-[#e2e8f0] hover:text-[#0ea5e9]"
                } ${
                  currentIndex === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                }`}
                aria-label="Previous Slide"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Counter */}
              <div
                className={`font-mono text-[12px] tracking-[0.05em] select-none min-w-[50px] text-center transition-colors duration-500 ${
                  hasBg ? "text-[#9a93c9]" : "text-[#475569]"
                }`}
              >
                <b className={hasBg ? "text-[#f4f2ff]" : "text-[#12102a]"}>{currentIndex + 1}</b> / {totalSlides}
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                disabled={currentIndex === totalSlides - 1}
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-lg cursor-pointer ${
                  hasBg
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                    : "border-[#cbd5e1] bg-[#f8fafc] text-[#12102a] hover:bg-[#e2e8f0] hover:text-[#0ea5e9]"
                } ${
                  currentIndex === totalSlides - 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
                }`}
                aria-label="Next Slide"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Page Image (Inline Integrated, NOT FLOATING OVERLAY) */}
        {slide.contentImages && slide.contentImages.length > 0 && (
          <div
            className={`w-full md:w-[44vw] max-w-[500px] aspect-[4/3] rounded-xl border overflow-hidden shadow-2xl transition-all duration-700 ${
              hasBg ? "border-white/10" : "border-black/10"
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
                      : `0 20px 40px -15px rgba(14,165,233,0.08)`,
                    transitionDelay: "0.45s",
                  }
                : undefined
            }
          >
            <img
              src={slide.contentImages[0]}
              alt="Slide Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        )}

      </div>
    </section>
  );
};
export default ContentSlide;
