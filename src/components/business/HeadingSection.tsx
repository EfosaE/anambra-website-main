"use client"

import { useEffect, useState } from "react";
import clsx from "clsx";

const sections = [
  "Overview",
  "Business Stimulators",
  "Requirements",
  "MDA Processes",
  "Contact",
  "Submit Survey",
];

export default function HeadingSection() {
  const [selectedSection, setSelectedSection] = useState("Overview");

  useEffect(() => {
    console.log(selectedSection);
  }, [selectedSection]);

  // const handleScrollTo = (id: string) => {
  //   setSelectedSection(id);
  //   const el = document.getElementById(id);
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  const handleScrollTo = (id: string) => {
    setSelectedSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // Adjust this value to match your sticky header height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Heading - Normal document flow */}
      <div className="max-w-[1200px] mx-auto px-4 mb-6 pt-[50px] sm:px-6 lg:px-8 text-center">
        <h1 className="text-[30px] sm:text-[40px] font-bold text-black">
          Guide to Starting Business in Anambra state
        </h1>
      </div>

      {/* Sticky nav - Will stick when it reaches top: 0 */}
      <div className="sticky top-20 z-30 bg-orange-100 shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="max-w-[1200px] mx-auto flex justify-center gap-4 px-4 sm:px-6 lg:px-8 min-w-max">
            {sections.map((section) =>
              section === "Submit Survey" ? (
                <button
                  key={section}
                  onClick={() => handleScrollTo(section.replace(/\s+/g, ""))}
                  className="text-[14px] font-semibold bg-golden/75 text-white rounded-[4px] px-4 py-1 flex items-center hover:bg-golden transition-colors duration-200 cursor-pointer whitespace-nowrap">
                  {section}
                </button>
              ) : (
                <button
                  key={section}
                  onClick={() => handleScrollTo(section)}
                  className={clsx(
                    "group text-[14px] font-semibold p-4 flex items-center transition-all duration-200 border-b-4 whitespace-nowrap",
                    selectedSection === section
                      ? "border-golden text-black"
                      : "border-transparent text-black/75 hover:text-black hover:border-golden"
                  )}>
                  {section}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
