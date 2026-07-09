"use client";

import React, { useEffect, useState } from "react";
import { slidesData } from "@/data/slides";
import { useSlideDeck } from "@/hooks/useSlideDeck";
import TitleSlide from "./TitleSlide";
import ContentSlide from "./ContentSlide";
import ClosingSlide from "./ClosingSlide";
import StackNav from "./StackNav";

export const SlideDeck: React.FC = () => {
  const { currentIndex, nextSlide, prevSlide, goToSlide } = useSlideDeck(
    slidesData.length
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#12102a] flex items-center justify-center font-mono text-[#9a93c9]">
        Loading Stack...
      </div>
    );
  }

  const activeSlide = slidesData[currentIndex];
  const accent = activeSlide.accent || "#0ea5e9";
  const accent2 = activeSlide.accent2 || "#0284c7";
  const progressPercent = ((currentIndex + 1) / slidesData.length) * 100;
  const hasBg = !!(activeSlide.bgImage || activeSlide.bgVideo);

  return (
    <div
      id="stage"
      className="relative w-full h-screen min-h-[560px] overflow-hidden select-none font-body"
      style={{
        "--accent": accent,
        "--accent2": accent2,
      } as React.CSSProperties}
    >
      {/* Background dynamic glow */}
      <div className="bg-glow absolute inset-0 z-0 opacity-90" />

      {/* Grid overlay */}
      <div className="grid-overlay absolute inset-0 z-0 pointer-events-none opacity-35" />

      {/* Top progress bar */}
      <div
        id="progress"
        className="absolute top-0 left-0 h-[3px] z-50 transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          width: `${progressPercent}%`,
          backgroundColor: accent,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />

      {/* Slide Content rendering */}
      <div className="relative w-full h-full z-10 pointer-events-none">
        {slidesData.map((slide, index) => {
          const isActive = index === currentIndex;
          if (slide.type === "title") {
            return (
              <TitleSlide key={slide.id} slide={slide} isActive={isActive} />
            );
          } else if (slide.type === "content") {
            return (
              <ContentSlide key={slide.id} slide={slide} isActive={isActive} />
            );
          } else {
            return (
              <ClosingSlide key={slide.id} slide={slide} isActive={isActive} />
            );
          }
        })}
      </div>

      {/* LIFO Stack Navigation indicator */}
      <StackNav
        slides={slidesData}
        currentIndex={currentIndex}
        onSelect={goToSlide}
        accent={accent}
        hasBg={hasBg}
      />

      {/* Bottom Nav hint */}
      <div
        className={`navhint absolute bottom-[26px] left-[6vw] sm:left-[9vw] z-50 font-mono text-[11px] tracking-[0.08em] uppercase opacity-70 pointer-events-none transition-colors duration-500 ${
          hasBg ? "text-[#9a93c9]" : "text-[#475569]"
        }`}
      >
        ← → to navigate · click sides
      </div>

      {/* Dynamic Navigation Controller (Back Arrow, Counter, Next Arrow) */}
      <div className="absolute bottom-[26px] right-[6vw] sm:right-[9vw] z-50 flex items-center gap-[14px]">
        {/* Back Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          disabled={currentIndex === 0}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-lg cursor-pointer ${
            hasBg
              ? "border-line bg-[#1a1640]/60 text-ink hover:bg-[#1a1640]/90 hover:text-white"
              : "border-[#cbd5e1] bg-[#f8fafc]/80 text-[#12102a] hover:bg-[#e2e8f0] hover:text-[#0ea5e9]"
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
          <b className={hasBg ? "text-[#f4f2ff]" : "text-[#12102a]"}>{currentIndex + 1}</b> / {slidesData.length}
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          disabled={currentIndex === slidesData.length - 1}
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-all active:scale-90 shadow-lg cursor-pointer ${
            hasBg
              ? "border-line bg-[#1a1640]/60 text-ink hover:bg-[#1a1640]/90 hover:text-white"
              : "border-[#cbd5e1] bg-[#f8fafc]/80 text-[#12102a] hover:bg-[#e2e8f0] hover:text-[#0ea5e9]"
          } ${
            currentIndex === slidesData.length - 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
          }`}
          aria-label="Next Slide"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Click zones */}
      <div
        className="absolute inset-y-0 left-0 w-[38%] z-40 cursor-[w-resize]"
        onClick={prevSlide}
      />
      <div
        className="absolute inset-y-0 right-0 w-[38%] z-40 cursor-[e-resize]"
        onClick={nextSlide}
      />
    </div>
  );
};
export default SlideDeck;
