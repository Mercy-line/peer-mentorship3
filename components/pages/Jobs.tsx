import React from "react";
import { ContentSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "@/components/BackgroundMedia";
import SlideControls from "@/components/SlideControls";
import KeywordChips from "@/components/KeywordChips";
import SlideImages from "@/components/SlideImages";

export const Jobs: React.FC<SlideProps<ContentSlideData>> = ({
  slide,
  isActive,
  prevSlide,
  nextSlide,
  currentIndex = 0,
  totalSlides = 1,
}) => {
  const hasBg = !!slide.bgImage;
  const fadeUp = isActive ? "animate-fadeUp" : "";
  const shadow = isActive && hasBg ? { textShadow: "0 2px 6px rgba(0,0,0,0.4)" } : undefined;

  return (
    <section
      id={`slide-${currentIndex}`}
      className={`relative w-full min-h-screen flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[12vh] border-b border-black/5 transition-all duration-700 ${hasBg ? "bg-[#181615] text-white" : "bg-white text-[var(--ink)]"} ${isActive ? "opacity-100" : "opacity-95"}`}
      style={{ "--accent": slide.accent, "--accent2": slide.accent2 } as React.CSSProperties}
    >
      <BackgroundMedia bgImage={slide.bgImage} />
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        <div className="flex flex-col items-start w-full md:max-w-[55%] text-left">
          <div className={`relative z-10 font-mono tracking-[0.22em] text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold mb-[18px] ${fadeUp}`} style={isActive ? { animationDelay: "0.08s", ...shadow } : undefined}>{slide.eyebrow}</div>
          <h1 className={`relative z-10 font-display font-bold text-[clamp(38px,6.4vw,84px)] leading-[1.02] tracking-[-0.01em] max-w-[16ch] ${hasBg ? "text-white" : "text-[var(--ink)]"} ${fadeUp}`} style={isActive ? { animationDelay: "0.16s", textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined } : undefined} dangerouslySetInnerHTML={{ __html: slide.title }} />
          <div className={`relative z-10 font-mono text-[clamp(12px,1vw,14px)] mt-[14px] tracking-[0.02em] ${hasBg ? "text-[#d1cbc4] [&_b]:text-white" : "text-[var(--ink-dim)] [&_b]:text-[var(--ink)]"} ${fadeUp}`} style={isActive ? { animationDelay: "0.24s", ...shadow } : undefined} dangerouslySetInnerHTML={{ __html: slide.who }} />
          
          <KeywordChips keywords={slide.keywords} isActive={isActive} />
          
          <div className={`relative z-10 mt-[44px] font-display font-semibold text-[clamp(18px,1.7vw,26px)] max-w-[34ch] border-l-3 border-[var(--accent)] pl-[18px] ${hasBg ? "text-white" : "text-[var(--ink)]"} [&_span]:text-[var(--accent)] ${fadeUp}`} style={isActive ? { animationDelay: "0.4s", textShadow: hasBg ? "0 2px 8px rgba(0,0,0,0.5)" : undefined } : undefined} dangerouslySetInnerHTML={{ __html: slide.tagline }} />
          
          {prevSlide && nextSlide && (
            <SlideControls prevSlide={prevSlide} nextSlide={nextSlide} currentIndex={currentIndex} totalSlides={totalSlides} hasBg={hasBg} />
          )}
        </div>
        
        <SlideImages images={slide.contentImages} isActive={isActive} hasBg={hasBg} />
      </div>
    </section>
  );
};

export default Jobs;
