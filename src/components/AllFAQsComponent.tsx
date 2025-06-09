"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { fetchAllFaqs } from "@/lib/clients/faq.client";

export default function AllFAQsComponent() {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const loadFaqs = async () => {
      const result = await fetchAllFaqs();
      setFaqs(result);
    };
    loadFaqs();
  }, []);

  const filteredFaqs = faqs
    .filter((faq) => faq.question.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "az") return a.question.localeCompare(b.question);
      if (sortOption === "za") return b.question.localeCompare(a.question);
      if (sortOption === "newest")
        return (
          new Date(b.faq_Published_Date).getTime() -
          new Date(a.faq_Published_Date).getTime()
        );
      if (sortOption === "oldest")
        return (
          new Date(a.faq_Published_Date).getTime() -
          new Date(b.faq_Published_Date).getTime()
        );
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-[30px] sm:text-[40px] font-bold mb-12">FAQs</h2>
      </div>

      <div className="flex flex-col items-center justify-center mb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-[#E9E9E9] rounded-[12px] mb-4 w-full max-w-[611px] px-[7px]"
        >
          <input
            type="text"
            placeholder="Search FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent text-[13px] text-gray-800 focus:outline-none pl-[4px]"
          />
          <button type="submit">
            <img
              src="/images/searchicon.png"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>
      </div>

      <div className="flex justify-end mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.documentId}
            className="bg-white border border-gray-300 p-6 rounded-[8px] flex flex-col justify-between"
            style={{ minHeight: "152px" }}
          >
            {/* {faq.FaqAnswer?.map((block: any, i: number) => (
              <p
                key={i}
                className="text-[14px] sm:text-base md:text-lg text-black mb-4"
              >
                {block.children?.map((child: any) => child.text).join(" ")}
              </p>
            ))} */}
            <p>{faq.question}</p>
            <div className="flex justify-between mt-auto pt-4 text-[11px] text-blue-600 font-semibold">
              <span>{faq.faq_category?.Name || "Unknown"}</span>
              <span>FAQ</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
