"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import clsx from "clsx";
// import GlobalSearch from "./GlobalSearch";
import { useModal } from "@/context/modal-context";
import { useSearchParams } from "next/navigation";
import GlobalSearch from "./GlobalSearch";
import { ArrowLeft } from "lucide-react";

const categories = ["All", "Ministry", "Agency", "Services", "Documents"];

export default function GlobalSearchDrawer() {
  const { isOpen, closeModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      setQuery(q);
    } else {
      closeModal();
    }
  }, [q]); // ✅ react to changes in the query param

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return (
    <div
      className={clsx(
        "fixed inset-0 h-full w-full bg-background z-[110] flex flex-col transition-transform duration-300 ease-in-out",
        {
          "translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        }
      )}>
      {/* Header */}
      <div className="pt-10 border-b border-gray-200">
        <div className="flex flex-col items-center justify-center px-6">
          <h2 className="text-base sm:text-xl font-semibold text-center max-w-xs sm:max-w-md">
            Your hub for <span className="text-[#DA9617]">trusted</span> news,{" "}
            <span className="text-[#DA9617]">public</span> services, and key{" "}
            <span className="text-[#DA9617]">government</span> updates.
          </h2>

          <div className="flex items-center justify-center gap-0.5 my-8">
            <FiSearch size={24} className="inline text-[#DA9617]" />
            <h2 className="text-3xl font-bold text-black">
              <span className="text-[#DA9617]">Global</span> Search
            </h2>
          </div>

          {/* Search Form */}
          <div className="flex items-center gap-3 w-4/5 max-w-md">
            <input
              type="text"
              placeholder="Enter a search term to begin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-6 justify-between w-full max-w-[748px] mt-4">
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <GlobalSearch query={query} />
      </div>
    </div>
  );
}
