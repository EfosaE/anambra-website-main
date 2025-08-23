import { HomepageData } from "@/types/graphql/homepage";
import clsx from "clsx";
import { Shield, TrendingUp, Users, Scale, Leaf } from "lucide-react";

const iconMap = {
  Shield,
  TrendingUp,
  Users,
  Scale,
  Leaf,
} as const;

// const solutionPillars = [
//   {
//     id: 1,
//     title: "Security, Law & Order",
//     subtitle: "Addressing insecurity decisively and ensuring public safety",
//     description:
//       "Implementing a digital police force, enhancing human capital in security services, and developing skills exportable beyond our borders.",
//     icon: Shield,
//     color: "bg-yellow-500",
//   },
//   {
//     id: 2,
//     title: "Economic Transformation & Infrastructure",
//     subtitle:
//       "Power and infrastructure as the backbone of a strong Anambra economy",
//     description:
//       "Driving economic growth through strategic infrastructure projects, reliable power supply, and innovation aligned with the 'Anambra Standard'.",
//     icon: TrendingUp,
//     color: "bg-black",
//   },
//   {
//     id: 3,
//     title: "Human Capital & Social Agenda",
//     subtitle:
//       "Empowering people through education, healthcare, and social development",
//     description:
//       "Building a skilled, healthy, and empowered population capable of contributing locally and globally.",
//     icon: Users,
//     color: "bg-yellow-600",
//   },
//   {
//     id: 4,
//     title: "Governance, Rule of Law & Value System",
//     subtitle: "Transforming governance and strengthening public institutions",
//     description:
//       "Promoting transparency, accountability, and efficiency across all government processes.",
//     icon: Scale,
//     color: "bg-gray-800",
//   },
//   {
//     id: 5,
//     title: "Environment",
//     subtitle: "Creating clean, sustainable, and well-planned communities",
//     description:
//       "Preserving natural resources while developing urban and rural areas sustainably.",
//     icon: Leaf,
//     color: "bg-yellow-700",
//   },
// ];

export default function SolutionAgenda({
  AgendaSection,
}: {
  AgendaSection: HomepageData["homepage"]["AgendaSection"];
}) {
  const pillarsWithIcons = AgendaSection.agenda.map((pillar) => ({
    ...pillar,
    icon: iconMap[pillar.icon as keyof typeof iconMap] || Shield, // fallback
  }));

  return (
    <section className="pt-16 lg:mt-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            We are committed to our{" "}
            <span className="text-yellow-500">5 Solution Agenda</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Building a liveable and prosperous smart megacity — a preferred
            place to live, learn, invest, work, and enjoy.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-stretch mb-4">
          {pillarsWithIcons.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] 2xl:w-[calc(25%-1.5rem)] 
                 flex flex-col border border-gray-200 bg-white rounded-lg p-6 group hover:shadow-lg transition-all duration-300">
                <div
                  className={clsx(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                    pillar.color === "green" &&
                      "bg-green-600 hover:bg-green-500",
                    pillar.color === "black" && "bg-black hover:bg-gray-800",
                    pillar.color === "blue" && "bg-blue-600 hover:bg-blue-500",
                    pillar.color === "gray" && "bg-gray-600 hover:bg-gray-500",
                    pillar.color === "yellow" &&
                      "bg-yellow-600 hover:bg-yellow-500"
                  )}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                  {pillar.subTitle}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
