"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FAQ } from "@/types/graphql/faq";



type FAQComponentProps = {
  faqs: FAQ[];
};

export default function FAQComponent({ faqs }: FAQComponentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10); // Small threshold for better UX
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Initialize scroll position check
  useEffect(() => {
    checkScrollPosition();
    
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      // Also check on resize
      const resizeObserver = new ResizeObserver(checkScrollPosition);
      resizeObserver.observe(scrollElement);
      
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollPosition);
        resizeObserver.disconnect();
      };
    }
  }, [faqs]); // Re-run when FAQs change

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = scrollRef.current;
    const cardWidth = 360; // min-width of each card
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;
    
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 500);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, direction: "left" | "right") => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scroll(direction);
    }
  };

  // Don't render if no FAQs
  if (!faqs || faqs.length === 0) {
    return (
      <section className="px-4 md:px-20 py-16">
        <div className="max-w-[1201px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-bold text-black mb-8">
            FAQs
          </h2>
          <p className="text-gray-600">No FAQs available at the moment.</p>
        </div>
      </section>
    );
  }

  // For single FAQ, center it without arrows
  if (faqs.length === 1) {
    return (
      <section className="px-4 md:px-20 py-16">
        <div className="max-w-[1201px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-bold text-black">
              FAQs
            </h2>
          </div>
          
          <div className="flex justify-center px-4 md:px-8">
            <div className="w-full max-w-[360px] bg-white border border-gray-300 p-6 rounded-[8px] flex flex-col justify-between min-h-[152px]">
              <p className="text-[14px] sm:text-base md:text-lg text-black mb-8">
                {faqs[0].question || ""}
              </p>
              <div className="flex justify-between mt-auto pt-4 text-[11px] text-blue-600 font-semibold">
                <span>{faqs[0].tags?.[0]?.Name || "General"}</span>
                <span>FAQ</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 py-8 md:py-7 px-4">
            <Link
              href="/faq"
              className="inline-flex items-center px-6 py-2 rounded-md bg-white border border-gray-700 text-gray-700 text-sm font-semibold leading-6 hover:bg-gray-300 transition"
            >
              View All FAQs
              <img
                src="/images/arrowup.png"
                alt="View FAQs"
                className="ml-2 w-5 h-5 object-contain"
              />
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
          {/* Left Arrow - Only show when can scroll left */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              onKeyDown={(e) => handleKeyDown(e, "left")}
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
              disabled={isScrolling}
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
          )}

          {/* Scrollable FAQ Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none gap-6 px-4 md:px-8 py-2 scroll-smooth"
            role="region"
            aria-label="FAQ carousel"
          >
            {faqs.map((faq, idx) => (
              <div
                key={`${faq.documentId}-${idx}`} // More robust key
                className="min-w-[360px] bg-white border border-gray-300 p-6 rounded-[8px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                style={{ minHeight: "152px" }}
                role="article"
                aria-labelledby={`faq-question-${idx}`}
              >
                <p 
                  id={`faq-question-${idx}`}
                  className="text-[14px] sm:text-base md:text-lg text-black mb-8 leading-relaxed"
                >
                  {faq.question?.trim() || "Question not available"}
                </p>

                <div className="flex justify-between mt-auto pt-4 text-[11px] text-blue-600 font-semibold">
                  <span className="truncate mr-2">
                    {faq.tags?.[0]?.Name?.trim() || "General"}
                  </span>
                  <span>FAQ</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Only show when can scroll right */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              onKeyDown={(e) => handleKeyDown(e, "right")}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
              disabled={isScrolling}
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 py-8 md:py-7 px-4">
          <Link
            href="/faq"
            className="inline-flex items-center px-6 py-2 rounded-md bg-white border border-gray-700 text-gray-700 text-sm font-semibold leading-6 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View All FAQs
            <img
              src="/images/arrowup.png"
              alt=""
              className="ml-2 w-5 h-5 object-contain"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}