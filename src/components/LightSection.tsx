// components/LightSection.tsx
import styles from "./LightSection.module.css";
import { LightSectionData } from "@/types/graphql/homepage.types";

type Props = {
  backgroundImage: LightSectionData["backgroundImage"];
  stats: LightSectionData["stats"];
};

export default function LightSection({ backgroundImage, stats }: Props) {
  return (
    <section>
      <div className="flex justify-center items-center my-6 divide-x divide-gray-600">
        {stats.map((stat, index) => (
          <div key={stat.id} className="px-6 text-center">
            <p className="text-3xl text-black font-extrabold">{stat.value}</p>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div
        className={`
    w-full min-h-screen 
    flex items-center justify-center
    relative overflow-hidden md:mt-12
  `}
        style={{
          backgroundImage: `url('${backgroundImage.url}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}>
        {/* Your content */}
      </div>
    </section>
  );
}
