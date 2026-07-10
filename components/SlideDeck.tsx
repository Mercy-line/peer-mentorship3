"use client";
import React from "react";
import { slidesData } from "@/data/slides";
import { useSlideDeck } from "@/hooks/useSlideDeck";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Think from "./pages/Think";
import ICT from "./pages/ICT";
import Jobs from "./pages/Jobs";
import Research from "./pages/Research";
import Scholarship from "./pages/Scholarship";
import PublicSpeaking from "./pages/PublicSpeaking";
import Design from "./pages/Design";
import Wrapped from "./pages/Wrapped";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PAGES: React.ComponentType<any>[] = [Home, Think, ICT, Jobs, Research, Scholarship, PublicSpeaking, Design, Wrapped];

export const SlideDeck: React.FC = () => {
  const { currentIndex, mounted, scrollToSlide } = useSlideDeck();
  if (!mounted) return <div className="w-full h-screen bg-white flex items-center justify-center font-display text-[clamp(16px,2vw,24px)] text-[#b45309] font-medium italic animate-pulse">welcome to kamilimu month 3 # Keep Learning</div>;

  const activeSlide = slidesData[currentIndex];
  const progressPercent = ((currentIndex + 1) / slidesData.length) * 100;

  return (
    <div id="stage" className="relative w-full min-h-screen bg-[#12102a] select-none font-body pb-[80px] md:pb-0" style={{ "--accent": activeSlide.accent || "#b45309", "--accent2": activeSlide.accent2 || "#78350f" } as React.CSSProperties}>
      <NavBar currentIndex={currentIndex} scrollToSlide={scrollToSlide} />
      <div className="bg-glow fixed inset-0 z-0 opacity-90" />
      <div className="grid-overlay fixed inset-0 z-0 pointer-events-none opacity-35" />
      <div id="progress" className="fixed top-0 left-0 h-[3px] z-[101] transition-all duration-600" style={{ width: `${progressPercent}%`, backgroundColor: activeSlide.accent, boxShadow: `0 0 12px ${activeSlide.accent}` }} />
      <div className="relative w-full flex flex-col z-10">
        {slidesData.map((slide, index) => {
          const isActive = index === currentIndex;
          const prev = () => index > 0 && scrollToSlide(index - 1);
          const next = () => index < slidesData.length - 1 && scrollToSlide(index + 1);
          const SlideComp = PAGES[index];
          return <SlideComp key={slide.id} slide={slide} isActive={isActive} prevSlide={prev} nextSlide={next} currentIndex={index} totalSlides={slidesData.length} />;
        })}
      </div>
    </div>
  );
};
export default SlideDeck;
