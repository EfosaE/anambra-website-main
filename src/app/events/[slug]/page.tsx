import { fetchEventById } from "@/lib/clients/event.client";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Changed: params is now a Promise
}) {
  const { slug } = await params; // Changed: await the params Promise
  console.log("Event detail page: documentId", slug);

  const event = await fetchEventById(slug);

  if (!event) {
    return notFound();
  }

  const formatDate = (rawDate: string) => {
    const dateObj = new Date(rawDate);
    const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    return `${weekday}, ${day} ${month}, ${year}`;
  };

  const formatTime = (rawDate: string) => {
    const dateObj = new Date(rawDate);
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Use link as the fallback for the image
  const imageUrl = event.link?.startsWith("http")
    ? event.link
    : "/images/placeholder.png";

  const detailSlug = event.slug || event.documentId;
  const formattedDate = formatDate(event.date);
  const formattedTime = formatTime(event.date);

  return (
    <main className="max-w-4xl mx-auto px-4 pt-[50px] pb-20">
      {/* Image */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-[20px] md:text-[32px] lg:text-[32px] font-semibold mb-2">
        {event.title}
      </h1>

      {/* Date & Location */}
      <div className="text-gray-600 mb-6 space-y-1 text-lg">
        <div className="border-2 border-gray-300 w-fit rounded-md">
          <div className="flex items-center justify-center gap-2 font-semibold px-2 py-1">
            <span>{formattedDate}</span>
            <span className="text-lg leading-none">•</span>
            <span>{formattedTime}</span>
          </div>
        </div>
        {event.location && <p className="font-semibold">{event.location}</p>}
      </div>

      {/* Description */}
      {event.description && (
        <article className="prose prose-lg max-w-none">
          <p>{event.description}</p>
        </article>
      )}
    </main>
  );
}