import { fetchFooterSection } from "@/lib/clients/homepage.client";
import { FooterQueryResponse } from "@/types/graphql/homepage";
import Link from "next/link";

export default async function Footer() {
  const footerData = await fetchFooterSection();
  // console.log("footer data", footerData);

  if (!footerData) {
    return (
      <footer className="text-red-400 pt-12 mt-16">
        <div className="text-center">Footer data not available</div>
      </footer>
    );
  }

  function groupLinksByCategory(
    links: FooterQueryResponse["homepage"]["FooterSection"]["FooterLinks"]
  ) {
    return links?.reduce<
      Record<
        string,
        FooterQueryResponse["homepage"]["FooterSection"]["FooterLinks"]
      >
    >((acc, link) => {
      const category = link.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    }, {});
  }
  const grouped = groupLinksByCategory(footerData.FooterLinks);

  // console.log(grouped);

  return (
    <footer className="relative text-white pt-12 mt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/african_pattern.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1F2937]/95" />

      {/* Content - positioned above background and overlay */}
      <div className="relative z-10">
        {/* Top Section: 2 columns for mobile, 4 for large screens */}
        {/* <div className="mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 w-fit"> */}
        <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 w-fit">
          {Object.entries(grouped).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold mb-2">
                {category
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </h4>
              <ul className="space-y-1 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.link} className="text-white hover:underline hover:text-[#DA9617]">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar with Line and Centered Text */}
        <div className="text-center py-4 mt-10 relative">
          {/* Line behind the text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full border-t border-[#B3B0AD]" />
          </div>

          {/* Centered copyright text with spacing */}
          <span className="relative z-10 bg-[#1F2937] bg-opacity-80 px-6 text-sm text-gray-300">
            &copy; Copyright {new Date().getFullYear()}, All Rights Reserved |
            Anambra State Government
          </span>
        </div>

        <Link href="https://ict.anambrastate.gov.ng" target="_blank" className="text-center block text-sm p-4" >
          <span className="text-[#DA9617] font-semibold">Powered By - </span>Anambra State ICT Agency
        </Link>
      </div>
    </footer>
  );
}
