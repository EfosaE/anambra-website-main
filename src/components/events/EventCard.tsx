// components/events/EventCard.tsx

import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  slug: string;
}

export default function EventCard({
  title,
  date,
  location,
  slug,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">{date}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
      <div className="mt-4">
        <Link
          href={`/events/${slug}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
