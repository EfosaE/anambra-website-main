// components/ScrollableGallery.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollableSlider({ files }: { files: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-12 max-w-[685px]">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow">
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth px-8">
        {files.map((img, i) => (
          <div
            key={i}
            className="min-w-[340px] max-w-[340px] bg-white border rounded-md shadow-sm overflow-hidden">
            <Image
              src={img.url}
              alt="Notable figure"
              width={img.width}
              height={img.height}
              className="w-full h-52 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow">
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
}
