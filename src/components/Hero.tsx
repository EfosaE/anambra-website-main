import GovTitle from "./GovTitle";
import SearchComponent from "./SearchComponent";



export interface HeroProps {
  keywords?: { keyword: string }[];
}

export default function Hero({ keywords }: HeroProps) {
  return (
    <section className="text-center px-4 relative overflow-hidden font-instrument">
      {/* Welcome Text Container */}
      <GovTitle />

      {/* Search Section */}
      <div className="mt-[66px] sm:mt-[32px] md:my-[72px]">
        <SearchComponent keywords={keywords} />
      </div>
    </section>
  );
}
