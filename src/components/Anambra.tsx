"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const sidebarLinks = [
  "About State",
  "Past Governors",
  "Key Landmarks",
  "Climate",
  "Culture",
  "Tourism",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Economy",
];

const topTabs = ["About State", "Past Governors", "Key Landmarks"];

const moreParagraphs = [
  {
    title: "Dynamic Culture",
    text: "The people of Anambra are known for their colorful festivals, rich traditions, and strong community spirit that is passed from one generation to another.",
  },
  {
    title: "Sustainable Infrastructure",
    text: "From expanding road networks to power and digital connectivity, Anambra continues to invest in long-term infrastructure projects for its citizens.",
  },
  {
    title: "Emerging Technology and Innovation",
    text: "The state supports tech hubs and start-ups, positioning itself as the next innovation destination in Africa.",
  },
];

const scrollableImages = [
  "/images/anambra_landmark1.jpg",
  "/images/anambra_landmark2.jpg",
  "/images/anambra_landmark3.jpg",
];

export default function Anambra() {
  const [activeTab, setActiveTab] = useState("About State");

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">
        Welcome To Anambra
      </h2>

      {/* Top Navigation Tabs */}
      {/* <div className="flex flex-wrap justify-center gap-8 sm:gap-10 border-b border-gray-200 mb-10 px-6 pb-4">
        {topTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "pb-2 text-sm sm:text-base font-bold transition",
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-800 hover:text-blue-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-2">
          <div className="flex flex-col border rounded-md overflow-hidden">
            {sidebarLinks.map((link, idx) => (
              <button
                key={idx}
                className="py-3 px-4 border-b last:border-none text-left text-sm hover:bg-gray-100"
              >
                {link}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="md:col-span-10 space-y-12">
          {/* Section 1: Text Left / Image Right */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Anambra’s Strategic Position
              </h3>
              <p className="text-gray-700">
                Anambra State occupies a strategic position in Nigeria’s
                Southeast region, bordering Delta to the west, Imo to the south,
                Enugu to the east, and Kogi to the north. Its central location
                makes it an ideal hub for commerce and industry.
              </p>
            </div>
            <Image
              src="/images/anambra1.jpg"
              width={500}
              height={300}
              alt="Anambra"
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* Section 2: Image Left / Text Right */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Image
              src="/images/anambra2.jpg"
              width={500}
              height={300}
              alt="Anambra"
              className="rounded-md w-full h-auto"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Rich Cultural Heritage</h3>
              <p className="text-gray-700">
                The people of Anambra are known for their rich traditions and
                vibrant festivals. The state is home to many cultural festivals,
                which celebrate its history, artistry, and traditional
                practices, drawing visitors and tourists from around the world.
              </p>
            </div>
          </div>

          {/* Section 3: Text Left / Image Right */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">Economic Powerhouse</h3>
              <p className="text-gray-700">
                With a booming commerce hub and industrial activity, Anambra
                drives significant growth in Nigeria's economy. The state is
                known for its thriving markets, industries, and manufacturing
                sectors.
              </p>
            </div>
            <Image
              src="/images/anambra3.jpg"
              width={500}
              height={300}
              alt="Anambra"
              className="rounded-md w-full h-auto"
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-2xl font-bold">6M+</h3>
              <p className="text-sm text-gray-600">Beautiful People</p>
            </div>
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-2xl font-bold">4416</h3>
              <p className="text-sm text-gray-600">Sq Km Land Area</p>
            </div>
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-2xl font-bold">21</h3>
              <p className="text-sm text-gray-600">Local Gov't Areas</p>
            </div>
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-sm text-gray-600">Festivals Yearly</p>
            </div>
          </div>

          {/* More Paragraphs */}
          {moreParagraphs.map((para, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-2">{para.title}</h3>
              <p className="text-gray-700 text-sm">{para.text}</p>
            </div>
          ))}

          {/* Final Paragraph with Scrollable Images */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Discover Anambra’s Hidden Treasures
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              With landmarks and sights stretching from Onitsha to Nnewi,
              Anambra offers a blend of tradition and modernity across its
              unique terrain.
            </p>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {scrollableImages.map((src, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] bg-white border rounded shadow-sm overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Landmark ${idx + 1}`}
                    width={300}
                    height={200}
                    className="object-cover w-full h-[150px]"
                  />
                  <p className="p-2 text-sm text-gray-700">
                    Landmark {idx + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
