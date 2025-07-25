"use client";

import { Shield, Building2, Flame, Landmark, Users } from "lucide-react";

const contact = [
  {
    title: "Citizens Engagement Platform (CEP)",
    extra:
      "Please Click on the CEP Title to access over 50 MDAs of the Anambra State Government",
    email: "info@anambrastate.gov.ng",
    icon: Users,
  },
  {
    title: "Anambra ICT Agency",
    address: "Anambra State Government House, Agu-Awka, Awka South LGA",
    phone: "08034136503",
    email: "ict@anambrastate.gov.ng",
    icon: Shield,
  },
  {
    title: "Ministry of Homeland Affairs",
    address:
      "Anambra State Government House, Onitsha – Enugu Express Way, Agu-Awka, Awka South LGA",
    phone: "(123) 456-7891",
    icon: Flame,
  },
  {
    title: "Ministry of Justice",
    address: "Chief Jerome Udoji Secretariat Complex, Secretariat Road, Awka",
    phone: "(123) 456-7891",
    hours: "8:00 a.m. – 5:00 p.m.",
    icon: Landmark,
  },
  {
    title: "Ministry of Industry",
    address: "Chief Jerome Udoji Secretariat Complex, Secretariat Road, Awka",
    phone: "09064395160",
    extra: `GRM Hotlines: 08102693200; 0903450057`,
    email: "grm@anambrastate.gov.ng; chuka.okeke@anambrastate.gov.ng",
    icon: Building2,
  },
];

const ContactANSG = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-3xl font-bold text-black text-center">
        Contact ANSG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 min-h-screen">
        {contact.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 flex gap-4 items-center"
            >
              <div className="text-yellow-500 shrink-0">
                <Icon size={48} />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                {card.address && (
                  <p className="text-sm text-gray-700">{card.address}</p>
                )}
                {card.phone && (
                  <p className="text-sm text-gray-700">Phone: {card.phone}</p>
                )}
                {card.email && (
                  <p className="text-sm text-gray-700">
                    Email:{" "}
                    {card.email.split(";").map((mail, i) => (
                      <span key={i} className="block">
                        {mail.trim()}
                      </span>
                    ))}
                  </p>
                )}
                {card.hours && (
                  <p className="text-sm text-gray-700">Hours: {card.hours}</p>
                )}
                {card.extra && (
                  <p className="text-sm text-gray-700 mt-1">{card.extra}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ContactANSG;
