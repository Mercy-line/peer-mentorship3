import React from "react";
import { Keyword } from "@/types/slide";

interface KeywordChipsProps {
  keywords: Keyword[];
  isActive: boolean;
}

export const KeywordChips: React.FC<KeywordChipsProps> = ({ keywords, isActive }) => {
  return (
    <div
      className={`relative z-10 flex flex-wrap gap-[12px] mt-[32px] max-w-full ${
        isActive ? "animate-fadeUp" : ""
      }`}
      style={isActive ? { animationDelay: "0.25s" } : undefined}
    >
      {keywords.map((kw, i) => (
        <span
          key={i}
          className="font-mono text-[clamp(12px,0.95vw,15px)] px-[18px] py-[10px] rounded-[100px] whitespace-nowrap shadow-[0_4px_12px_rgba(120,53,15,0.15)] bg-[#b45309] text-white font-semibold border-none"
        >
          {kw.text}
        </span>
      ))}
    </div>
  );
};
export default KeywordChips;
