import {
  BusinessPage,
  BusinessPageMdaProcesses,
  Fee,
} from "@/types/graphql/business";
import AccordionTableSection from "./MDA/AccordionTableSection";
import ParagraphBlock from "./MDA/ParagraphBlock";
import TabbedStepsSection from "./MDA/TabbedStepsSection";

interface MdaProcessesProps extends BusinessPageMdaProcesses {}

export default function MdaProcessesSection({
  mdaProcesses: processes,
 
  // fees,
}: MdaProcessesProps) {


  // const groupedFeesTables = Object.entries(
  //   fees.reduce((acc, fee) => {
  //     if (!acc[fee.LGA]) acc[fee.LGA] = [];
  //     acc[fee.LGA].push(fee);
  //     return acc;
  //   }, {} as Record<string, Fee[]>)
  // ).map(([lga, fees], lgaIndex) => ({
  //   title: `${lga} & its environs`,
  //   headers: ["S/N", "LAYOUT/ESTATE", "RESIDENTIAL", "COMMERCIAL"],
  //   rows: fees.map((fee, index) => {
  //     const residential =
  //       fee.cost.find((c) => c.type === "residential")?.price ?? "-";
  //     const commercial =
  //       fee.cost.find((c) => c.type === "commercial")?.price ?? "-";
  //     return [
  //       `${index + 1}`,
  //       fee.Estate,
  //       `${residential.toLocaleString()}/M2`,
  //       `${commercial.toLocaleString()}/M2`,
  //     ];
  //   }),
  // }));

  return (
    <section id="MDA Processes" className="w-full mt-[20px] overflow-hidden">
      <div className="w-full pt-[68px] px-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-[#B3B0AD]" />
          <h2 className="text-[24px] italic font-playfair text-center mx-6 whitespace-nowrap">
            MDA Processes
          </h2>
          <div className="flex-1 h-px bg-[#B3B0AD]" />
        </div>
      </div>

      {/* Centered Content Container */}
      <div className="sm:px-6 lg:px-6">
        {processes.map((process) => {
          if (process.information && process.steps.length === 0) {
            return (
              <ParagraphBlock
                key={process.heading}
                heading={process.heading}
                content={process.information}
              />
            );
          } else if (process.information && process.steps.length > 0) {
            return (
              <div>
                <ParagraphBlock
                  heading={process.heading}
                  content={process.information}
                />

                <TabbedStepsSection
                  // heading={process.Heading}
                  steps={process.steps}
                />
              </div>
            );
          } else if (!process.information && process.steps.length > 0) {
            return (
              <TabbedStepsSection
                heading={process.heading}
                steps={process.steps}
              />
            );
          }
        })}

       

        {/* Section 9 */}
        {/* <AccordionTableSection
          title="Fees for Certificate of Occupancy (C of O) for State Land"
          tablesData={groupedFeesTables}
        /> */}
      </div>
    </section>
  );
}
