import Image from "next/image";
import Link from "next/link";

interface EventRowProps {
  title: string;
  summary: string;
  date: string;
  location: string;
  slug: string;
  image: string;
}

export default function EventRow({
  title,
  summary,
  date,
  location,
  slug,
  image,
}: EventRowProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b pb-6 mb-6">
      <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between">
        <div>
          <Link href={`/events/${slug}`}>
            <h3 className="text-xl font-bold text-gray-800 hover:underline mb-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-2">{summary}</p>
          <p className="text-sm text-gray-500 mb-1">{date}</p>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            {location}
          </h4>
        </div>

        <div className="flex justify-end">
          <Link
            href={`/events/${slug}/register`}
            className="bg-[#FFB732] text-black text-sm font-medium py-2 px-4 rounded-full hover:bg-[#eaa422] transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
