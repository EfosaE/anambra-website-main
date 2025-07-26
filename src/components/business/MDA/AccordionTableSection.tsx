"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionTableSectionProps {
  title: string;
  tablesData: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
}

export default function AccordionTableSection({
  title,
  tablesData,
}: AccordionTableSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-[20px] text-center mb-[24px] mt-[80px]">{title}</h2>
      <div className="space-y-6">
        {tablesData.map((table, i) => (
          <div
            key={i}
            className="border border-[#B3B0AD]/40 rounded max-w-[800px] mx-auto overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(i)}
              className="w-full flex items-center justify-between text-left p-4 font-semibold text-[15px] bg-[#E2E2E2]"
            >
              <span>{table.title}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : "rotate-0"
                }`}
                size={18}
              />
            </button>
            {openIndex === i && (
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm border border-[#B3B0AD] text-left">
                  <thead>
                    <tr>
                      {table.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="border border-[#B3B0AD]/50 px-3 py-2 font-semibold text-left"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-[#B3B0AD]/50 px-3 py-2 text-left"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
