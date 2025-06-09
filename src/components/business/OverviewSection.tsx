"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import the ranking component
import RankingStatsSection from "./RankingStatsSection";

const councilMembers = [
  {
    name: "Mr. C. Fred Agbata",
    role: "MD/CEO Anambra State ICT Agency",
    image: "/images/avatar.png",
  },
  {
    name: "Mrs. Adaeze Umeh",
    role: "Commissioner of Commerce",
    image: "/images/lady.jpg",
  },
  {
    name: "Engr. Emeka Obi",
    role: "Director, Urban Planning",
    image: "/images/avatar.png",
  },
  {
    name: "Dr. Chika Nwankwo",
    role: "Investment Promotion Lead",
    image: "/images/avatar.png",
  },
  {
    name: "Ms. Ify Okoye",
    role: "ICT Consultant",
    image: "/images/lady.jpg",
  },
  {
    name: "Barr. John Eze",
    role: "Legal Advisor",
    image: "/images/avatar.png",
  },
  {
    name: "Mr. Ken Uba",
    role: "Infrastructure Head",
    image: "/images/avatar.png",
  },
  {
    name: "Mrs. Rose Ibe",
    role: "Head of Admin",
    image: "/images/lady.jpg",
  },
];

export default function OverviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const chunkedMembers = [];
  for (let i = 0; i < councilMembers.length; i += 6) {
    chunkedMembers.push(councilMembers.slice(i, i + 6));
  }

  const sections = [
    {
      title: "Introduction",
      content: [
        "The Ease of Doing Business project was launched in 2002, it looks at domestic small and medium-size companies and measures the regulations applying to them through their life cycle.",
        "It provides quantitative indicators on regulation for starting a business, dealing with construction permits, getting electricity, registering property, getting credit, protecting minority investors, paying taxes, trading across borders, enforcing contracts and resolving insolvency, also measures features of employing workers.",
      ],
    },
    {
      title: "Objectives",
      list: [
        "To act as umpire on investments matters thereby eliminating business and investment barriers and bottlenecks.",
        "To aid improvement of the business enabling environment by following up on steps towards enhancing land administration, regulatory framework for private investment in fiber optic infrastructure, PPP investment promotion framework and economic opportunity in the State.",
        "To move Anambra from No. 7 to No. 1 in EoDB ranking in the country for all indicators",
      ],
    },
    {
      title: "Council Mandate",
      list: [
        "Set reform targets and oversee the implementation of the reforms",
        "Resolve bottlenecks arising from the operations of government agencies",
        "Communicate the reform agenda to all stakeholders within government and in the business community",
        "Conduct monthly meetings to provide oversight on the activities of MDAs involved in the EoDB drive",
      ],
    },
    {
      title: "Front Line MDAs",
      list: [
        "Ministry of Land",
        "Anambra Physical Planning Agency",
        "Anambra state Signage and Advertisement Agency",
        "Anambra State Investment Promotion and Protection Agency",
        "Ministry of Power & Water Resources",
      ],
    },
  ];

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
            {sections.map((section, i) => (
              <div key={i}>
                <h3 className="inline-block text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                  {section.title}
                </h3>

                {section.content &&
                  section.content.map((p, idx) => (
                    <p
                      key={idx}
                      className="mt-2 text-gray-700 text-[14px] lg:text-[16px]"
                    >
                      {p}
                    </p>
                  ))}

                {section.list && (
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2 text-[14px] lg:text-[16px]">
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.title === "Objectives" && <RankingStatsSection />}
              </div>
            ))}
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
                  className="p-2 bg-white shadow rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 bg-white shadow rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="overflow-x-auto scrollbar-none">
              <div className="flex gap-4">
                {chunkedMembers.map((group, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 grid-rows-3 gap-4 min-w-[400px]"
                  >
                    {group.map((member, idx) => (
                      <div key={idx} className=" p-4 text-center">
                        <div className="w-full h-32 relative mb-1">
                          <Image
                            src={member.image}
                            alt={member.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                          />
                        </div>
                        <p className="text-base font-semibold text-[12px] lg:text-[16px] mb-1">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 text-[12px] lg:text-[12px]">
                          {member.role}
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
