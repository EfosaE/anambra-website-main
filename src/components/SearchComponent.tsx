// SearchComponent.tsx
"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTypingPlaceholder } from "./useTypingPlaceholder";
import { useMultiTypingPlaceholder } from "./useMultiTypingPlaceholder";
import { HeroProps } from "./Hero";

function fetchRelatedArticles () {
  
}

export default function SearchComponent({ keywords }: HeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const animatedPlaceholder = useMultiTypingPlaceholder({
    texts: [
      "How to resolve business issues...",
      "Budget approval steps",
      "File a complaint easily",
    ],
    isActive: !isFocused,
  });

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full px-4 flex flex-col items-center">
      {/* Text Above Search */}
      <div className="text-center mb-4">
        <p className="text-[12px] text-[#1E1E1E] italic font-playfair font-medium leading-snug">
          Find anything you need with the search bar
        </p>
      </div>

      {/* Search Input with Icon */}
      <div className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] pl-[4px]">
        <input
          type="text"
          placeholder="Click any of the tags below to search"
          className="grow bg-transparent px-2 text-[13px] text-gray-800 focus:outline-none placeholder-black"
          style={{ borderRadius: "12px" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <button className="text-gray-600 hover:text-black transition text-xl pr-[7px]">
          <img
            src="/images/searchicon.png"
            alt="Search"
            className="w-[47px] h-[54px] object-contain"
          />
        </button>
      </div>

      {/* Scroll Arrows + Button Pills */}
      <div className="relative w-full max-w-[690px] flex items-center justify-center">
        {/* Left Arrow - OUTSIDE */}
        <div className="absolute -left-6 z-10">
          <button onClick={() => scroll("left")} className="p-2 rounded-full">
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Scrollable Button List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-2 px-2 scrollbar-none w-full">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={fetchRelatedArticles}
              className="cursor-pointer rounded-[8px] shrink-0 h-[36px] px-2.5 border-2 border-black text-black bg-white font-medium hover:bg-gray-100 transition text-[13px]">
              {keyword.keyword}
            </button>
          ))}
        </div>

        {/* Right Arrow - OUTSIDE */}
        <div className="absolute -right-6 z-10">
          <button onClick={() => scroll("right")} className="p-2 rounded-full">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
