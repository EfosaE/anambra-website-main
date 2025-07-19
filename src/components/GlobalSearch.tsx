"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Article } from "@/types/graphql/articles";
const categories = ["All", "Ministry", "Agency", "Services", "Documents"];

export default function GlobalSearch({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   console.log(articles);
  // }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search logic here
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black">Global Search</h2>
      </div>

      {/* Row 1 - Search form and category links */}
      <div className="flex flex-col items-center justify-center mb-10">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-[#E9E9E9] rounded-full mb-4 w-full max-w-[748px] pl-[7px]">
          <input
            type="text"
            placeholder="How to resolve business issues..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="grow bg-transparent px-2 text-[13px] text-gray-800 focus:outline-none"
            style={{ borderRadius: "12px" }}
          />
          <button
            type="submit"
            className="text-gray-600 hover:text-black transition text-xl pr-[7px]">
            <img
              src="/images/arrowglobal.svg"
              alt="Search"
              className="w-[47px] h-[54px] object-contain"
            />
          </button>
        </form>

        {/* Category Tabs */}
        <div className="flex gap-6 justify-between w-full max-w-[748px] mb-6">
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

      {/* Row 2 - Search Results */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-light-gray p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold mb-2">
                  Result Title {index + 1}
                </h4>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
                  modi.
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 text-[11px] font-medium text-blue-600">
                <a href="#">Security</a>
                <a href="#">FAQ</a>
              </div>
            </div>
          ))}
        </div> */}

      {/* Row 2 - Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles &&
          articles.map((article, index) => (
            <div
              key={index}
              className="bg-white border border-light-gray p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold mb-2">{article.title}</h4>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4 text-[11px] font-medium text-blue-600">
                <a href="#">{article.__typename}</a>
                <a href="#">FAQ</a>
              </div>
            </div>
          ))}
      </div>

      {/* Bottom Link with 748px width */}
      <div className="flex justify-center w-full max-w-[748px] mx-auto mt-6">
        <a
          href="#"
          className="text-blue-600 hover:underline text-sm font-semibold">
          See More Results
        </a>
      </div>
    </section>
  );
}
