import React from "react";
import { navItems } from "./navData";

interface NavBarProps {
  currentIndex: number;
  scrollToSlide: (index: number) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentIndex, scrollToSlide }) => {
  return (
    <div className="fixed bottom-[24px] left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[500px] md:bottom-auto md:top-[20px] md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-[1020px] pointer-events-auto">
      <div className="flex items-center justify-around md:justify-between gap-[4px] md:gap-[8px] px-[12px] md:px-[16px] py-[10px] md:py-[8px] rounded-full border border-black/10 bg-white shadow-[0_20px_50px_rgba(120,53,15,0.18)] md:shadow-[0_8px_30px_rgba(120,53,15,0.1)] transition-all duration-500 overflow-x-auto scrollbar-none pb-[8px] md:pb-[8px]">
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
              <span className="md:hidden flex items-center justify-center w-[20px] h-[20px]">{item.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default NavBar;
