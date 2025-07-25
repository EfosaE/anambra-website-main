"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TabbedStepsSectionProps = {
  heading: string;
  subheading?: string;
  steps: string[];
  contents: Record<string, string>;
  id?: string;
};

export default function TabbedStepsSection({
  heading,
  subheading,
  steps,
  contents,
  id,
}: TabbedStepsSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(steps[0]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });

      // Small delay to allow smooth scroll before checking position
      setTimeout(updateArrowState, 300);
    }
  };
  const updateArrowState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const check = () => {
      const el = scrollRef.current;
      if (!el) return;

      setIsOverflowing(el.scrollWidth > el.clientWidth);
      updateArrowState();
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id={id} className="space-y-6 relative">
      {/* Heading */}
      <h2 className="text-[20px] text-center mt-[66px] mb-4">{heading}</h2>

      {subheading && (
        <p className="text-sm text-center text-gray-700 max-w-[808px] mx-auto -mt-4 mb-6 px-4">
          {subheading}
        </p>
      )}

      {/* Tabs + Arrows */}
      <div className="w-full max-w-[808px] mx-auto mb-6 relative">
        {/* Scrollable Tabs Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none w-full px-6">
          <div
            ref={containerRef}
            className="flex gap-4 min-w-max mx-auto relative">
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => setSelected(step)}
                className={`w-[119.5px] h-[48px] shrink-0 text-sm sm:text-base font-semibold border-b-2 transition duration-200 flex items-center justify-center ${
                  selected === step
                    ? "text-black border-black"
                    : "text-black border-transparent hover:text-black hover:border-black"
                }`}>
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        {isOverflowing && !atStart && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-white shadow rounded-full ml-2 pointer-events-auto"
              aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
          </div>
        )}

        {/* Right Arrow */}
        {isOverflowing && !atEnd && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-white shadow rounded-full mr-2 pointer-events-auto"
              aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Step Content */}
      <div className="bg-[#BBBBBB]/20 rounded p-6 text-sm text-gray-700 max-w-[808px] mx-auto px-4">
        <p>{contents[selected]}</p>
      </div>
    </section>
  );
}
