import { fetchLGAPage } from "@/lib/clients/about.client";
import { LgaPageQueryResponse } from "@/types/graphql/about";

const Lga = async () => {
  const data: LgaPageQueryResponse = await fetchLGAPage();
  const anambraLGAs = data.lgaPage.lgas.lgas;

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
            <tr key={lga.name}>
              <td className="border px-4 py-2 font-medium">{lga.name}</td>
              <td className="border px-4 py-2">{lga.towns.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lga;
