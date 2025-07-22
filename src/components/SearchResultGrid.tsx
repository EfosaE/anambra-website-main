import { Article } from "@/types/graphql/articles";
import { FAQ } from "@/types/graphql/faq";
import { Service } from "@/types/graphql/service";

export type SearchResultWrapper = {
  documentId: string;
  keyword: string;
  articles: Article[];
  faqs: FAQ[];
  services: Service[];
};

type Props = {
  results: SearchResultWrapper[];
};

export default function SearchResultGrid({ results }: Props) {
  const flattened = results.flatMap((item) => [
    ...item.articles,
    ...item.faqs,
    ...item.services,
  ]);

  return (
    <>
      <div className="flex justify-center py-4">
        <p className="text-center text-lg">
          <span className="text-primary font-bold">{flattened.length}</span>{" "}
          results found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flattened.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </>
  );
}

function Card({ item }: { item: Article | FAQ | Service }) {
  if ("title" in item) {
    // Article
    return (
      <div className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col">
        <h3 className="font-bold text-lg underline">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {item.description}
        </p>

        <div className="text-xs md:text-base  text-golden mt-auto">
          <p>From Article</p>
        </div>
      </div>
    );
  }

  if ("question" in item) {
    // FAQ
    return (
      <div className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col">
        <h3 className="font-bold text-lg underline">{item.question}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {item.FaqAnswer?.[0]?.children?.[0]?.text?.slice(0, 120)}...
        </p>

        <div className="text-xs md:text-base text-golden mt-aut0">
          <p>From FAQs</p>
        </div>
      </div>
    );
  }

  if ("Name" in item && "Description" in item) {
    // Service
    return (
      <div className="border rounded-xl overflow-hidden shadow-sm p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col">
        <h3 className="font-bold text-lg underline">{item.Name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {item.Description}
        </p>
        {/* <div className="text-xs text-gray-500 mt-2">
          {item.email || item.phone || item.WebsiteLink || "No contact info"}
        </div> */}
        <div className="text-xs md:text-base text-golden mt-auto">
          <p>From Service</p>
        </div>
      </div>
    );
  }

  return null;
}

// function Card({ item }: { item: Article | FAQ | Service }) {
//   console.log("Item:", item);

//   if ("title" in item) {
//     console.log("Rendering article:", item.title);
//     return <div>Article card: {item.title}</div>;
//   }

//   if ("question" in item) {
//     console.log("Rendering FAQ:", item.question);
//     return <div>FAQ card: {item.question}</div>;
//   }

//   if ("Name" in item && "Description" in item) {
//     console.log("Rendering Service:", item.Name);
//     return <div>Service card: {item.Name}</div>;
//   }

//   console.warn("Unknown item:", item);
//   return null;
// }
