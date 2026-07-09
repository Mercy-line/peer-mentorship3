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

  const navItems = [
    { label: "Home", index: 0 },
    { label: "ICT", index: 1 },
    { label: "Critical Thinking", index: 2 },
    { label: "Job Application", index: 3 },
    { label: "Research", index: 4 },
    { label: "Scholarship", index: 5 },
    { label: "Public Speaking", index: 6 },
    { label: "Human Centered Design", index: 7 },
    { label: "Wrap", index: 8 },
  ];

  return (
    <div
      id="stage"
      className="relative w-full h-screen min-h-[560px] overflow-hidden select-none font-body"
      style={{
        "--accent": accent,
        "--accent2": accent2,
      } as React.CSSProperties}
    >
      {/* Floating Track Navbar */}
      <div className="fixed top-[20px] left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[960px] pointer-events-auto">
        <div
          className={`flex items-center justify-between gap-[6px] px-[16px] py-[8px] rounded-full border shadow-lg backdrop-blur-md transition-all duration-500 overflow-x-auto scrollbar-none ${
            hasBg
              ? "bg-[#12102a]/60 border-white/10 text-white"
              : "bg-white/70 border-black/10 text-[#12102a]"
          }`}
        >
          {navItems.map((item) => {
            const isCurrent = item.index === currentIndex;
            return (
              <button
                key={item.index}
                onClick={() => goToSlide(item.index)}
                className={`font-mono text-[11px] font-bold tracking-[0.05em] uppercase px-[12px] py-[6px] rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? "bg-[#0ea5e9] text-white shadow-md"
                    : hasBg
                    ? "text-[#a0aec0] hover:text-white hover:bg-white/5"
                    : "text-[#475569] hover:text-[#12102a] hover:bg-black/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

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
              <TitleSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                currentIndex={currentIndex}
                totalSlides={slidesData.length}
              />
            );
          } else if (slide.type === "content") {
            return (
              <ContentSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                currentIndex={currentIndex}
                totalSlides={slidesData.length}
              />
            );
          } else {
            return (
              <ClosingSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                currentIndex={currentIndex}
                totalSlides={slidesData.length}
              />
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
    </div>
  );
};
export default SlideDeck;
