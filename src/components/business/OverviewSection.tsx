"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

// Import the ranking component
import RankingStatsSection from "./RankingStatsSection";
import { BusinessPageOverview, CouncilMember } from "@/types/graphql/business";
import { parseMarkdown, toBulletedHTMLList } from "@/lib/utils/app.utils";

interface OverviewComponentProps extends BusinessPageOverview {}

export default function OverviewSection({
  introduction,
  objectives,
  spotlight,
  councilMembers,
  frontliners,
  mandate,
}: OverviewComponentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Check scroll position to enable/disable buttons and track current page
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate current page based on scroll position
      const pageWidth = clientWidth;
      const page = Math.round(scrollLeft / pageWidth);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollElement.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Scroll by full container width to show next page of 4 members
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section id="Overview" className="w-full">
        {/* Full-width heading */}
        <div className="w-full py-[58px] px-4">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-[#B3B0AD]" />
            <h2 className="text-[24px] italic font-playfair text-center mx-6 whitespace-nowrap">
              Overview
            </h2>
            <div className="flex-1 h-px bg-[#B3B0AD]" />
          </div>
        </div>
      </section>

      <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Text content */}
          <div className="lg:col-span-7 space-y-10">
            {/* introduction */}
            <div>
              <h3 className="inline-block text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Introduction
              </h3>
              <p className="mt-2 text-gray-700 text-[14px] lg:text-[16px]">
                {introduction}
              </p>
            </div>

            {/* objectives */}
            <div>
              <h3 className="inline-block text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Objectives
              </h3>
              <div
                className="prose prose-sm lg:prose-base text-gray-700  mt-2"
                dangerouslySetInnerHTML={{
                  __html: toBulletedHTMLList(objectives),
                }}
              />

              <RankingStatsSection />
            </div>

            {/* council mandate */}
            <div>
              <h3 className="inline-block text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Council Mandate
              </h3>
              <div
                className="prose prose-sm lg:prose-base text-gray-700  mt-2"
                dangerouslySetInnerHTML={{
                  __html: toBulletedHTMLList(mandate),
                }}
              />
            </div>

            {/* Front line mdas */}
            <div>
              <h3 className="inline-block text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Front Line MDAs
              </h3>
              <div
                className="prose prose-sm lg:prose-base text-gray-700 mt-2"
                dangerouslySetInnerHTML={{
                  __html: toBulletedHTMLList(frontliners),
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          {/* Column 2: Council Members */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[24px] italic font-playfair">
                Council Members
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`p-2 bg-white shadow rounded-full transition-opacity ${
                    !canScrollLeft
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}>
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`p-2 bg-white shadow rounded-full transition-opacity ${
                    !canScrollRight
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-none scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}>
              {/* Hide scrollbar for webkit browsers */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <div className="flex gap-4 pb-2">
                {Array.from({
                  length: Math.ceil(councilMembers.length / 4),
                }).map((_, pageIndex) => {
                  const startIndex = pageIndex * 4;
                  const pageMembers = councilMembers.slice(
                    startIndex,
                    startIndex + 4
                  );

                  return (
                    <div key={pageIndex} className="flex-shrink-0 w-full">
                      <div className="grid grid-cols-2 grid-rows-2 gap-3">
                        {pageMembers.map((member, memberIndex) => (
                          <div
                            key={startIndex + memberIndex}
                            className="text-center">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2 bg-gray-100">
                              {member.profile_picture?.url ? (
                                // If the URL exists, render the Image component
                                <Image
                                  src={member.profile_picture.url}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 150px, 180px"
                                />
                              ) : (
                                // If the URL is null, render the fallback icon
                                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                  <User className="w-1/2 h-1/2 text-gray-400" />
                                </div>
                              )}
                            </div>

                            <p className="text-sm font-semibold mb-1 leading-tight">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-600 leading-tight">
                              {member.position}
                            </p>
                          </div>
                        ))}

                        {/* Fill empty slots if less than 4 members in the last group */}
                        {pageMembers.length < 4 &&
                          Array.from({ length: 4 - pageMembers.length }).map(
                            (_, emptyIndex) => (
                              <div
                                key={`empty-${emptyIndex}`}
                                className="invisible"></div>
                            )
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll indicator dots with active tracking */}
            {councilMembers.length > 4 && (
              <div className="flex justify-center mt-4 space-x-1">
                {Array.from({
                  length: Math.ceil(councilMembers.length / 4),
                }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPage ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
