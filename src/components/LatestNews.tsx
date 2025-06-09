import Link from "next/link";

type Article = {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  Article_publish_date: string;
  is_featured: boolean;
  // optional category name if needed for badge
  categoryName?: string;
};

type LatestNewsProps = {
  articles: Article[];
};

export default function LatestNews({ articles }: LatestNewsProps) {
  return (
    <section className="px-4 md:px-20 py-16">
      <div className="max-w-[1201px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-3xl md:text-[40px] font-bold text-black">
            Latest News
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article key={article.documentId} className="space-y-3">
              <div className="w-full h-[217px] overflow-hidden rounded-lg bg-gray-200">
                {/* Replace with dynamic image if available */}
                <img
                  src="/images/soludo1.png"
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 px-1">
                {article.categoryName && (
                  <span className="bg-[#DADADA] text-gray-800 text-[11px] font-medium px-1 py-1 rounded-[4px]">
                    {article.categoryName}
                  </span>
                )}
              </div>
              <h3 className="text-[15px] sm:text-lg font-semibold text-black">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">{article.description}</p>
              <time className="text-xs text-gray-500">
                {new Date(article.Article_publish_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </time>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 py-8 md:py-7 px-4">
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-2 rounded-md bg-white border border-gray-700 text-gray-700 text-sm font-semibold leading-6 hover:bg-gray-300 transition"
          >
            View All News
            <img
              src="/images/arrowup.png"
              alt="Arrow Icon"
              className="ml-2 w-5 h-5 object-contain"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
