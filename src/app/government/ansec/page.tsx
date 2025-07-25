import { fetchAnsecPage } from "@/lib/clients/about.client";

const ExecutiveCouncil = async () => {
  const data = await fetchAnsecPage();

  if (!data) {
    return <div>Error loading Executive Council data</div>;
  }

  const { executive_council } = data.about;

  return (
    <main className="mx-auto container py-4">
      <h2 className="text-2xl font-bold my-4 text-center">ANSG Executive Council.</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {executive_council.map((member) => {
          const profile = member.profile_picture?.[0];

          return (
            <div
              key={member.name}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow">
              {profile && (
                <img
                  src={profile.url}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-[120px] h-[120px] mb-4"
                />
              )}
              <h2 className="text-lg font-semibold text-center">
                {member.name}
              </h2>
              <p className="text-gray-600 text-center">{member.designation}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ExecutiveCouncil;
