// // components/news/RelatedNews.tsx
// import NewsCard from "./NewsCard";

// const relatedNews = [
//   {
//     title: "Free Eye Test Campaign",
//     summary: "Citizens benefit from MDA health outreach.",
//     tags: ["Health", "Events"],
//     imageUrl: "/images/soludo1.png",
//     slug: "free-eye-test-campaign",
//   },
//   {
//     title: "School Renovations Underway",
//     summary: "10 government schools undergoing upgrades.",
//     tags: ["Education", "State"],
//     imageUrl: "/images/soludo2.png",
//     slug: "school-renovations-underway",
//   },
//   {
//     title: "State Marathon Announced",
//     summary: "Anambra to host annual state-wide marathon.",
//     tags: ["Sport", "State"],
//     imageUrl: "/images/soludo1.png",
//     slug: "state-marathon-announced",
//   },
// ];

// export default function RelatedNews() {
//   return (
//     <section className="mt-20">
//       <h2 className="text-2xl font-bold mb-8">Related News</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {relatedNews.map((news) => (
//           <NewsCard key={news.slug} {...news} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { fetchAllArticles } from "@/lib/clients/articles.client";
import { Article } from "@/lib/types/graphql/articles";

interface RelatedNewsProps {
  currentSlug: string;
  currentTags: string[];
}

export default function RelatedNews({
  currentSlug,
  currentTags,
}: RelatedNewsProps) {
  const [related, setRelated] = useState<Article[]>([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const allArticles = await fetchAllArticles();

        const filtered = allArticles
          .filter((article: Article) => article.slug !== currentSlug)
          .filter((article: Article) =>
            article.tags?.some((tag) =>
              currentTags.some((curr) =>
                tag.Name.toLowerCase().includes(curr.toLowerCase())
              )
            )
          )
          .slice(0, 3); // Limit to 3 related articles

        setRelated(filtered);
      } catch (error) {
        console.error("Failed to load related news:", error);
      }
    };

    if (currentTags.length) {
      loadRelated();
    }
  }, [currentSlug, currentTags]);

  if (!related.length) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-8">Related News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((news) => {
          const imageUrl = news.cover?.url
            ? news.cover.url.startsWith("http")
              ? news.cover.url
              : `${process.env.NEXT_PUBLIC_API_BASE_URL}${news.cover.url}`
            : "/images/placeholder.png";

          const tags = news.tags?.map((tag) => tag.Name) || [];

          return (
            <NewsCard
              key={news.slug}
              title={news.title}
              summary={news.description}
              tags={tags}
              slug={news.slug}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </section>
  );
}
