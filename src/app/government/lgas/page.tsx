import { fetchLGAPage } from "@/lib/clients/about.client";

const Lga = async () => {
  const data = await fetchLGAPage();
  const anambraLGAs = data.about.lgas["anambra state"];

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">LGA</th>
            <th className="border px-4 py-2 text-left">Towns</th>
          </tr>
        </thead>
        <tbody>
          {anambraLGAs.map((lga) => (
            <tr key={lga.lga}>
              <td className="border px-4 py-2 font-medium">{lga.lga}</td>
              <td className="border px-4 py-2">{lga.towns.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lga;
