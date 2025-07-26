"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // Temporarily hardcode the content to test
  const testContent = `- Set reform targets and oversee the implementation of the reforms.
- Resolve bottlenecks arising from the operations of government agencies.
- Communicate the reform agenda to all stakeholders within government and in the business community.
- Conduct monthly meetings to provide oversight on the activities of MDAs involved in the EoDB drive.`;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Chunk council members into groups of 6 (3 rows × 2 cols)
  const chunkedMembers: CouncilMember[][] = [];
  for (let i = 0; i < councilMembers.length; i += 6) {
    chunkedMembers.push(councilMembers.slice(i, i + 6));
  }

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

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="p-2 bg-white shadow rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 bg-white shadow rounded-full">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="overflow-x-auto scrollbar-none">
              <div className="flex gap-4">
                {chunkedMembers.map((group, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 grid-rows-3 gap-2 min-w-[400px]">
                    {group.map((member, idx) => (
                      <div key={idx} className=" p-4 text-center">
                        <div className="relative w-full h-36 rounded overflow-hidden mb-1">
                          <Image
                            src={member.profile_picture[0].url}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <p className="text-base font-semibold text-[12px] lg:text-[16px] mb-1">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 text-[12px] lg:text-[12px]">
                          {member.designation}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
