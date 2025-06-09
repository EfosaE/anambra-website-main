"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import clsx from "clsx";
import GlobalSearch from "./GlobalSearch";

export default function GlobalSearchDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black bg-opacity-30 z-100 transition-opacity duration-300",
          { hidden: !open }
        )}
        onClick={onClose}
      />

      {/* Fullscreen Drawer */}
      <div
        className={clsx(
          "fixed inset-0 h-full w-full bg-background z-110 transition-transform duration-300 ease-in-out",
          {
            "translate-x-full": !open,
            "translate-x-0": open,
          }
        )}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-semibold">Search</h2>
          <button onClick={onClose} aria-label="Close search drawer">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 flex ">
          <h2 className="text-xl font-semibold">
            <img
              onClick={onClose}
              src="/images/backarrow.png"
              alt="Back Arrow"
              className="w-8 h-8"
            />
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <GlobalSearch />
        </div>
      </div>
    </>
  );
}
