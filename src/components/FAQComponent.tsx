"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FAQTag = {
  Name: string;
  Slug: string;
};

type FAQ = {
  documentId: string;
  question: string;
  FaqAnswer: any[];
  tags?: FAQTag[];
};

type FAQComponentProps = {
  faqs: FAQ[];
};

export default function FAQComponent({ faqs }: FAQComponentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 md:px-20 py-16">
      <div className="max-w-[1201px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-bold text-black">
            FAQs
          </h2>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>

          {/* Scrollable FAQ Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none gap-6 px-4 md:px-8 py-2"
          >
            {faqs.map((faq, idx) => (
              <div
                key={faq.documentId}
                className="min-w-[382px] bg-white border border-gray-300 p-6 rounded-[8px] flex flex-col justify-between"
                style={{ minHeight: "152px" }}
              >
                <p className="text-[14px] sm:text-base md:text-lg text-black mb-8">
                  {faq.question ?? ""}
                </p>

                <div className="flex justify-between mt-auto pt-4 text-[11px] text-blue-600 font-semibold">
                  <span>{faq.tags?.[0]?.Name ?? "General"}</span>
                  <span>FAQ</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 py-8 md:py-7 px-4">
          <Link
            href="/faq"
            className="inline-flex items-center px-6 py-2 rounded-md bg-white border border-gray-700 text-gray-700 text-sm font-semibold leading-6 hover:bg-gray-300 transition"
          >
            View All FAQs
            <img
              src="/images/arrowup.png"
              alt="FAQs"
              className="ml-2 w-5 h-5 object-contain"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
