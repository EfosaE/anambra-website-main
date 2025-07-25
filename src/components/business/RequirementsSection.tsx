"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  "Step 1",
  "Step 2",
  "Step 3",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
];

export default function RequirementsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState("Step 1");
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
    <section id="Requirements" className="w-full mt-[20px] overflow-visible">
      {/* Full-width heading */}
      <div className="w-full py-[56px] px-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-[#B3B0AD]" />
          <h2 className="text-[24px] italic font-playfair text-center mx-6 whitespace-nowrap">
            Requirements
          </h2>
          <div className="flex-1 h-px bg-[#B3B0AD]" />
        </div>
      </div>

      {/* Centered content container */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Scrollable Tabs with Arrows */}
        <div className="relative w-full max-w-[700px] mx-auto mb-4">
          {/* Scrollable Tabs Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none w-full px-6 snap-x snap-mandatory">
            <div className="flex gap-4 min-w-max mx-auto relative">
              {steps.map((step) => (
                <button
                  key={step}
                  onClick={() => setSelected(step)}
                  className={`w-[112px] h-[48px] shrink-0 text-sm sm:text-base font-semibold border-b-2 transition duration-200 flex items-center justify-center ${
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

        {/* Step content */}
        <div className="bg-[#BBBBBB]/20 rounded p-6 text-sm text-gray-700">
          <p>
            This is the content for <strong>{selected}</strong>. You can add
            specific step instructions here.
          </p>
          <p>
            This is the content for <strong>{selected}</strong>. You can add
            specific step instructions here.
          </p>
          <p>
            This is the content for <strong>{selected}</strong>. You can add
            specific step instructions here.
          </p>
        </div>
      </div>
    </section>
  );
}
