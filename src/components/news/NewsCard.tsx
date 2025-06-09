import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  summary: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}

export default function NewsCard({
  title,
  summary,
  tags,
  imageUrl,
  slug,
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="block">
      <article className="space-y-4 rounded-lg overflow-hidden transition p-4">
        {/* Image */}
        <div className="w-full h-[217px] overflow-hidden rounded-lg mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover mx-auto"
          />
        </div>

        {/* Tags - scrollable on small screens */}
        <div className="flex gap-2 px-1 mb-3 overflow-x-auto scrollbar-none whitespace-nowrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#DADADA] text-gray-800 font-semibold px-3 py-1 rounded-[4px]
                         text-[11px] md:text-[12px] inline-block"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Summary */}
        <h3 className="text-[15px] md:text-[20px] font-semibold text-black mb-2">
          {summary}
        </h3>

        {/* Date */}
        <time
          className="text-[15px] md:text-[20px] text-gray-500 block"
          dateTime={new Date().toISOString()}
        >
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </time>
      </article>
    </Link>
  );
}
