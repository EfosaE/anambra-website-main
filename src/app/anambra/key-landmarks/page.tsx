"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import TopTabs from "@/components/TopTabs";

const landmarks = [
  {
    name: "Government House",
    image: "/images/govhouse.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Jerome Udorji Secretariat",
    image: "/images/jerome.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Ogbunike Cave",
    image: "/images/ogbunikecave.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Agulu Lake",
    image: "/images/agululade.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Ogbunike Cave",
    image: "/images/ogbunikecave.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Government House",
    image: "/images/govhouse.png",
    openTime: "OPEN 10AM - 8PM",
    text: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
];

const tabContent = {
  About: `To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.`,
  Location: `Jerome Udorji Secretary Complex, (first floor), Awka.`,
  "Opening Hours": `
MON: 10:00AM — 4:00PM
TUE: 10:00AM — 4:00PM
WED: 10:00AM — 4:00PM
THU: 10:00AM — 4:00PM
FRI: 10:00AM — 4:00PM
SAT: 10:00AM — 4:00PM
SUN: 10:00AM — 4:00PM`,
  Contact: `09073775141
mocet@demo.anambrastate.gov.ng`,
};

const KeyLandmarks = () => {
  const [activeLandmark, setActiveLandmark] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("About");

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-3xl font-bold text-black text-center">
        Key Landmarks
      </h2>

      <TopTabs />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {landmarks.map((landmark, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveLandmark(landmark.name);
              setActiveTab("About");
            }}
            className="cursor-pointer rounded-md  overflow-hidden hover:shadow-md transition"
          >
            <Image
              src={landmark.image}
              alt={landmark.name}
              width={340}
              height={300}
              className="w-full h-52 object-cover rounded-md"
            />
            <div className="pt-4 pb-4">
              <p className="text-[13px] font-medium leading-[20px] text-gray-600">
                {landmark.openTime}
              </p>
              <h3 className="text-[20px] font-semibold leading-[28px] mb-4 text-gray-900">
                {landmark.name}
              </h3>
              <p className="text-[14px] leading-[22px] text-gray-700">
                {landmark.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activeLandmark && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start p-4 md:p-6 overflow-y-auto">
          <div className="bg-white max-w-xl w-full rounded-md shadow-lg p-6 relative mt-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveLandmark(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>

            <div className="flex gap-4 border-b border-gray-200 mb-4">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as keyof typeof tabContent)}
                  className={clsx(
                    "pb-2 text-sm font-semibold",
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{activeTab}</h3>
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {tabContent[activeTab]}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-black text-white px-8 py-3 text-sm font-semibold rounded hover:bg-gray-800">
                Location on Map
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default KeyLandmarks;
