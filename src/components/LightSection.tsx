// components/LightSection.tsx
import styles from "./LightSection.module.css";
import { LightSectionData } from "@/types/graphql/homepage.types";

type Props = {
  backgroundImage: LightSectionData["backgroundImage"];
  stats: LightSectionData["stats"];
};

export default function LightSection({ backgroundImage, stats }: Props) {
  return (
    <section
      className={`
    w-full min-h-screen 
    flex items-center justify-center
    relative overflow-hidden
  `}
      style={{
        backgroundImage: `url('${backgroundImage.url}')`,
        backgroundSize: "cover", // This is the key!
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
      {/* Your content */}
    </section>
  );
}
