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
      className={styles.section}
      style={{ backgroundImage: `url('${backgroundImage.url}')` }}
    >
      {/* <div className={styles.sectionInner}>
        <div className={styles.glassCard}>
          <h2 className={styles.title}>Light of the Nation</h2>
          <div className={styles.statWrapper}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.statBox}>
                <h2 className={styles.statValue}>{stat.value}</h2>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
