"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RequirementStep } from "@/types/graphql/business";
import { parseRichContent, toBulletedHTMLList } from "@/lib/utils/app.utils";

type TabbedStepsSectionProps = {
  heading?: string;
  steps: RequirementStep[];
  id?: string;
};

export default function TabbedStepsSection({
  heading,
  steps,
  id,
}: TabbedStepsSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState(1);
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
      {heading && (
        <h2 className="text-[20px] text-center mt-[66px] mb-4 uppercase font-bold">{heading}</h2>
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
                key={step.number}
                onClick={() => setSelected(step.number)}
                className={`w-[112px] h-[48px] shrink-0 text-sm sm:text-base font-semibold border-b-2 transition duration-200 flex items-center justify-center ${
                  selected === step.number
                    ? "text-black border-black"
                    : "text-black border-transparent hover:text-black hover:border-black"
                }`}>
                {`Step ${step.number}`}
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
      {steps[selected - 1] && (
        <div className="bg-[#BBBBBB]/20 rounded p-6 text-sm text-gray-700 max-w-[808px] mx-auto px-4">
          {steps[selected - 1]?.heading && (
            <p className="-mt-2 mb-4 text-center font-bold">
              {steps[selected - 1].heading}
            </p>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: parseRichContent(steps[selected - 1].content),
            }}
          />
        </div>
      )}
    </section>
  );
}
