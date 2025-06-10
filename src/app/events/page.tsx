"use client";

import { useEffect, useState } from "react";
import { fetchAllEvents } from "@/lib/clients/event.client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getEvents();
  }, []);

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

  return (
    <main className="max-w-6xl mx-auto px-4 pt-[50px] pb-20">
      <h1 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
        Events
      </h1>

      <div className="space-y-12 flex justify-center">
        <div className="w-full max-w-(--breakpoint-lg) mx-auto">
          {events.map((event: any) => {
            const imageUrl = event.cover?.url
              ? event.cover.url.startsWith("http")
                ? event.cover.url
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}${event.cover.url}`
              : "/images/placeholder.png";

            const detailSlug = event.slug || event.documentId;
            const formattedDate = formatDate(event.date);
            const formattedTime = formatTime(event.date);

            return (
              <div
                key={detailSlug}
                className="grid grid-cols-1 md:grid-cols-[325px_auto] gap-6 items-start justify-center mb-8">
                {/* Left: Image */}
                <div className="w-full h-[229px] md:h-[260px] relative rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Right: Text */}
                <div className="flex flex-col justify-start h-full pt-0 space-y-4 max-w-[500px]">
                  <div>
                    <h1 className="text-2xl md:text-[20px] font-bold">
                      {event.title}
                    </h1>
                    <p className="text-[14px] text-gray-700">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-[14px] text-gray-600 space-y-1">
                      <div className="border-2 border-gray-300 w-fit rounded-md">
                        <div className="flex items-center justify-center gap-2 font-semibold px-2 py-1">
                          <span>{formattedDate}</span>
                          <span className="text-lg leading-none">•</span>
                          <span>{formattedTime}</span>
                        </div>
                      </div>

                      <p className="font-semibold">{event.location}</p>
                    </div>

                    <button
                      onClick={() => router.push(`/events/${detailSlug}`)}
                      className="bg-[#FFB732] text-[17px] text-black font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] whitespace-nowrap w-[163px] h-[40px] sm:w-auto">
                      View Details
                      <Image
                        src="/images/arrowup.png"
                        alt="Arrow"
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
