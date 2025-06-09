// "use client";

// import { useState } from "react";
// import clsx from "clsx";
// import { Search, Building, X } from "lucide-react";

// const categories = ["Ministries[x]", "Agencies[x]"];
// const tabs = [
//   "Core Mandate",
//   "Functions",
//   "Departments",
//   "Contact",
//   "Officials",
// ];

// export default function MDA() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [query, setQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [activeCard, setActiveCard] = useState<number | null>(null);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   const openModal = (index: number) => {
//     setActiveCard(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setActiveTab(tabs[0]);
//     setActiveCard(null);
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h2 className="mt-[50px] text-3xl font-bold text-black">MDAs</h2>
//       </div>

//       {/* Centered Search Section */}
//       <div className="flex flex-col items-center justify-center mb-10">
//         <div className="flex gap-6 border-b border-gray-300 mb-6">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={clsx(
//                 "pb-2 text-sm font-semibold transition",
//                 selectedCategory === category
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-black hover:text-blue-600"
//               )}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         <form
//           onSubmit={handleSearch}
//           className="flex items-center bg-[#E9E9E9] rounded-[12px] h-12 w-full max-w-xl"
//         >
//           <input
//             type="text"
//             placeholder="How to resolve business issues..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="grow bg-transparent pl-[10px] text-sm text-gray-800 focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="text-gray-600 hover:text-black transition text-xl pr-[6px]"
//           >
//             <img
//               src="/images/searchicon.png"
//               alt="Search"
//               className="w-[47px] h-[54px] object-contain"
//             />
//           </button>
//         </form>
//       </div>

//       {/* Result Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {[...Array(12)].map((_, index) => (
//           <div
//             key={index}
//             onClick={() => openModal(index)}
//             className="cursor-pointer bg-white shadow rounded-lg p-4 flex flex-col justify-between hover:ring-2 hover:ring-blue-600"
//           >
//             <div className="flex items-center mb-4">
//               <div className="bg-gray-200 p-2 rounded-full mr-3">
//                 <img
//                   src="/images/icons/ministries.svg"
//                   alt="Event Icon"
//                   className="w-10 h-10"
//                 />
//               </div>
//               <h4 className="text-lg font-bold">Building {index + 1}</h4>
//             </div>
//             <p className="text-sm text-gray-600">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
//               modi.
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Overlay Popup Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg p-6">
//             {/* Close */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-600 hover:text-black"
//             >
//               <X size={20} />
//             </button>

//             {/* Tabs */}
//             <div className="flex gap-6 border-b border-gray-200 mb-6">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={clsx(
//                     "pb-2 text-sm font-semibold transition",
//                     activeTab === tab
//                       ? "border-b-2 border-black text-black"
//                       : "text-gray-600 hover:text-black"
//                   )}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-2">{activeTab}</h3>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 This is the detailed content for <strong>{activeTab}</strong>.
//                 Replace with actual data from the database or API response as
//                 needed.
//               </p>
//             </div>

//             {/* Button */}
//             <div className="text-center">
//               <a
//                 href="#"
//                 target="_blank"
//                 className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
//               >
//                 Go to website
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { fetchAllMdaCategories } from "@/lib/clients/mda.client";
import { Mda } from "@/lib/types/graphql/mda"; // Adjust if needed

const categories = ["Ministries", "Agencies"];
const tabs = [
  "Core Mandate",
  "Functions",
  "Departments",
  "Contact",
  "Officials",
];

