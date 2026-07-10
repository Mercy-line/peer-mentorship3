import React from "react";
import { TitleSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "./BackgroundMedia";
import SlideControls from "./SlideControls";

export const TitleSlide: React.FC<SlideProps<TitleSlideData>> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex = 0,
  totalSlides = 1,
}) => {
  return (
    <section
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-white/5 bg-[#12102a] text-ink transition-all duration-700 ${isActive ? "opacity-100" : "opacity-90"}`}
      style={{ "--accent": slide.accent, "--accent2": slide.accent2 } as React.CSSProperties}
    >
      <BackgroundMedia bgImage={slide.bgImage} />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        <div className="flex flex-col items-start w-full md:max-w-[55%] text-left">
          <div className={`relative z-10 font-mono tracking-[0.22em] text-[clamp(12px,1.1vw,15px)] text-[var(--accent)] font-bold mb-[22px] ${isActive ? "animate-fadeUp" : ""}`} style={isActive ? { animationDelay: "0.05s", textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined}>
            {slide.eyebrow}
          </div>
          <h1 className={`relative z-10 font-display font-bold text-[clamp(46px,8vw,108px)] leading-[0.98] tracking-[-0.015em] text-left max-w-[18ch] text-white [&_.glow]:glow-text ${isActive ? "animate-fadeUp" : ""}`} style={isActive ? { animationDelay: "0.15s", textShadow: "0 2px 10px rgba(0,0,0,0.5)" } : undefined} dangerouslySetInnerHTML={{ __html: slide.title }} />
          <div className={`relative z-10 mt-[22px] font-mono text-[clamp(13px,1.1vw,17px)] text-[#d1cbc4] tracking-[0.03em] text-left ${isActive ? "animate-fadeUp" : ""}`} style={isActive ? { animationDelay: "0.3s", textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined}>
            {slide.subtitle}
          </div>
          {prevSlide && nextSlide && (
            <SlideControls prevSlide={prevSlide} nextSlide={nextSlide} currentIndex={currentIndex} totalSlides={totalSlides} hasBg={true} />
          )}
        </div>
        <div className="relative z-10 mt-8 md:mt-0 md:translate-y-[50px] p-6 rounded-xl bg-[#b45309] shadow-[0_20px_50px_rgba(120,53,15,0.35)] max-w-[400px] text-left transition-all duration-700">
          <p className="font-display font-medium text-[clamp(16px,1.2vw,20px)] italic leading-relaxed text-white">
            "KamiLimu has made the lost girl find herself back"
          </p>
        </div>
      </div>
    </section>
  );
};
export default TitleSlide;
