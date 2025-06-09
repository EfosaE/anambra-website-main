import AccordionTableSection from "./MDA/AccordionTableSection";
import ParagraphBlock from "./MDA/ParagraphBlock";
import TabbedStepsSection from "./MDA/TabbedStepsSection";

export default function MdaProcessesSection() {
  return (
    <section id="MDAProcesses" className="w-full mt-[20px]">
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
      <div className="max-w-[1200px] mx-auto  sm:px-6 lg:px-6">
        {/* Section 1 */}
        <TabbedStepsSection
          heading="Ministry of Lands: Land Property Registration Guidelines (Individual)"
          steps={["Step 1", "Step 2", "Step 3"]}
          contents={{
            "Step 1":
              "In Accordance with the provisions of State Land Law, Cap 137 revised Laws of Anambra State 1991.Obtain the application and affidavit form for Certificate of Occupancy from:Land Use Office (LUO) Ministry of Lands, AwkaAll application forms cost #2,000 only.Fill out the form completely and accurately, leave NO section empty or unanswered.The applicant is expected to proceed to the court for sworn affidavit within the jurisdiction in the State.",
            "Step 2":
              "In Accordance with the provisions of State Land Law, Cap 137 revised Laws of Anambra State 1991.Obtain the application and affidavit form for Certificate of Occupancy from:Land Use Office (LUO) Ministry of Lands, AwkaAll application forms cost #2,000 only.Fill out the form completely and accurately, leave NO section empty or unanswered.The applicant is expected to proceed to the court for sworn affidavit within the jurisdiction in the State.",
            "Step 3": "This is the content for Step 3 under MDA Processes.",
          }}
        />

        {/* Section 2 */}
        <TabbedStepsSection
          heading="Application Process and Guidelines for Obtaining Building Permit in Anambra State"
          subheading="In pursuant of Anambra State Urban and Regional Planning Law 2018, all individuals and organizations seeking to develop their land in Anambra State can apply for a development (building) permit through the following process:"
          steps={["Step 1", "Step 2", "Step 3", "Step 4"]}
          contents={{
            "Step 1":
              "In Accordance with the provisions of State Land Law, Cap 137 revised Laws of Anambra State 1991.Obtain the application and affidavit form for Certificate of Occupancy from:Land Use Office (LUO) Ministry of Lands, AwkaAll application forms cost #2,000 only.Fill out the form completely and accurately, leave NO section empty or unanswered.The applicant is expected to proceed to the court for sworn affidavit within the jurisdiction in the State.",
            "Step 2": "Step 2 details for Building Permit.",
            "Step 3": "Step 3 details for Building Permit.",
            "Step 4": "Step 4 details for Building Permit.",
          }}
        />

        {/* Section 3 */}
        <ParagraphBlock
          heading="Anambra State Physical Planning Board: Current Schedule of Planning Fees"
          content={`The Anambra State Physical Planning Board (ANSPPB) is committed to facilitating orderly and sustainable urban development. Access to all necessary information on the current government-approved minimum rates for various types of construction permits within Anambra State are provided as required.

These rates are contingent upon factors such as the location of the building development, the size of the land, and the number of buildings involved. For precise assessments, please contact ANSPPB at the provided phone numbers: +2348062533672, +2348033561344, or +2347032428625.

Associated Payments: Please be aware of additional associated payments for services rendered by your consultants, such as Site Analysis Report, Technical Report from a registered Town Planner, Engineering Undertaking from a COREN registered/certified Engineer, Material testing (depending on the complexity of the Project), etc. The fees for nt out your e-receipt for you as issued by Anambra State Internal Revenue Service.`}
        />

        {/* Section 4 */}
        <ParagraphBlock
          heading="Application Guidelines for Obtaining Right of Way in Anambra State"
          content={`In Accordance with the provisions of ‘Anambra State Physical Planning Board No. 9 of 2013 (as amended), the Anambra State Physical Planning Board (ANSPPB) is charged with responsibility to grant approval for deployment of Telecommunication Infrastructure including but not limited to Telecommunication Towers and other infrastructure that promotes telecommunication business and connectivity in the State.

Please click on the link provided to view/download the Right of Way Application Guideline: https://anambrastate.gov.ng/documents/right-of-way-application-guideline/`}
        />

        {/* Section 5 */}
        <TabbedStepsSection
          heading="ANSAA: Billboards Installation Approval Processes and Guidelines"
          steps={["Step 1", "Step 2", "Step 3", "Step 4"]}
          contents={{
            "Step 1": "Billboard Step 1 content.",
            "Step 2": "Billboard Step 2 content.",
            "Step 3": "Billboard Step 3 content.",
            "Step 4": "Billboard Step 4 content.",
          }}
        />

        {/* Section 6 */}
        <TabbedStepsSection
          heading="ANSIPPA: Anambra State Investment Promotion & Protection Agency"
          steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]}
          contents={{
            "Step 1": "ANSIPPA Step 1.",
            "Step 2": "ANSIPPA Step 2.",
            "Step 3": "ANSIPPA Step 3.",
            "Step 4": "ANSIPPA Step 4.",
            "Step 5": "ANSIPPA Step 5.",
            "Step 6": "ANSIPPA Step 6.",
          }}
        />

        {/* Section 7 */}
        <TabbedStepsSection
          heading="Ministry of Power & Water Resources: Water Connection Processes and Guidelines"
          subheading="(For Domestic, Commercial, Government, Industrial & Institutional Use)"
          steps={["Step 1", "Step 2", "Step 3"]}
          contents={{
            "Step 1": "Water Connection Step 1.",
            "Step 2": "Water Connection Step 2.",
            "Step 3": "Water Connection Step 3.",
          }}
        />

        {/* Section 8 */}
        <AccordionTableSection
          title="State Action on Business Enabling Reforms (SABER)"
          tablesData={[
            {
              title: "Saber Council Members",
              headers: [
                "S/N",
                "NAME",
                "DESIGNATION IN THE STATE",
                "DESIGNATION EoDB",
              ],
              rows: [
                ["1", "Mr Mark Okoye", "MD ANSIPPA", "State Council Chairman"],
                [
                  "2",
                  "Mrs. Chiamaka Nnake",
                  "Commissioner, Ministry of Budget and Economic Planning",
                  "State Reform Champion",
                ],
                [
                  "3",
                  "Mr. ifeatu Onejeme",
                  "Commissioner, Ministry of Finance",
                  "Council Member",
                ],
              ],
            },
            {
              title: "Saber Reform Leaders",
              headers: [
                "S/N",
                "NAME",
                "DESIGNATION IN THE STATE",
                "DESIGNATION EoDB",
              ],
              rows: [
                ["1", "Mr Mark Okoye", "MD ANSIPPA", "State Council Chairman"],
                [
                  "2",
                  "Mrs. Chiamaka Nnake",
                  "Commissioner, Ministry of Budget and Economic Planning",
                  "State Reform Champion",
                ],
                [
                  "3",
                  "Mr. ifeatu Onejeme",
                  "Commissioner, Ministry of Finance",
                  "Council Member",
                ],
              ],
            },
          ]}
        />

        {/* Section 9 */}
        <AccordionTableSection
          title="Fees for Certificate of Occupancy (C of O) for State Land"
          tablesData={[
            {
              title: "Awka and its environs",
              headers: ["S/N", "LAYOUT/ESTATE", "RESIDENTIAL", "COMMERCIAL"],
              rows: [
                ["1", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
              ],
            },
            {
              title: "Onitsha and its environs",
              headers: ["S/N", "LAYOUT/ESTATE", "RESIDENTIAL", "COMMERCIAL"],
              rows: [
                ["1", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
              ],
            },
            {
              title: "Nnewi and its environs",
              headers: ["S/N", "LAYOUT/ESTATE", "RESIDENTIAL", "COMMERCIAL"],
              rows: [
                ["1", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
                ["2", "Executive Business District", "10,00/M2", "10,00/M2"],
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