export default function MDA() {
  const [selectedCategory, setSelectedCategory] = useState("Ministries");
  const [query, setQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeCard, setActiveCard] = useState<Mda | null>(null);
  const [mdas, setMdas] = useState<Mda[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllMdaCategories();
        setMdas(data);
      } catch (error) {
        console.error("Failed to fetch MDAs:", error);
      }
    };
    getData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTriggered(true);
  };

  const filteredMdas = searchTriggered
    ? mdas.filter((mda) => mda.name.toLowerCase().includes(query.toLowerCase()))
    : mdas;

  const openModal = (mda: Mda) => {
    setActiveCard(mda);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTab(tabs[0]);
    setActiveCard(null);
  };

  useEffect(() => {
    if (typeof activeCard?.Functions === "string") {
      try {
        activeCard.Functions = JSON.parse(activeCard.Functions);
      } catch (e) {
        console.warn("Could not parse Functions JSON");
      }
    }
  }, [activeCard]);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchTriggered(false);
    }
  }, [query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="mt-[50px] text-[30px] md:text-[40px] font-bold text-black">
          MDAs
        </h2>
      </div>

      {/* Categories + Search */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex gap-6 border-b border-gray-300 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "pb-2 text-sm font-semibold transition",
                selectedCategory === category
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-black hover:text-blue-600"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] h-12 w-full max-w-xl"
        >
          <input
            type="text"
            placeholder="Search MDAs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent pl-[10px] text-sm text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl pr-[6px]"
          >
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMdas.map((mda) => (
          <div
            key={mda.documentId}
            onClick={() => openModal(mda)}
            className="cursor-pointer bg-white border border-gray-300 rounded-lg p-5 flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <img
                  src="/images/icons/ministries.svg"
                  alt="Icon"
                  className="w-10 h-10"
                />
              </div>
              <h4 className="text-[16px] font-semibold">{mda.name}</h4>
            </div>
            {Array.isArray(mda.Mandate) &&
              mda.Mandate.map((block: any, i: number) => (
                <p
                  key={i}
                  className="text-[13px] text-gray-700 leading-relaxed mb-2"
                >
                  {block.children?.map((child: any) => child.text).join("")}
                </p>
              ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && activeCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg p-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "pb-2 text-sm font-semibold transition",
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-6 space-y-3">
              <h3 className="text-xl font-bold mb-2">{activeCard.name}</h3>

              {activeTab === "Core Mandate" && (
                <div className="space-y-2 text-[13px] text-gray-700">
                  {Array.isArray(activeCard.Mandate) &&
                  activeCard.Mandate.length > 0 ? (
                    activeCard.Mandate.map((block, i) => (
                      <p key={i}>
                        {block.children
                          ?.map((child: any) => child.text)
                          .join("")}
                      </p>
                    ))
                  ) : (
                    <p>Not available.</p>
                  )}
                </div>
              )}

              {activeTab === "Functions" && (
                <div className="text-[13px] text-gray-700">
                  {Array.isArray(activeCard.Functions) &&
                  activeCard.Functions.length > 0 ? (
                    activeCard.Functions.map((block, i) => {
                      if (
                        block.type === "list" &&
                        Array.isArray(block.children)
                      ) {
                        return (
                          <ul key={i} className="list-disc ml-5 space-y-1">
                            {block.children.map((item: any, j: number) => {
                              const itemText = item.children
                                ?.map((child: any) => child.text)
                                .join("");
                              return <li key={j}>{itemText}</li>;
                            })}
                          </ul>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p>Not available.</p>
                  )}
                </div>
              )}

              {activeTab === "Departments" && (
                <ul className="list-disc ml-5 text-[13px] text-gray-700 space-y-1">
                  {Array.isArray(activeCard.departments) &&
                  activeCard.departments.length > 0 ? (
                    activeCard.departments.map((dept) => (
                      <li key={dept.documentId}>
                        <strong>{dept.name}</strong>: {dept.Description}
                      </li>
                    ))
                  ) : (
                    <li>No departments available.</li>
                  )}
                </ul>
              )}

              {activeTab === "Contact" && (
                <p className="text-[13px] text-gray-700">
                  {activeCard.Officials?.[0]?.Contact?.image?.file
                    ?.alternativeText || "No contact info"}
                </p>
              )}

              {activeTab === "Officials" && (
                <p className="text-[13px] text-gray-700">
                  {activeCard.Officials?.[0]?.Contact?.image?.file
                    ?.alternativeText || "No OFficials info"}
                </p>
              )}
            </div>

            <div className="text-center">
              <a
                href="#"
                target="_blank"
                className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
