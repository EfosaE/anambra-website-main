"use client";
import { useEffect, useState } from "react";
import styles from "./GovTitle.module.css";

const taglines = [
  "Serving Ndi Anambra, Every Day",
  "Smart Governance for a Smarter Anambra",
  "Anambra Online | Fast, Transparent, Connected",
  "A New Anambra. A Better Tomorrow",
];

export default function GovTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setIsVisible(false);

      // After fade-out duration, change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 500); // match this with CSS transition time
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-[96.46px] inline-block text-center">
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

    

      <p
        className={`mt-16 italic text-sm md:text-lg text-[#3f3f3f]
 transition-opacity duration-500 ease-in-out ${
   isVisible ? "opacity-100" : "opacity-0"
 }`}>
        {taglines[currentIndex]}
      </p>
    </div>
  );
}

