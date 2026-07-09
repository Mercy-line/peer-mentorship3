import React from "react";
import { ClosingSlideData } from "@/types/slide";

interface ClosingSlideProps {
  slide: ClosingSlideData;
  isActive: boolean;
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({
  slide,
  isActive,
}) => {
  const hasBg = !!(slide.bgImage || slide.bgVideo);

  return (
    <section
      className={`absolute inset-0 z-10 flex flex-col justify-center px-[6vw] sm:px-[9vw] py-[6vh] transition-all duration-700 ${
        hasBg ? "text-ink" : "bg-white text-[#12102a]"
      } ${
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
              background: "linear-gradient(90deg, #000000f0 0%, #000000c0 30%, #00000040 70%, transparent 100%)",
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
              background: "linear-gradient(90deg, #000000f0 0%, #000000c0 30%, #00000040 70%, transparent 100%)",
            }}
          />
        </div>
      ) : null}

      {/* Split Row Container */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-[4vw] md:gap-[6vw]">
        
        {/* Left Column: Wordings */}
        <div className="flex flex-col items-start w-full md:max-w-[55%] text-left">
          {/* Eyebrow */}
          <div
            className={`relative z-10 font-mono tracking-[0.22em] uppercase text-[clamp(11px,1vw,14px)] text-[var(--accent)] font-bold flex items-center gap-[14px] mb-[18px] before:content-[''] before:w-[26px] before:h-[2px] before:bg-[var(--accent)] ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.05s" } : undefined}
          >
            {slide.eyebrow}
          </div>

          {/* Main Headline */}
          <h1
            className={`relative z-10 font-display font-bold text-[clamp(34px,5.4vw,72px)] leading-[1.02] tracking-[-0.01em] ${
              hasBg ? "text-ink" : "text-[#12102a]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.15s" } : undefined}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {/* Closing Stack Summary (Chips) */}
          <div
            className={`relative z-10 flex flex-wrap gap-[12px] mt-[32px] max-w-full ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.25s" } : undefined}
          >
            {slide.keywords.map((kw, i) => (
              <span
                key={i}
                className={`relative z-10 font-mono text-[clamp(12px,0.95vw,15px)] px-[18px] py-[10px] rounded-[100px] whitespace-nowrap shadow-md ${
                  kw.strong
                    ? "text-white font-bold border-none"
                    : hasBg
                    ? "bg-white/10 text-ink border-none"
                    : "bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]"
                }`}
                style={
                  kw.strong
                    ? {
                        backgroundColor: "var(--accent)",
                      }
                    : undefined
                }
              >
                {kw.text}
              </span>
            ))}
          </div>

          {/* Thanks message */}
          <div
            className={`relative z-10 mt-[26px] font-mono text-[14px] ${
              hasBg ? "text-ink-dim" : "text-[#475569]"
            } ${
              isActive ? "animate-fadeUp" : ""
            }`}
            style={isActive ? { animationDelay: "0.35s" } : undefined}
          >
            {slide.thanks}
          </div>
        </div>

        {/* Right Column: Integrated cards side-by-side, NOT stacked overlapping */}
        {slide.contentImages && slide.contentImages.length > 0 && (
          <div
            className={`flex flex-row justify-center items-center gap-[16px] w-full md:w-[38vw] max-w-[480px] transition-all duration-700 ${
              isActive
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 translate-x-8 pointer-events-none"
            }`}
            style={isActive ? { transitionDelay: "0.4s" } : undefined}
          >
            {/* Card 1 */}
            <div
              className={`w-[48%] aspect-[3/4] rounded-2xl border p-2 shadow-2xl backdrop-blur-md ${
                hasBg ? "border-line bg-[#1a1640]/40" : "border-black/5 bg-[#0ea5e9]/5"
              }`}
              style={{
                boxShadow: hasBg
                  ? `0 15px 35px -10px var(--accent2)`
                  : `0 15px 35px -10px rgba(14,165,233,0.1)`,
              }}
            >
              <img
                src={slide.contentImages[0]}
                alt="Emphasis 1"
                className="w-full h-full object-cover rounded-xl border border-white/5"
              />
            </div>

            {/* Card 2 */}
            {slide.contentImages.length > 1 && (
              <div
                className={`w-[48%] aspect-[3/4] rounded-2xl border p-2 shadow-2xl backdrop-blur-md ${
                  hasBg ? "border-line bg-[#1a1640]/40" : "border-black/5 bg-[#0ea5e9]/5"
                }`}
                style={{
                  boxShadow: hasBg
                    ? `0 15px 35px -10px var(--accent2), 0 0 20px -8px var(--accent)`
                    : `0 15px 35px -10px rgba(14,165,233,0.1), 0 0 20px -8px rgba(14,165,233,0.15)`,
                }}
              >
                <img
                  src={slide.contentImages[1]}
                  alt="Emphasis 2"
                  className="w-full h-full object-cover rounded-xl border border-white/5"
                />
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
export default ClosingSlide;
