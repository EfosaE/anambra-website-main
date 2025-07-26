"use client";

import { BusinessPageStimulator } from "@/types/graphql/business";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface StimulatorComponentProps extends BusinessPageStimulator {}

export default function StimulatorsSection({
  stimulators,
}: StimulatorComponentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="Business Stimulators" className="w-full mt-[28px]">
      {/* Full-width heading */}
      <div className="w-full py-[70px] px-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-[#B3B0AD]" />
          <h2 className="text-[24px] italic font-playfair text-center mx-6 whitespace-nowrap">
            Business Stimulators
          </h2>
          <div className="flex-1 h-px bg-[#B3B0AD]" />
        </div>
      </div>

      {/* Centered accordion content */}
      <div className="max-w-[800px] mx-auto px-2 sm:px-6 lg:px-8 space-y-4">
        {stimulators.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded">
            <div
              className="flex justify-between items-center bg-[#BBBBBB]/20 p-4 cursor-pointer hover:bg-[#BBBBBB]/30 transition-colors"
              onClick={() => toggleIndex(index)}>
              <p className="w-full text-black font-medium">{item.highlight}</p>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {activeIndex === index && (
              <div className="p-4 bg-[#FAFAFA] text-sm text-gray-800 animate-in slide-in-from-top-2 duration-200">
                {item.extras}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
