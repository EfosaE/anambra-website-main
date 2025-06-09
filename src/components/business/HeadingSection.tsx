import { useState } from "react";
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

  const handleScrollTo = (id: string) => {
    setSelectedSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full py-4">
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto px-4 mb-[24px] pt-[50px] sm:px-6 lg:px-8 text-center">
        <h1 className="text-[30px] sm:text-[40px] font-bold text-black">
          Guide to Starting Business in Anambra state
        </h1>
      </div>

      {/* Stretch background nav */}
      <div className="w-full bg-[#F0F0F0] overflow-x-auto scrollbar-none">
        <div className="max-w-[1200px] mx-auto flex justify-center gap-4 px-4 sm:px-6 lg:px-8 min-w-max whitespace-nowrap">
          {sections.map((section) =>
            section === "Submit Survey" ? (
              <button
                key={section}
                onClick={() => handleScrollTo(section.replace(/\s+/g, ""))}
                className="text-[14px] font-semibold bg-black text-white rounded-[8px] px-4 h-[40px] flex items-center"
              >
                {section}
              </button>
            ) : (
              <button
                key={section}
                onClick={() => handleScrollTo(section.replace(/\s+/g, ""))}
                className={clsx(
                  "text-[14px] font-semibold px-4 h-[40px] flex items-center rounded-[8px] transition",
                  selectedSection === section
                    ? "bg-gray-300 text-black"
                    : "text-black hover:bg-gray-200"
                )}
              >
                {section}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
