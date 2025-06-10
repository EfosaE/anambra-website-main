// app/news/[slug]/page.tsx
import RelatedNews from "@/components/news/RelatedNews";
import { fetchArticleBySlug } from "@/lib/clients/articles.client";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Changed: params is now a Promise
}) {
  const { slug } = await params; // Changed: await the params Promise
  const article = await fetchArticleBySlug(slug);

  if (!article) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 pt-[50px] pb-10">
      {/* Tags */}
      <div className="flex gap-2 mb-4">
        {article.tags?.map((tag: any) => (
          <span
            key={tag.Name}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
            {tag.Name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

      {/* Publish Date */}
      <p className="text-lg font-semibold text-gray-600 mb-6">
        {article.Article_publish_date}
      </p>

      {/* Image */}
      {article.cover?.url && (
        <img
          src={article.cover.url}
          alt={article.cover.alternativeText || article.title}
          className="w-full rounded-lg mb-8"
        />
      )}

      {/* Content */}
      <article className="prose prose-lg">
        <p>{article.description}</p>
        {/* If you have rich text or full body field, render it here */}
      </article>

      {/* Related News */}
      <RelatedNews
        currentSlug={slug}
        currentTags={
          article.tags?.map((tag: { Name: string }) => tag.Name) || []
        }
      />
    </main>
  );
}
