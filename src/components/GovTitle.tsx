import styles from "./GovTitle.module.css"; // or "@/styles/..." if styles folder

export default function GovTitle() {
  return (
    <div className="relative mt-[96.46px] inline-block">
      <h1 className={styles.govTitle}>
        <div className={styles.line}>GOVERNMENT OF</div>
        <div className={styles.line}>
          <span className="relative inline-block">
            <span className={styles.anambraBg}></span>
            <span className={styles.anambraText}>ANAMBRA</span>
          </span>{" "}
          STATE
        </div>
      </h1>
    </div>
  );
}
