import React from "react";

interface SlideImagesProps {
  images?: string[];
  isActive: boolean;
  hasBg: boolean;
}

export const SlideImages: React.FC<SlideImagesProps> = ({ images, isActive, hasBg }) => {
  if (!images || images.length === 0) return null;
  const activeClass = isActive ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-8 pointer-events-none";

  if (images.length === 1) {
    const isPng = images[0].endsWith(".png") || images[0].includes("-preview");
    return (
      <div
        className={`w-full md:w-[44vw] max-w-[500px] aspect-[4/3] rounded-xl border overflow-hidden shadow-2xl transition-all duration-700 ${
          hasBg ? "border-white/10 bg-[#78350f]" : "border-black/5 bg-[#b45309]"
        } ${activeClass}`}
        style={isActive ? {
          boxShadow: hasBg ? "0 20px 40px -15px var(--accent2), 0 0 30px -10px var(--accent)" : "0 30px 60px -12px rgba(120,53,15,0.22)",
          transitionDelay: "0.4s",
        } : undefined}
      >
        <img src={images[0]} alt="Illustration" className={`w-full h-full ${isPng ? "object-contain p-6" : "object-cover"}`} />
      </div>
    );
  }

  return (
    <div className={`flex gap-[16px] w-full md:w-[44vw] max-w-[540px] transition-all duration-700 ${activeClass}`} style={isActive ? { transitionDelay: "0.4s" } : undefined}>
      {images.slice(0, 2).map((img, i) => (
        <div key={i} className={`w-[48%] aspect-[3/4] rounded-xl border overflow-hidden shadow-2xl ${hasBg ? "border-white/10" : "border-black/5"}`} style={{ boxShadow: `0 15px 35px -10px var(--accent2)${i === 1 ? ", 0 0 20px -8px var(--accent)" : ""}` }}>
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};
export default SlideImages;
