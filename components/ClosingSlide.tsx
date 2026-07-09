import React from "react";
import { ClosingSlideData } from "@/types/slide";

interface ClosingSlideProps {
  slide: ClosingSlideData;
  isActive: boolean;
  prevSlide?: () => void;
  nextSlide?: () => void;
  currentIndex?: number;
  totalSlides?: number;
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({
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
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-black/5 transition-all duration-700 ${
        hasBg
          ? "bg-[#181615] text-white"
          : "bg-white text-[var(--ink)]"
      } ${
        isActive ? "opacity-100" : "opacity-95"
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
          {/* Eyebrow */}
          <div
            className={`relative z-10 font-mono tracking-[0.22em] text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold mb-[18px] ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={
              isActive
                ? {
                    animationDelay: "0.05s",
                    textShadow: hasBg ? "0 2px 6px rgba(0,0,0,0.4)" : undefined,
                  }
                : undefined
            }
          >
            {slide.eyebrow}
          </div>

          {/* Main Headline */}
          <h1
            className={`relative z-10 font-display font-bold text-[clamp(34px,5.4vw,72px)] leading-[1.02] tracking-[-0.01em] ${
              hasBg ? "text-white" : "text-[var(--ink)]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={
              isActive
                ? {
                    animationDelay: "0.15s",
                    textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined,
                  }
                : undefined
            }
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {/* Closing Stack Summary (Chips) */}
          <div
            className={`relative z-10 flex flex-wrap gap-[12px] mt-[32px] max-w-full ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.25s" } : undefined}
          >
            {slide.keywords.map((kw, i) => (
              <span
                key={i}
                className="relative z-10 font-mono text-[clamp(12px,0.95vw,15px)] px-[18px] py-[10px] rounded-[100px] whitespace-nowrap shadow-md bg-[#b45309] text-white font-semibold border-none"
              >
                {kw.text}
              </span>
            ))}
          </div>

          {/* Thanks message */}
          <div
            className={`relative z-10 mt-[26px] font-mono text-[14px] ${
              hasBg ? "text-[#d1cbc4]" : "text-[var(--ink-dim)]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={
              isActive
                ? {
                    animationDelay: "0.35s",
                    textShadow: hasBg ? "0 2px 6px rgba(0,0,0,0.4)" : undefined,
                  }
                : undefined
            }
          >
            {slide.thanks}
          </div>

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
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-white text-[#12102a] hover:bg-white/90 shadow-xl transition-all active:scale-90 cursor-pointer ${
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
                className={`font-mono text-[12px] tracking-[0.05em] select-none min-w-[50px] text-center ${
                  hasBg ? "text-[#d1cbc4]" : "text-[var(--ink-dim)]"
                }`}
              >
                <b className={hasBg ? "text-white" : "text-[var(--ink)]"}>{currentIndex + 1}</b> / {totalSlides}
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                disabled={currentIndex === totalSlides - 1}
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-white text-[#12102a] hover:bg-white/90 shadow-xl transition-all active:scale-90 cursor-pointer ${
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

        {/* Right Column: Large Single Card or side-by-side cards */}
        {slide.contentImages && slide.contentImages.length > 0 && (
          slide.contentImages.length === 1 ? (
            <div
              className={`w-full md:w-[44vw] max-w-[500px] aspect-[4/3] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-700 ${
                isActive
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-95 translate-x-8 pointer-events-none"
              }`}
              style={
                isActive
                  ? {
                      boxShadow: `0 20px 40px -15px var(--accent2), 0 0 30px -10px var(--accent)`,
                      transitionDelay: "0.4s",
                    }
                  : undefined
              }
            >
              <img
                src={slide.contentImages[0]}
                alt="Emphasis 1"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`flex flex-row justify-center items-center gap-[16px] w-full md:w-[44vw] max-w-[540px] transition-all duration-700 ${
                isActive
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-95 translate-x-8 pointer-events-none"
              }`}
              style={isActive ? { transitionDelay: "0.4s" } : undefined}
            >
              {/* Card 1 */}
              <div
                className={`w-[48%] aspect-[3/4] rounded-xl border overflow-hidden shadow-2xl ${
                  hasBg ? "border-white/10" : "border-black/5"
                }`}
                style={{
                  boxShadow: `0 15px 35px -10px var(--accent2)`,
                }}
              >
                <img
                  src={slide.contentImages[0]}
                  alt="Emphasis 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card 2 */}
              <div
                className={`w-[48%] aspect-[3/4] rounded-xl border overflow-hidden shadow-2xl ${
                  hasBg ? "border-white/10" : "border-black/5"
                }`}
                style={{
                  boxShadow: `0 15px 35px -10px var(--accent2), 0 0 20px -8px var(--accent)`,
                }}
              >
                <img
                  src={slide.contentImages[1]}
                  alt="Emphasis 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )
        )}

      </div>
    </section>
  );
};
export default ClosingSlide;
