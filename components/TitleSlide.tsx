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
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-white/5 bg-[#12102a] text-ink transition-all duration-700 ${
        isActive ? "opacity-100" : "opacity-90"
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
        
        {/* Left Column: Wordings & Controls */}
        <div className="flex flex-col items-start w-full md:max-w-[55%] text-left">
          {/* Eyebrow */}
          <div
            className={`relative z-10 font-mono tracking-[0.22em] text-[clamp(12px,1.1vw,15px)] text-[var(--accent)] font-bold mb-[22px] ${
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
            className={`relative z-10 font-display font-bold text-[clamp(46px,8vw,108px)] leading-[0.98] tracking-[-0.015em] text-left max-w-[18ch] text-white [&_.glow]:glow-text ${
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
            className={`relative z-10 mt-[22px] font-mono text-[clamp(13px,1.1vw,17px)] text-[#d1cbc4] tracking-[0.03em] text-left ${
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
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-white text-[#b45309] hover:bg-white/90 shadow-[0_8px_30px_rgba(120,53,15,0.18)] transition-all active:scale-90 cursor-pointer ${
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
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-[#b45309] text-white hover:bg-[#b45309]/90 shadow-[0_8px_30px_rgba(120,53,15,0.25)] transition-all active:scale-90 cursor-pointer ${
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

        {/* Right Column: Glassmorphic Quote Card with Pointer pointing to the group photo */}
        <div
          className="relative z-10 mt-8 md:mt-0 md:translate-y-[50px] p-6 rounded-xl bg-[#b45309] shadow-[0_20px_50px_rgba(120,53,15,0.35)] max-w-[400px] text-left transition-all duration-700 opacity-100 scale-100 translate-x-0"
        >
          <p className="font-display font-medium text-[clamp(16px,1.2vw,20px)] italic leading-relaxed text-white">
            "KamiLimu has made the lost girl find herself back"
          </p>

          {/* Curved Pointer Line commented out for now
          <div className="hidden md:block absolute top-[55%] right-[100%] w-[65px] h-[50px] pointer-events-none -translate-y-1/2 -mr-1">
            <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 65 50" fill="none">
              <path
                d="M65 25 C 45 25, 30 15, 18 15"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray="4 3"
              />
              <path
                d="M18 15 L 28 10 M 18 15 L 28 22"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="18" cy="15" r="4.5" fill="currentColor" className="animate-pulse" />
            </svg>
          </div>
          */}
        </div>

      </div>
    </section>
  );
};
export default TitleSlide;
