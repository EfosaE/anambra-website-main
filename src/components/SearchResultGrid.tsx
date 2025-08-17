"use client";

import { useState, useEffect } from "react";
import { Article } from "@/types/graphql/articles";
import { FAQ } from "@/types/graphql/faq";
import { Service } from "@/types/graphql/service";
import ResultPopUpModal from "./ResultPopUpModal"; // update path as needed

export type SearchResultWrapper = {
  documentId: string;
  keyword: string;
  articles: Article[];
  faqs: FAQ[];
  services: Service[];
};

type Props = {
  results: SearchResultWrapper[];
};

type SearchItem = Article | FAQ | Service;

export default function SearchResultGrid({ results }: Props) {
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

  const flattened = results.flatMap((item) => [
    ...item.articles,
    ...item.faqs,
    ...item.services,
  ]);

  const seen = new Set<string>();
  const uniqueFlattened = flattened.filter((item) => {
    if (!item?.documentId) return false;
    if (seen.has(item.documentId)) return false;
    seen.add(item.documentId);
    return true;
  });

  useEffect(() => {
    console.log("flattened", flattened);
    console.log("uniqueFlattened", uniqueFlattened);
  }, [uniqueFlattened]);

  return (
    <>
      <div className="flex justify-center py-4">
        <p className="text-center text-lg">
          <span className="text-primary font-bold">
            {uniqueFlattened.length}
          </span>{" "}
          results found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueFlattened.map((item, idx) => (
          <Card key={idx} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {selectedItem && (
        <ResultPopUpModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export function Card({
  item,
  onClick,
}: {
  item: Article | FAQ | Service;
  onClick: () => void;
}) {
  if ("title" in item) {
    return (
      <div
        onClick={onClick}
        className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      >
        <h3 className="font-bold text-lg underline">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {item.description}
        </p>
        <div className="text-xs md:text-base text-blue-600 mt-auto">
          <p>Article</p>
        </div>
      </div>
    );
  }

  if ("question" in item) {
    return (
      <div
        onClick={onClick}
        className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      >
        <h3 className="font-bold text-lg underline">{item.question}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {item.faqAnswer?.[0]?.children?.[0]?.text?.slice(0, 120)}...
        </p>
        <div className="text-xs md:text-sm text-blue-600 mt-auto">
          <p>FAQ</p>
        </div>
      </div>
    );
  }

  if ("Name" in item && "Description" in item) {
    return (
      <div
        onClick={onClick}
        className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      >
        <h3 className="font-bold text-lg underline">{item.Name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {item.Description}
        </p>
        <div className="text-xs md:text-sm text-blue-600 mt-auto">
          <p>Service</p>
        </div>
      </div>
    );
  }

  return null;
}
