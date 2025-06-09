"use client";

import Image from "next/image";
import TopTabs from "@/components/TopTabs";

const governors = [
  {
    name: "Prof. Charles Chukwuma Soludo",
    year: "2022 - Present",
    party: "APGA",
    image: "/images/soludo.png",
    bio: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Chief Willie Obiano",
    year: "2014 - 2022",
    party: "APGA",
    image: "/images/obiano.png",
    bio: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Mr. Peter Obi",
    year: "2006 - 2014",
    party: "APGA",
    image: "/images/obi.png",
    bio: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Dr. Chris Ngige",
    year: "2003 - 2006",
    party: "PDP",
    image: "/images/ngige.png",
    bio: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
  {
    name: "Prof. Chinwoke Mbadinuju",
    year: "1999 - 2003",
    party: "PDP",
    image: "/images/mbadinuju.png",
    bio: "To promote culture, tourism, entertainment, hospitality, and good communication and relationship between the government and its citizens resident abroad and within the states of the Federation.",
  },
];

const PastGovernors = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-3xl font-bold text-black text-center">
        Past Governors of Anambra
      </h2>

      <TopTabs />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {governors.map((gov, idx) => (
          <div key={idx} className="rounded-md overflow-hidden transition">
            <Image
              src={gov.image}
              alt={gov.name}
              width={340}
              height={250}
              className="w-full h-52 object-cover rounded-md"
            />
            <div className="pt-4 pb-4">
              <h3 className="text-[20px] font-semibold leading-[28px] text-gray-900">
                {gov.name}
              </h3>
              <p className="text-[13px] font-medium leading-[20px] text-gray-600">
                {gov.year}
              </p>
              <p className="text-[13px] font-medium leading-[20px] text-blue-600 mb-2">
                {gov.party}
              </p>
              <p className="text-[14px] leading-[22px] text-gray-700">
                {gov.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastGovernors;
