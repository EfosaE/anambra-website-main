import { BusinessPage } from "../../types/graphql/business";
import AccordionTableSection from "./MDA/AccordionTableSection";

const SaberOfficials = ({
  saberOfficials,
}: {
  saberOfficials: BusinessPage["saberOfficials"];
}) => {
  // Define your groups (titles + designation keywords)
  const groupedSaberTable = [
    {
      title: "Saber Council Members",
      designation: "saber_reform_members",
    },
    {
      title: "Saber Reform Leaders",
      designation: "saber_reform_leaders",
    },
  ].map(({ title, designation }) => ({
    title,
    headers: ["S/N", "NAME", "DESIGNATION IN THE STATE", "DESIGNATION EoDB"],
    rows: saberOfficials
      // Filter officials whose designations include the given designation
      .filter((official) =>
        official.designations.some((d) => d.name === designation)
      )
      .map((official, index) => [
        `${index + 1}`,
        official.name,
        official.position,
        // Pick the matching designation string
        official.designations.find((d) => d.name === designation)?.name || null,
      ]),
  }));

  return (
    <div>
      <AccordionTableSection
        title="State Action on Business Enabling Reforms (SABER)"
        tablesData={groupedSaberTable}
      />
    </div>
  );
};

export default SaberOfficials;
