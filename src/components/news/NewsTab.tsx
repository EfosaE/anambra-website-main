// // components/news/NewsTabs.tsx
// "use client";

// import { useState } from "react";

// const tabs = [
//   "All",
//   "LGA",
//   "State",
//   "MDA",
//   "Sport",
//   "Events",
//   "Health",
//   "Education",
// ];

// export default function NewsTabs() {
//   const [activeTab, setActiveTab] = useState("All");

//   return (
//     <div className="flex justify-center mb-[50px]">
//       <div className="flex flex-wrap gap-2 justify-center">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-[8px] text-sm font-medium border border-gray-300
//           ${
//             activeTab === tab
//               ? "bg-black text-white border-black"
//               : "bg-white text-gray-700 hover:bg-gray-100"
//           }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";

interface NewsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "All",
  "LGA",
  "State",
  "MDA",
  "Sport",
  "Events",
  "Health",
  "Education",
];

export default function NewsTabs({ activeTab, setActiveTab }: NewsTabsProps) {
  return (
    <div className="mb-[50px] w-full overflow-x-auto scrollbar-none">
      <div
        className="
          flex gap-2 px-4 md:px-0
          whitespace-nowrap w-max
          md:w-full md:justify-center
          md:whitespace-normal
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-[8px] text-sm font-medium border border-gray-300
              ${
                activeTab === tab
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

