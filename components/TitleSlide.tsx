import React from "react";
import { TitleSlideData } from "@/types/slide";

interface TitleSlideProps {
  slide: TitleSlideData;
  isActive: boolean;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide, isActive }) => {
  return (
    <section
      className={`absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-[6vw] sm:px-[9vw] py-[6vh] transition-all duration-700 ${
        isActive
          ? "opacity-100 pointer-events-auto animate-riseIn"
          : "opacity-0 pointer-events-none translate-y-[26px]"
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
            className="w-full h-full object-cover opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </div>
      ) : slide.bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </div>
      ) : null}

      <div
        className={`relative z-10 font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center justify-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] after:content-[''] after:w-[26px] after:h-[2px] after:bg-[var(--accent)] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.05s" } : undefined}
      >
        {slide.eyebrow}
      </div>

      <h1
        className={`relative z-10 font-display font-bold text-[clamp(46px,8vw,108px)] leading-[0.98] tracking-[-0.015em] [&_.glow]:glow-text ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.15s" } : undefined}
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />

      <div
        className={`relative z-10 mt-[22px] font-mono text-[clamp(13px,1.1vw,17px)] text-ink-dim tracking-[0.03em] ${
          isActive ? "animate-fadeUp" : ""
        }`}
        style={isActive ? { animationDelay: "0.3s" } : undefined}
      >
        {slide.subtitle}
      </div>

      <div className="relative z-10 flex flex-col-reverse items-center gap-2 mt-12">
        {slide.stackColors.map((color, i) => (
          <div
            key={i}
            className={`rounded-[6px] ${isActive ? "animate-popIn" : ""}`}
            style={{
              width: `${60 + i * 40}px`,
              background: color,
              animationDelay: isActive ? `${0.5 + i * 0.1}s` : "0s",
              height: "10px",
            }}
          />
        ))}
      </div>
    </section>
  );
};
export default TitleSlide;
