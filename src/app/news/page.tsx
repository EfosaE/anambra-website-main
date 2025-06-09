"use client";

import { useState } from "react";
import NewsGrid from "@/components/news/NewsGrid";
import NewsTabs from "@/components/news/NewsTab";

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <main className="max-w-7xl mx-auto px-4 pt-[50px] pb-10">
      <h1 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
        News
      </h1>

      {/* Tabbed filter menu */}
      <NewsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* News Cards */}
      <NewsGrid activeTab={activeTab} />
    </main>
  );
}
