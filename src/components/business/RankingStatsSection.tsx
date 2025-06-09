export default function RankingStatsSection() {
  return (
    <div className="max-w-[685px] mx-auto bg-[#F0F0F0] px-2 py-4 sm:px-4 sm:py-6 mt-[40px] mb-[40px]">
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] text-center items-start gap-y-4 sm:gap-y-0">
        {/* First Column - Sub-national */}
        <div className="text-left border-b sm:border-b-0 sm:border-r border-[#B3B0AD] pr-1 sm:pr-3 pb-2 sm:pb-0">
          <p className="italic font-playfair text-[18px] sm:text-[24px] text-gray-600 leading-snug">
            <span className="sm:block">Sub-national</span>{" "}
            <span className="sm:block">ease of doing business</span>
          </p>
        </div>

        {/* Second + Third Columns (2 in grid for mobile) */}
        <div className="grid grid-cols-2 col-span-1 sm:contents text-center gap-x-2">
          {/* 1st Ranking - has border right for mobile */}
          <div className="border-r border-[#B3B0AD] pr-2 sm:border-0 sm:border-r sm:px-3">
            <h4 className="font-bold text-[28px] sm:text-[32px]">1st</h4>
            <p className="text-[12px] sm:text-[16px] text-gray-600 leading-tight">
              in Southern Nigeria
            </p>
          </div>

          {/* 7th Ranking */}
          <div className="pl-2 sm:pl-3">
            <h4 className="font-bold text-[28px] sm:text-[32px]">7th</h4>
            <p className="text-[12px] sm:text-[16px] text-gray-600 leading-tight">
              in Nigeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
