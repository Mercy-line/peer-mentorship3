"use client";

import React, { useEffect, useState } from "react";
import { slidesData } from "@/data/slides";
import { useSlideDeck } from "@/hooks/useSlideDeck";
import TitleSlide from "./TitleSlide";
import ContentSlide from "./ContentSlide";
import ClosingSlide from "./ClosingSlide";
import StackNav from "./StackNav";

export const SlideDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer to update active nav item on scroll
  useEffect(() => {
    if (!mounted) return;
    const sections = slidesData.map((_, i) => document.getElementById(`slide-${i}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.replace("slide-", ""), 10);
            if (!isNaN(index)) {
              setCurrentIndex(index);
            }
          }
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" } // Optimized for scrolling detection
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center font-display text-[clamp(16px,2vw,24px)] text-[#b45309] font-medium italic animate-pulse">
        welcome to kamilimu month 3 # Keep Learning
      </div>
    );
  }

  const scrollToSlide = (index: number) => {
    setCurrentIndex(index);
    const el = document.getElementById(`slide-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeSlide = slidesData[currentIndex];
  const accent = activeSlide.accent || "#b45309";
  const accent2 = activeSlide.accent2 || "#78350f";
  const progressPercent = ((currentIndex + 1) / slidesData.length) * 100;
  const hasBg = !!(activeSlide.bgImage || activeSlide.bgVideo);

  const navItems = [
    {
      label: "Home",
      index: 0,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Think",
      index: 1,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: "ICT",
      index: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Jobs",
      index: 3,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Research",
      index: 4,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.182.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.182.477-4 1.253" />
        </svg>
      ),
    },
    {
      label: "Scholarship",
      index: 5,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6M7.05 16.536a7 7 0 009.9 0" />
        </svg>
      ),
    },
    {
      label: "Public Speaking",
      index: 6,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ),
    },
    {
      label: "Design",
      index: 7,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      label: "Wrapped",
      index: 8,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      id="stage"
      className="relative w-full min-h-screen bg-[#12102a] select-none font-body pb-[80px] md:pb-0"
      style={{
        "--accent": accent,
        "--accent2": accent2,
      } as React.CSSProperties}
    >
      {/* Floating Track Navbar (Fixed Top on Desktop, Floating Rounded Pill at Bottom on Mobile) */}
      <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[500px] md:bottom-auto md:top-[20px] md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-[1020px] pointer-events-auto">
        <div
          className="flex items-center justify-around md:justify-between gap-[4px] md:gap-[8px] px-[12px] md:px-[16px] py-[10px] md:py-[8px] rounded-full border border-black/10 bg-white shadow-[0_20px_50px_rgba(120,53,15,0.18)] md:shadow-[0_8px_30px_rgba(120,53,15,0.1)] transition-all duration-500 overflow-x-auto scrollbar-none pb-[8px] md:pb-[8px]"
        >
          {navItems.map((item) => {
            const isCurrent = item.index === currentIndex;
            return (
              <button
                key={item.index}
                onClick={() => scrollToSlide(item.index)}
                className={`font-mono text-[11px] font-bold tracking-[0.05em] px-[10px] md:px-[12px] py-[10px] md:py-[6px] rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                  isCurrent
                    ? "bg-[#b45309] text-white shadow-[0_4px_14px_rgba(120,53,15,0.35)]"
                    : "text-[#5c554e] hover:text-[#b45309] hover:bg-[#b45309]/5"
                }`}
                aria-label={item.label}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden flex items-center justify-center w-[20px] h-[20px]">
                  {item.icon}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed background dynamic glow */}
      <div className="bg-glow fixed inset-0 z-0 opacity-90" />

      {/* Fixed Grid overlay */}
      <div className="grid-overlay fixed inset-0 z-0 pointer-events-none opacity-35" />

      {/* Top progress bar (fixed top) */}
      <div
        id="progress"
        className="fixed top-0 left-0 h-[3px] z-[101] transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          width: `${progressPercent}%`,
          backgroundColor: accent,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />

      {/* Vertical Page Stack rendering */}
      <div className="relative w-full flex flex-col z-10">
        {slidesData.map((slide, index) => {
          const isActive = index === currentIndex;
          
          // Navigation callbacks for the inline controls in each page
          const prev = () => {
            if (index > 0) scrollToSlide(index - 1);
          };
          const next = () => {
            if (index < slidesData.length - 1) scrollToSlide(index + 1);
          };

          if (slide.type === "title") {
            return (
              <TitleSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prev}
                nextSlide={next}
                currentIndex={index}
                totalSlides={slidesData.length}
              />
            );
          } else if (slide.type === "content") {
            return (
              <ContentSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prev}
                nextSlide={next}
                currentIndex={index}
                totalSlides={slidesData.length}
              />
            );
          } else {
            return (
              <ClosingSlide
                key={slide.id}
                slide={slide}
                isActive={isActive}
                prevSlide={prev}
                nextSlide={next}
                currentIndex={index}
                totalSlides={slidesData.length}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default SlideDeck;
