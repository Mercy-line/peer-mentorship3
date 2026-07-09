import { useState, useEffect, useCallback } from "react";

export function useSlideDeck(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when user is typing in inputs or textareas if they exist later
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
