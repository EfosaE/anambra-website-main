export default function Footer() {
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
        <div className="mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 w-fit">
          {/* Column 1 */}
          <div className="min-w-[159px]">
            <h4 className="text-[14px] font-semiBold mb-4">MAIN LINKS</h4>
            <ul className="space-y-2">
              <li className="text-[14px]">Ease of doing business</li>
              <li className="text-[14px]">All services</li>
              <li className="text-[14px]">MDAs</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="min-w-[160px]">
            <h4 className="text-[14px] font-semiBold mb-4">
              EMERGENCY SERVICES
            </h4>
            <ul className="space-y-2">
              <li className="text-[14px]">Make complaints</li>
              <li className="text-[14px]">Report a robbery</li>
              <li className="text-[14px]">Report rape</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="min-w-[159px]">
            <h4 className="text-[14px] font-semiBold mb-4">E-SERVICES</h4>
            <ul className="space-y-2">
              <li className="text-[14px]">Solution Lens</li>
              <li className="text-[14px]">Solution Lens</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="min-w-[160px]">
            <h4 className="text-[14px] font-semiBold mb-4">HELP & SUPPORT</h4>
            <ul className="space-y-2">
              <li className="text-[14px]">Give feedback</li>
              <li className="text-[14px]">Contact the Govt</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Line and Centered Text */}
        <div className="text-center py-10 mt-10 relative">
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
      </div>
    </footer>
  );
}
