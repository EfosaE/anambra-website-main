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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      const scroll = scrollRef.current;
      if (container && scroll) {
        setIsOverflowing(scroll.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <section id={id} className="space-y-6">
      <h2 className="text-[20px]  text-center mt-[66px] mb-4">{heading}</h2>
      {subheading && (
        <p className="text-sm text-center text-gray-700 max-w-[808px] mx-auto -mt-4 mb-6">
          {subheading}
        </p>
      )}

      {/* Scrollable Tabs */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[808px] flex items-center justify-center mx-auto mb-6"
      >
        {/* Left Arrow */}
        {isOverflowing && (
          <div className="absolute -left-6 z-10 top-1/2 -translate-y-1/2">
            <button onClick={() => scroll("left")} className="p-2 rounded-full">
              <ChevronLeft size={20} />
            </button>
          </div>
        )}

        {/* Tabs Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none w-full justify-center"
        >
          <div className="flex gap-4 min-w-max px-6">
            {steps.map((step) => (
              <button
                key={step}
                onClick={() => setSelected(step)}
                className={`w-[119.5px] h-[48px] shrink-0 text-sm sm:text-base font-semibold border-b-2 transition duration-200 flex items-center justify-center ${
                  selected === step
                    ? "text-black border-black"
                    : "text-black border-transparent hover:text-black hover:border-black"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {isOverflowing && (
          <div className="absolute -right-6 z-10 top-1/2 -translate-y-1/2">
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Step Content */}
      <div className="bg-[#BBBBBB]/20 rounded p-6 text-sm text-gray-700 max-w-[808px] mx-auto">
        <p>{contents[selected]}</p>
      </div>
    </section>
  );
}
