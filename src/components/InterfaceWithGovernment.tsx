import Link from "next/link";

export default function InterfaceWithGovernment() {
  return (
    <section className="px-4 md:px-20 py-16">
      <div className="max-w-[1201px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[32px] font-bold text-black leading-tight">
            <p>Interface with your</p>
            <p>Government</p>
          </h2>
        </div>

        {/* Image Row with overlays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {/* First Image Block */}
          <div
            className="relative w-[324px] h-[324px] md:w-full md:h-[433px] rounded-[8px] overflow-hidden shadow-md bg-cover bg-center mx-auto"
            style={{ backgroundImage: "url('/images/gov1.png')" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute top-[100px] md:top-[160px] left-6 text-white">
              <h2 className="text-[20px] sm:text-[32px] font-bold leading-[24px] sm:leading-[36px] mb-4">
                <span>Use the SolutionLens</span> <br />
                <span>Platform</span>
              </h2>

              <p className="text-[12px] sm:text-[16px] max-w-xs mb-6">
                Everything you need to know about ongoing government projects.
              </p>
              <a href="https://lens.anambrastate.gov.ng/" target="_blank" className="cursor-pointer text-[12px] sm:text-[16px] mt-4 flex items-center justify-center gap-2 w-[247px] h-[48px] bg-[#FFB732] text-black font-semibold rounded-md">
                Get Started
                <img
                  src="/images/arrowup.png"
                  alt="Arrow Up"
                  className="w-4 h-4"
                />
              </a>
            </div>
          </div>

          {/* Second Image Block */}
          <div
            className="relative w-[324px] h-[324px] md:w-full md:h-[433px] rounded-[8px] overflow-hidden shadow-md bg-cover bg-center mx-auto"
            style={{ backgroundImage: "url('/images/gov2.png')" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute top-[100px] md:top-[160px] left-6 text-white">
              <h2 className="text-[20px] sm:text-[32px] font-bold leading-[24px] sm:leading-[36px] mb-4">
                <span>Ease of Doing </span> <br />
                <span>Business in Anambra</span>
              </h2>

              <p className="text-[12px] sm:text-[16px] max-w-xs mb-6">
                Everything you need to know to begin running an enterprise in
                Anambra state
              </p>
              <Link href="/business" target="_blank" className="text-[12px] sm:text-[16px] mt-6 flex items-center justify-center gap-2 w-[247px] h-[48px] bg-[#FFB732] text-black font-semibold rounded-md">
                Explore Now
                <img
                  src="/images/arrowup.png"
                  alt="Arrow Up"
                  className="w-4 h-4"
                />
              </Link >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
