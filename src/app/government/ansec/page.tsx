import { fetchExecutiveCouncil } from "@/lib/clients/government.client";
import { User } from "lucide-react";
import { FaEnvelope } from "react-icons/fa6";

interface ExecutiveCouncilProps {
  searchParams: { tab?: string };
}

const ExecutiveCouncil = async ({ searchParams }: ExecutiveCouncilProps) => {
  // Determine active tab from query
  const activeTab = searchParams.tab ?? "All";

  const keys = ["executive_council", "public_services"];
  const data = await fetchExecutiveCouncil(keys);

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Error loading Executive Council data
      </div>
    );
  }

  // Filter based on tab
  const filteredOfficials = data.officials.filter((member: any) => {
    if (activeTab === "All") return true;
    if (activeTab === "Executive")
      return member.designations.some(
        (d: any) => d.name === "executive_council"
      );
    if (activeTab === "Public")
      return member.designations.some((d: any) => d.name === "public_services");
    return true;
  });

  return (
    <main className="mx-auto container py-4">
      <h2 className="text-2xl font-bold my-4 text-center uppercase">
        Anambra State Officials.
      </h2>

      {/* Tabs */}
      <div className="m-6 flex justify-center space-x-8">
        {["All", "Executive", "Public"].map((tab) => (
          <a
            key={tab}
            href={`?tab=${tab}`}
            className={`relative px-4 py-2 md:text-base text-sm  font-medium ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}>
            {tab}

            {/* underline inside the active tab */}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
            )}
          </a>
        ))}
      </div>

      {/* <div className="flex justify-center space-x-4 mb-6 w-full">
        {["All", "Executive", "Public"].map((tab) => (
          <a
            key={tab}
            href={`?tab=${tab}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}>
            {tab}
          </a>
        ))}
      </div> */}

      {/* Officials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {filteredOfficials.map((member: any) => {
          const profile = member.profile_picture;

          return (
            <div
              key={member.name}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow">
              {profile ? (
                <img
                  src={profile.url}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-[120px] h-[120px] mb-4"
                />
              ) : (
                <div className="w-[120px] h-[120px] mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
              )}

              <h2 className="text-lg font-semibold text-center">
                {member.name}
              </h2>

              <p className="text-golden text-center">
                {member.designations[0].name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>

              {member.contactInfo?.email && (
                <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-golden" />
                  <a
                    href={`mailto:${member.contactInfo.email}`}
                    className="underline">
                    {member.contactInfo.email}
                  </a>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ExecutiveCouncil;
