import GovTitle from "./GovTitle";
import SearchComponent from "./SearchComponent";

export default function Hero() {
  return (
    <section className="text-center px-4 relative overflow-hidden font-instrument">
      {/* Welcome Text Container */}
      <GovTitle />

      {/* Search Section */}
      <div className="mt-[66px] sm:mt-[72px] md:mt-[115px]">
        <SearchComponent />
      </div>
    </section>
  );
}
