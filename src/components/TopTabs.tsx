"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { name: "About State", href: "/anambra" },
  { name: "Past Governors", href: "/anambra/past-governors" },
  { name: "Key Landmarks", href: "/anambra/key-landmarks" },
];

const TopTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-10 mb-10 px-6 pb-4">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={clsx(
            "pb-2 text-sm sm:text-base font-bold transition",
            pathname === tab.href
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-800 hover:text-blue-600"
          )}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default TopTabs;
