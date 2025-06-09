"use client";

import { useRef, useState } from "react";
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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 120;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="Requirements" className="w-full mt-[20px]">
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
        {/* Scrollable Tabs */}
        <div className="relative w-full max-w-[700px] flex items-center justify-center mx-auto">
          {/* Left Arrow */}
          <div className="absolute -left-6 z-10 top-1/2 -translate-y-1/2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white shadow"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Scrollable Button List */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-none w-full"
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
          <div className="absolute -right-6 z-10 top-1/2 -translate-y-1/2">
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
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
