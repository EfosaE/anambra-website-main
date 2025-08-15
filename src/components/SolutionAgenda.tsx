import { HomepageData } from "@/types/graphql/homepage";
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
            Building a liveable and prosperous smart megacity — a preferred place
            to live, learn, invest, work, and enjoy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 mb-12">
          {pillarsWithIcons.map((pillar) => {
            console.log(pillar)
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white rounded-lg p-6 h-full flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                  {pillar.subTitle}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
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
