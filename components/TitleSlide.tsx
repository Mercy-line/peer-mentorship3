import React from "react";
import { TitleSlideData } from "@/types/slide";

interface TitleSlideProps {
  slide: TitleSlideData;
  isActive: boolean;
  prevSlide?: () => void;
  nextSlide?: () => void;
  currentIndex?: number;
  totalSlides?: number;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex,
  totalSlides,
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

      {/* Eyebrow */}
      <div
        className={`relative z-10 font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={
          isActive
            ? {
                animationDelay: "0.05s",
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }
            : undefined
        }
      >
        {slide.eyebrow}
      </div>

      {/* Headline */}
      <h1
        className={`relative z-10 font-display font-bold text-[clamp(46px,8vw,108px)] leading-[0.98] tracking-[-0.015em] text-left max-w-[18ch] [&_.glow]:glow-text ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={
          isActive
            ? {
                animationDelay: "0.15s",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }
            : undefined
        }
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />

      {/* Subtitle */}
      <div
        className={`relative z-10 mt-[22px] font-mono text-[clamp(13px,1.1vw,17px)] text-ink-dim tracking-[0.03em] text-left ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={
          isActive
            ? {
                animationDelay: "0.3s",
                textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }
            : undefined
        }
      >
        {slide.subtitle}
      </div>

      {/* Stack blocks (left-aligned) */}
      <div className="relative z-10 flex flex-col-reverse items-start gap-2 mt-8">
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

      {/* Arrow navigation controller immediately after content on the left */}
      {prevSlide && nextSlide && typeof currentIndex === "number" && typeof totalSlides === "number" && (
        <div className="relative z-20 flex items-center gap-[14px] mt-8 pointer-events-auto">
          {/* Back Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={currentIndex === 0}
            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-md cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/20 ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
            }`}
            aria-label="Previous Slide"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="font-mono text-[12px] tracking-[0.05em] select-none min-w-[50px] text-center text-[#9a93c9]">
            <b className="text-[#f4f2ff]">{currentIndex + 1}</b> / {totalSlides}
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={currentIndex === totalSlides - 1}
            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-lg cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/20 ${
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
    </section>
  );
};
export default TitleSlide;
