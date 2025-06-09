"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackArrow() {
  const pathname = usePathname();
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768;
      const scrollTop = window.scrollY;

      if (isMobile && scrollTop <= 200) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Run on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (pathname === "/" || !showArrow) return null;

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div
      className="fixed top-16 left-0 z-50 cursor-pointer py-16 ml-4 transition-opacity duration-300"
      onClick={handleBackClick}
      style={{ left: "calc(50% - 50vw + 2rem)" }}
    >
      <img src="/images/backarrow.svg" alt="Back Arrow" className="w-6 h-6" />
    </div>
  );
}
