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
  const accent = activeSlide.accent || "#8f7bff";
  const accent2 = activeSlide.accent2 || "#2a2560";
  const progressPercent = ((currentIndex + 1) / slidesData.length) * 100;

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
      />

      {/* Bottom Nav hint */}
      <div className="navhint absolute bottom-[26px] left-[6vw] sm:left-[9vw] z-50 font-mono text-[11px] text-[#9a93c9] tracking-[0.08em] uppercase opacity-70 pointer-events-none">
        ← → to navigate · click sides
      </div>

      {/* Slide counter */}
      <div className="counter absolute bottom-[26px] right-[70px] z-50 font-mono text-[12px] text-[#9a93c9] pointer-events-none">
        <b className="text-[#f4f2ff]">{currentIndex + 1}</b> / {slidesData.length}
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
