// "use client";

// import { useState } from "react";
// import { FaFilePdf, FaFileExcel, FaFileWord } from "react-icons/fa";
// import clsx from "clsx";

// const categories = [
//   "Laws",
//   "Budget",
//   "AG Report",
//   "Debts",
//   "Signage & Advertisement",
// ];

// const documents = [
//   {
//     title: "2022 Budget Report",
//     size: "12MB",
//     date: "Jan 10, 2023",
//     type: "pdf",
//   },
//   {
//     title: "State Debts Summary",
//     size: "5MB",
//     date: "Feb 5, 2023",
//     type: "excel",
//   },
//   { title: "AG Report 2021", size: "8MB", date: "Mar 3, 2023", type: "word" },
//   { title: "Law Reform Bill", size: "2MB", date: "Apr 1, 2023", type: "pdf" },
//   {
//     title: "Budget Forecast",
//     size: "7MB",
//     date: "May 22, 2023",
//     type: "excel",
//   },
//   {
//     title: "Advertisement Policy",
//     size: "4MB",
//     date: "Jun 15, 2023",
//     type: "word",
//   },
//   { title: "Signage Guide", size: "1.2MB", date: "Jul 19, 2023", type: "pdf" },
//   {
//     title: "2023 Debt Plan",
//     size: "10MB",
//     date: "Aug 10, 2023",
//     type: "excel",
//   },
//   {
//     title: "Budget Highlights",
//     size: "6MB",
//     date: "Sep 7, 2023",
//     type: "word",
//   },
//   {
//     title: "Gov’t Expenditure Law",
//     size: "3MB",
//     date: "Oct 3, 2023",
//     type: "pdf",
//   },
//   { title: "Debt Breakdown", size: "9MB", date: "Nov 11, 2023", type: "excel" },
//   { title: "Legal Drafts", size: "2MB", date: "Dec 25, 2023", type: "word" },
// ];

// const iconMap = {
//   pdf: (
//     <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
//       <FaFilePdf className="text-[#E5A825] w-16 h-16" />
//     </div>
//   ),
//   excel: (
//     <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
//       <FaFileExcel className="text-[#E5A825] w-16 h-16" />
//     </div>
//   ),
//   word: (
//     <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
//       <FaFileWord className="text-[#E5A825] w-16 h-16" />
//     </div>
//   ),
// };

// export default function DocumentLibrary() {
//   const [query, setQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [mdaFilter, setMdaFilter] = useState("");
//   const [sortOption, setSortOption] = useState("");

//   const toggleCategory = (cat: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
//     );
//   };

//   const filteredDocs = documents
//     .filter((doc) => {
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.some((cat) => doc.title.includes(cat));
//       const matchesQuery = doc.title
//         .toLowerCase()
//         .includes(query.toLowerCase());
//       return matchesCategory && matchesQuery;
//     })
//     .sort((a, b) => {
//       if (sortOption === "az") return a.title.localeCompare(b.title);
//       if (sortOption === "za") return b.title.localeCompare(a.title);
//       if (sortOption === "newest")
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       if (sortOption === "oldest")
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       return 0;
//     });

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       <div className="text-center mb-8">
//         <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
//           Document Library
//         </h2>
//       </div>

//       <div className="flex flex-col items-center justify-center mb-10 px-2">
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]"
//         >
//           <input
//             type="text"
//             placeholder="Search documents..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[4px]"
//             style={{ borderRadius: "12px" }}
//           />
//           <button
//             type="submit"
//             className="text-gray-600 hover:text-black transition text-xl"
//           >
//             <img
//               src="/images/searchicon.png"
//               alt="Search"
//               className="w-[47px] h-[54px] object-contain"
//             />
//           </button>
//         </form>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         {/* Sidebar */}
//         <div className="col-span-12 md:col-span-3">
//           <div className="bg-[#F7F7F7] border border-[#D4D4D4] rounded-lg p-6 space-y-4">
//             {categories.map((cat) => (
//               <label
//                 key={cat}
//                 className={clsx(
//                   "flex items-center gap-2 font-semibold cursor-pointer transition",
//                   selectedCategories.includes(cat)
//                     ? "text-[#DA9617]"
//                     : "text-black"
//                 )}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(cat)}
//                   onChange={() => toggleCategory(cat)}
//                   className="w-4 h-4 rounded"
//                 />
//                 <span className="text-sm">{cat}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Documents + Filters */}
//         <div className="col-span-12 md:col-span-9 space-y-6">
//           <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
//             <select
//               className="bg-[#E9E9E9] border border-[#D4D4D4] px-4 py-2 rounded text-sm text-gray-800 w-full sm:w-auto appearance-none pr-10"
//               value={mdaFilter}
//               onChange={(e) => setMdaFilter(e.target.value)}
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' stroke='%23333' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "right 0.75rem center",
//                 backgroundSize: "1rem",
//               }}
//             >
//               <option value="">Filter by MDA</option>
//               <option value="education">Ministry of Education</option>
//               <option value="agriculture">Ministry of Agriculture</option>
//               <option value="secretary">Other Secretary of State</option>
//             </select>

