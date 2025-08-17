"use client";

import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  description: string;
  className: string;
};

export default function ServiceCategoryCard({
  title,
  slug,
  description,
  className,
}: Props) {
  const iconName =
    title
      .toLowerCase()
      .replace(/’/g, "")
      .replace(/[&,:]/g, "")
      .replace(/\s+/g, " ")
      .trim() + ".svg";

  const getIconNameFromSlug = (slug: string): string => {
    const cleaned = slug
      .toLowerCase()
      .replace(/-services?$/, "") // remove '-service' or '-services' at end
      .replace(/’/g, "") // remove curly apostrophes
      .replace(/[&,:]/g, "") // remove special chars
      .replace(/-/g, "_") // replace hyphens with underscore
      .replace(/\s+/g, " ") // normalize multiple spaces
      .trim();

    return `${cleaned}.svg`;
  };

  // const iconPath = `/images/icons/${iconName}`;
  const iconn = getIconNameFromSlug(slug);
  const iconPath = `/images/icons/${iconn}`;

  return (
    <Link href={`/services/${slug}`}>
      <div
        className={`group border border-gray-200 bg-white rounded-xl flex flex-col p-4 items-center text-center transition hover:border-golden cursor-pointer ${className}`}>
        <div className="w-[74px] h-[74px] mb-4 transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-1">
          <img
            src={iconPath}
            alt={title}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-[14px] text-gray-500 px-1 leading-relaxed mt-0 mb-4">
          {description}
        </p>
      </div>
    </Link>
  );
}
