import { fetchExecutiveCouncil } from "@/lib/clients/government.client";
import { FaEnvelope } from "react-icons/fa6";

const ExecutiveCouncil = async () => {
  const data = await fetchExecutiveCouncil();

  if (!data) {
    return <div>Error loading Executive Council data</div>;
  }

  return (
    <main className="mx-auto container py-4">
      <h2 className="text-2xl font-bold my-4 text-center">
        ANSG Executive Council.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {data.officials.map((member) => {
          const profile = member.details.profile_picture;

          return (
            <div
              key={member.details.name}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow">
              {profile && (
                <img
                  src={profile.url}
                  alt={member.details.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-[120px] h-[120px] mb-4"
                />
              )}
              <h2 className="text-lg font-semibold text-center">
                {member.details.name}
              </h2>

              <p className="text-golden text-center">
                {member.designations[0].name
                  .replace(/_/g, " ") // underscores → spaces
                  .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              </p>

              {member.details.Contact?.email && (
                <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-golden" />
                  <a
                    href={`mailto:${member.details.Contact.email}`}
                    className="underline">
                    {member.details.Contact.email}
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
