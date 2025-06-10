"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { fetchAllArticles } from "@/lib/clients/articles.client";
import { Article } from "@/types/graphql/articles";

interface NewsGridProps {
  activeTab: string;
}

export default function NewsGrid({ activeTab }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    loadArticles();
  }, []);

  // Filter articles by tag
  const filteredArticles =
    activeTab === "All"
      ? articles
      : articles.filter((article) =>
          article.tags?.some((tag) =>
            tag.Name.toLowerCase().includes(activeTab.toLowerCase())
          )
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => {
        const imageUrl = article.cover?.url
          ? article.cover.url.startsWith("http")
            ? article.cover.url
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${article.cover.url}`
          : "/images/placeholder.png";

        const tags = article.tags?.length
          ? article.tags.map((tag) => tag.Name)
          : ["News"];

        return (
          <NewsCard
            key={article.slug}
            title={article.title}
            summary={article.description}
            tags={tags}
            slug={article.slug}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
}
