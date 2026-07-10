import React from "react";
import { ClosingSlideData } from "@/types/slide";
import { SlideProps } from "@/types/slide-props";
import BackgroundMedia from "@/components/BackgroundMedia";
import SlideControls from "@/components/SlideControls";
import KeywordChips from "@/components/KeywordChips";
import SlideImages from "@/components/SlideImages";

export const Wrapped: React.FC<SlideProps<ClosingSlideData>> = ({
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
          <div className={`relative z-10 font-mono tracking-[0.22em] text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold mb-[18px] ${fadeUp}`} style={isActive ? { animationDelay: "0.05s", ...shadow } : undefined}>{slide.eyebrow}</div>
          <h1 className={`relative z-10 font-display font-bold text-[clamp(34px,5.4vw,72px)] leading-[1.02] tracking-[-0.01em] ${hasBg ? "text-white" : "text-[var(--ink)]"} ${fadeUp}`} style={isActive ? { animationDelay: "0.15s", textShadow: hasBg ? "0 2px 10px rgba(0,0,0,0.5)" : undefined } : undefined} dangerouslySetInnerHTML={{ __html: slide.title }} />
          
          <KeywordChips keywords={slide.keywords} isActive={isActive} />
          
          <div className={`relative z-10 mt-[26px] font-mono text-[14px] ${hasBg ? "text-[#d1cbc4]" : "text-[var(--ink-dim)]"} ${fadeUp}`} style={isActive ? { animationDelay: "0.35s", ...shadow } : undefined}>{slide.thanks}</div>
          {prevSlide && nextSlide && (
            <SlideControls prevSlide={prevSlide} nextSlide={nextSlide} currentIndex={currentIndex} totalSlides={totalSlides} hasBg={hasBg} />
          )}
        </div>
        <SlideImages images={slide.contentImages} isActive={isActive} hasBg={hasBg} />
      </div>
    </section>
  );
};

export default Wrapped;
