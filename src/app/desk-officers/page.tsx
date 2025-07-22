"use client";

const emergencySections = [
  {
    title: "DISTRESS CALL",
    contacts: [
      {
        label: "Depression/Suicide Prevention Lines",
        numbers:
          "08062106493, 08092106493, 09080217555, 09034400009, 08111909909, 07013811143",
      },
      { label: "Ambulance", numbers: "112, 199" },
      { label: "Rape", numbers: "080072732255" },
      {
        label: "Federal Road Safety Commission (FRSC)",
        numbers: "122, 07002255372",
      },
    ],
  },
  {
    title: "SECURITY",
    contacts: [
      {
        label: "Police Emergency Numbers",
        numbers: "01-4931260, 01-4978899",
      },
      {
        label: "Inspector General of Police (IGP) -SMS Only",
        numbers: "0805966666",
      },
      {
        label: "State Security Service (SSS)",
        numbers: "08132222105–9",
      },
      {
        label: "Rapid Response Squad",
        numbers: "070-55350249, 070-35068242, 080-79279349",
      },
    ],
  },
  {
    title: "HEALTH FACILITIES/SERVICES",
    contacts: [
      {
        label: "Free Anti Natal Care & Delivery Services (Complaints)",
        numbers: "08035657865, 09063227856, 09064865839",
      },
    ],
  },
  {
    title: "Human Rights Violation/Domestic Violence",
    contacts: [
      {
        label: "Child Abuse HelpLine",
        numbers: "08085753932, 08102678442",
      },
      {
        label: "Violation of Girls and Women Helpline",
        numbers: "080072732255",
      },
      {
        label: "Child Domestic Violence",
        numbers: "08107572829, 08131643208",
      },
      {
        label: "Adult Domestic Violence",
        numbers: "08102678443, 08057542266",
      },
      {
        label:
          "Nigerian Army Human Rights NAHR (If you are harassed by Army officials)",
        numbers: "08160134303, 08161507644",
      },
    ],
  },
];

const EmergencyNumbers = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-3xl font-bold text-black text-center">
        Emergency Numbers
      </h2>

      <div className="p-6 min-h-screen">
        {emergencySections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-lg shadow mb-6 overflow-hidden"
          >
            <h3 className="bg-gray-200 text-gray-800 font-bold text-lg px-4 py-2">
              {section.title}
            </h3>
            <table className="w-full">
              <tbody>
                {section.contacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/2">
                      {contact.label}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {contact.numbers || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencyNumbers;
