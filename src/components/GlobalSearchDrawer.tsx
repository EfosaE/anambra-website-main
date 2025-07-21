"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import clsx from "clsx";
// import GlobalSearch from "./GlobalSearch";
import { useModal } from "@/context/modal-context";

import GlobalSearch from "./GlobalSearch";
import { ArrowLeft } from "lucide-react";

const categories = ["All", "Ministry", "Agency", "Services", "Documents"];

export default function GlobalSearchDrawer() {
  const { isOpen, closeModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300",
          { hidden: !isOpen }
        )}
        onClick={closeModal}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed inset-0 h-full w-full bg-background z-[110] transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}>
        {/* Header */}
        <div className="pt-10 flex items-center justify-between border-b border-gray-200 flex-col">
          <div className="w-6 sm:w-8" />
          <div className="flex-1 flex justify-center">
            <h2 className="text-base sm:text-xl font-semibold text-center max-w-xs sm:max-w-md">
              Your hub for <span className="text-[#DA9617]">trusted</span> news,{" "}
              <span className="text-[#DA9617]">public</span> services, and key{" "}
              <span className="text-[#DA9617]">government</span> updates.
            </h2>
          </div>

          {/* Heading */}
          <div className="flex items-center justify-center gap-0.5 m-8">
            <FiSearch size={24} className="inline text-[#DA9617]" />
            <h2 className="text-3xl font-bold text-black">
              <span className="text-[#DA9617]">Global</span> Search
            </h2>
          </div>

          {/* Row 1 - Search form and category links */}
          <div className="flex flex-col items-center justify-center">
            {/* Search Form */}
            <div className="flex items-center gap-3 w-4/5 max-w-md px-6">
              <input
                type="text"
                placeholder="Enter a search term to begin..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none shadow-sm"
              />
              {/* <button className="bg-[#DA9617] text-black text-sm px-4 py-2 rounded-xl hover:bg-[#c88412] transition">
                Ask Anambra AI
              </button> */}
            </div>

            {/* Category Tabs */}
            <div className="flex gap-6 justify-between w-full max-w-[748px]">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={clsx(
                    "h-[48px] w-[136.8px] text-sm font-semibold transition flex items-center justify-center",
                    selectedCategory === category
                      ? "border-b-2 border-black text-black"
                      : "text-black hover:text-blue-600"
                  )}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 pt-4">
          <button
            onClick={closeModal}
            aria-label="Back"
            className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft size={24} className="text-primary" />
            <span className="text-sm text-primary">Back</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-172px)]">
          {/* Adjust height if needed depending on your header size */}
          <GlobalSearch query={query} />
        </div>
      </div>
    </>
  );
}
