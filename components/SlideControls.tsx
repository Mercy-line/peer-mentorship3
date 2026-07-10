import React from "react";

interface SlideControlsProps {
  prevSlide: () => void;
  nextSlide: () => void;
  currentIndex: number;
  totalSlides: number;
  hasBg?: boolean;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  prevSlide,
  nextSlide,
  currentIndex,
  totalSlides,
  hasBg = true,
}) => {
  const arrowSvg = (d: string) => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
  return (
    <div className="relative z-20 flex items-center gap-[14px] mt-8 pointer-events-auto">
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        disabled={currentIndex === 0}
        className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-white text-[#b45309] hover:bg-white/90 shadow-[0_8px_30px_rgba(120,53,15,0.18)] transition-all active:scale-90 cursor-pointer ${
          currentIndex === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
        aria-label="Previous Slide"
      >
        {arrowSvg("M15 19l-7-7 7-7")}
      </button>
      <div className={`font-mono text-[12px] tracking-[0.05em] select-none min-w-[50px] text-center ${
        hasBg ? "text-[#d1cbc4]" : "text-[var(--ink-dim)]"
      }`}>
        <b className={hasBg ? "text-white" : "text-[var(--ink)]"}>{currentIndex + 1}</b> / {totalSlides}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        disabled={currentIndex === totalSlides - 1}
        className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border-none bg-[#b45309] text-white hover:bg-[#b45309]/90 shadow-[0_8px_30px_rgba(120,53,15,0.25)] transition-all active:scale-90 cursor-pointer ${
          currentIndex === totalSlides - 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
        aria-label="Next Slide"
      >
        {arrowSvg("M9 5l7 7-7 7")}
      </button>
    </div>
  );
};
export default SlideControls;
