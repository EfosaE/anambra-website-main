"use client";

import { useEffect, useState } from "react";
import { fetchAllNotices } from "@/lib/clients/notice.client";
import { fetchAllEvents } from "@/lib/clients/event.client";

interface Notice {
  documentId: string;
  title: string;
  description: string;
  date: string;
}

interface Event {
  documentId: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [noticesData, eventsData] = await Promise.all([
        fetchAllNotices(),
        fetchAllEvents(),
      ]);

      setNotices(noticesData?.slice(0, 5) || []);
      setEvents(eventsData?.slice(0, 4) || []);
    };

    loadData();
  }, []);

  return (
    <section className="px-4 md:px-20 py-16 bg-[#F9F9F9]">
      <div className="max-w-[1201px] mx-auto">
        <div className="grid md:grid-cols-11 gap-8">
          {/* Notice Board */}
          <div className="md:col-span-6 space-y-4 bg-linear-to-r from-[#FFC7C3] to-[#FFDEC2] p-8 rounded-[12px]">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/images/icons/notice.svg"
                alt="Notice Icon"
                className="w-10 h-10"
              />
              <h3 className="text-[18px] sm:text-xl font-black text-black">
                Notice Board
              </h3>
            </div>

            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice.documentId}
                  className="text-black border-b border-b-[rgba(0,0,0,0.1)] pb-4"
                >
                  <h3 className="text-[15px] sm:text-lg font-semibold">
                    {notice.title}
                  </h3>
                  <p className="sm:text-sm text-gray-600 text-[13px]">
                    {new Date(notice.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notices available.</p>
            )}
          </div>

          {/* Events */}
          <div className="md:col-span-5 space-y-4 bg-[#FFDEC2] p-8 rounded-[12px]">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/images/icons/event.svg"
                alt="Event Icon"
                className="w-10 h-10"
              />
              <h3 className="text-[18px] sm:text-xl font-black text-black">
                Upcoming Events
              </h3>
            </div>

            {events.length > 0 ? (
              events.map((event, idx) => (
                <div
                  key={event.documentId}
                  className="text-black border-b border-b-[rgba(0,0,0,0.1)] pb-6"
                >
                  <h3 className="text-[15px] sm:text-lg font-semibold">
                    {event.title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-gray-700">
                    {new Date(event.date).toLocaleDateString()} · {event.time}
                  </p>
                  <p className="text-[13px] sm:text-sm text-gray-700">
                    {event.location}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
