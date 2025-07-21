"use client";
import { useEffect, useRef, useState } from "react";
import { LightSectionData } from "@/types/graphql/homepage.types";
import styles from "./LightSection.module.css";

type Props = {
  stats: LightSectionData["stats"];
};

export default function LightSection({ stats }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  // This ref will store the current translateX value in vw units,
  // not just a progress percentage.
  const currentTranslateX = useRef(-50); // Start closer, e.g., -50vw

  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.1; // Adjust this value to control how fast the wrapper moves

    const animateWrapperAndCheckPosition = () => {
      // If the main animations have already triggered, stop this loop
      if (animationsTriggered) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      if (!wrapperRef.current || !statsRef.current) {
        // If refs aren't ready, reschedule and wait
        animationFrameId = requestAnimationFrame(
          animateWrapperAndCheckPosition
        );
        return;
      }

      // 2. Check the position of the stats div FIRST
      const screenCenter = window.innerWidth / 2;
      const statsRect = statsRef.current.getBoundingClientRect();
      const statsCenter = statsRect.left + statsRect.width / 2;
      const diff = Math.abs(statsCenter - screenCenter);

      // console.log({
      //   statsCenter,
      //   screenCenter,
      //   diff,
      //   currentTranslateX: currentTranslateX.current,
      // }); // For debugging

      // 3. Trigger secondary animations if condition met
      if (diff < 0.8) {
        // If centered (within threshold)
        console.log("Stats are centered, triggering secondary animations!");
        lineRef.current?.classList.add(styles.fadeOut);
        airplaneRef.current?.classList.add(styles.flyOff);
        setAnimationsTriggered(true); // Prevent re-triggering
        cancelAnimationFrame(animationFrameId); // Stop wrapper animation and polling
        return; // Important: stop here, don't move the wrapper further
      }

      // 1. Animate the wrapper (move it towards the right)
      // Only move if the stats are NOT yet centered
      currentTranslateX.current += speed; // Move a step to the right
      wrapperRef.current.style.transform = `translateX(${currentTranslateX.current}vw)`;

      // Continue animation (reschedule next frame)
      animationFrameId = requestAnimationFrame(animateWrapperAndCheckPosition);
    };

    // Set initial transform for the wrapper
    // This is important because the CSS transform might be removed.
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(${currentTranslateX.current}vw)`;
    }

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animateWrapperAndCheckPosition);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationsTriggered]); // Dependency on animationsTriggered

  return (
    <section>
      <div
        className="
    w-full h-[120vh] flex items-start justify-center relative overflow-hidden
    bg-[url('/images/light-bg-sm.svg')] 
    sm:bg-[url('/images/illustration.svg')]
    bg-cover bg-center bg-no-repeat
  ">
        {/* Moving Wrapper */}
        <div ref={wrapperRef} className={styles.wrapper}>
          {/* Stats */}
          <div
            ref={statsRef}
            className="flex items-stretch justify-center divide-x divide-gray-500">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex-1 flex flex-col justify-center text-center px-4 py-4">
                <p className="text-xl font-bold text-black lg:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Rope */}
          <div ref={lineRef} className={styles.line} />

          {/* Airplane */}
          <div ref={airplaneRef} className={styles.plane}>
            <img
              src="/images/plane.svg"
              alt="Airplane"
              width={180}
              height={140}
            />
          </div>
        </div>

        {/* Bus */}
        <div className={`scale-x-[-1] ${styles.animateBusLoop}`}>
          <img
            src="/images/bus.svg"
            alt="Bus"
            className="w-[100px] h-auto sm:w-[160px] md:w-[200px]"
          />
        </div>

        {/* Tricycle
        <div className={`scale-x-[-1] ${styles.animateBusLoop}`} style={{ right: "0" }}>
          <img
            src="/images/tricycle.svg"
            alt="tricycle"
            className="w-[100px] h-auto sm:w-[160px] md:w-[200px]"
          />
        </div> */}

        {/*Zik Bus */}
        <div className={styles.animateZikBusLoop}>
          <img
            src="/images/bus-zik.png"
            alt="Bus"
            className="w-[100px] h-auto sm:w-[160px] md:w-[200px]"
          />
        </div>
      </div>
    </section>
  );
}