//             <select
//               className="bg-[#E9E9E9] border border-[#D4D4D4] px-4 py-2 rounded text-sm text-gray-800 w-full sm:w-auto appearance-none pr-10"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' stroke='%23333' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "right 0.75rem center",
//                 backgroundSize: "1rem",
//               }}
//             >
//               <option value="">Sort By</option>
//               <option value="newest">Newest</option>
//               <option value="oldest">Oldest</option>
//               <option value="az">A - Z</option>
//               <option value="za">Z - A</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredDocs.map((doc, idx) => (
//               <div key={idx} className="rounded transition">
//                 {iconMap[doc.type]}
//                 <h4 className="text-sm font-bold text-gray-800 mb-1 mt-[4px]">
//                   {doc.title}
//                 </h4>
//                 <p className="text-xs text-gray-500  mt-2">
//                   Size: {doc.size}
//                 </p>
//                 <p className="text-xs text-gray-500  mt-2">
//                   Date: {doc.date}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { FaFilePdf, FaFileExcel, FaFileWord } from "react-icons/fa";
import clsx from "clsx";
import { fetchAllUploadFiles } from "@/lib/clients/upload.client";

const categories = [
  "Laws",
  "Budget",
  "AG Report",
  "Debts",
  "Signage & Advertisement",
];

const iconMap = {
  pdf: (
    <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
      <FaFilePdf className="text-[#E5A825] w-16 h-16" />
    </div>
  ),
  excel: (
    <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
      <FaFileExcel className="text-[#E5A825] w-16 h-16" />
    </div>
  ),
  word: (
    <div className="bg-[#F9F3DA] h-[140px] flex items-center justify-center">
      <FaFileWord className="text-[#E5A825] w-16 h-16" />
    </div>
  ),
};

export default function DocumentLibrary() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mdaFilter, setMdaFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const allDocs = await fetchAllUploadFiles();
      setDocuments(allDocs);
    };
    load();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredDocs = documents
    .filter((doc) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) =>
          doc.name?.toLowerCase().includes(cat.toLowerCase())
        );

      const matchesQuery = doc.name
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    })
    .sort((a, b) => {
      if (sortOption === "az") return a.name.localeCompare(b.name);
      if (sortOption === "za") return b.name.localeCompare(a.name);
      if (sortOption === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortOption === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="mt-[50px] text-[30px] sm:text-[40px] font-bold text-center mb-12">
          Document Library
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mb-10 px-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]"
        >
          <input
            type="text"
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[4px]"
            style={{ borderRadius: "12px" }}
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl"
          >
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-[#F7F7F7] border border-[#D4D4D4] rounded-lg p-6 space-y-4">
            {categories.map((cat) => (
              <label
                key={cat}
                className={clsx(
                  "flex items-center gap-2 font-semibold cursor-pointer transition",
                  selectedCategories.includes(cat)
                    ? "text-[#DA9617]"
                    : "text-black"
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Documents + Filters */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
            <select
              className="bg-[#E9E9E9] border border-[#D4D4D4] px-4 py-2 rounded text-sm text-gray-800 w-full sm:w-auto appearance-none pr-10"
              value={mdaFilter}
              onChange={(e) => setMdaFilter(e.target.value)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' stroke='%23333' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="">Filter by MDA</option>
              <option value="education">Ministry of Education</option>
              <option value="agriculture">Ministry of Agriculture</option>
              <option value="secretary">Other Secretary of State</option>
            </select>

            <select
              className="bg-[#E9E9E9] border border-[#D4D4D4] px-4 py-2 rounded text-sm text-gray-800 w-full sm:w-auto appearance-none pr-10"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg fill='none' stroke='%23333' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="">Sort By</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDocs.map((doc, idx) => {
              const ext = doc.ext?.toLowerCase().replace(".", "") || "pdf";
              return (
                <div key={idx} className="rounded transition">
                  {iconMap[ext] || iconMap.pdf}
                  <h4 className="text-[14px] font-semibold text-gray-800 mb-1 mt-[4px]">
                    {doc.name}
                  </h4>
                  <p className="text-[12px] text-gray-500 mt-2">
                    Size:{" "}
                    {doc.size < 1024 * 1024
                      ? `${(doc.size / 1024).toFixed(2)}KB`
                      : `${(doc.size / 1024 / 1024).toFixed(2)}MB`}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-2">
                    Date: {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
