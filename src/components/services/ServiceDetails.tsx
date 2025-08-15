"use client";

import { serviceQueries } from "@/lib/graphql/queries/service";
import { useQuery } from "@apollo/client";
// import { GET_SERVICE_BY_ID } from "@/lib/queries/service.queries";
// import React from "react";

export default function ServiceDetails({ documentId }: { documentId: string }) {
  const { data, loading, error } = useQuery(serviceQueries.byId, {
    variables: { documentId },
  });

  if (loading) {
    return <p className="text-sm text-gray-500">Loading service details...</p>;
  }

  if (error || !data?.service) {
    return (
      <p className="text-sm text-red-600">
        Unable to load service. Please try again later.
      </p>
    );
  }

  const service = data.service;

  return (
    <div className="bg-white p-6 rounded-[8px] flex flex-col justify-between transition-all duration-300 ease-in-out">
      <h2 className="text-xl font-bold mb-2">{service.Name}</h2>

      <p className="text-gray-700 text-sm mb-4">{service.Description}</p>

      {service.ServicesDetails?.map((block: any, idx: number) => {
        if (block.type === "paragraph") {
          return (
            <p key={idx} className="text-sm text-gray-800 mb-2">
              {block.children.map((child: any, i: number) => (
                <span key={i}>{child.text}</span>
              ))}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={idx}
              className={`list-${
                block.format === "ordered" ? "decimal" : "disc"
              } ml-6 mb-3 text-sm text-gray-800`}>
              {block.children.map((li: any, liIdx: number) => (
                <li key={liIdx}>
                  {li.children.map((child: any, i: number) => (
                    <span key={i}>{child.text}</span>
                  ))}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}

      {(service.phone || service.email) && (
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          {service.phone && (
            <p>
              <span className="font-semibold">Phone:</span> {service.phone}
            </p>
          )}
          {service.email && (
            <p>
              <span className="font-semibold">Email:</span> {service.email}
            </p>
          )}
        </div>
      )}

      {service.websiteLink && (
        <div className="mt-4">
          <a
            href={service.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
            Visit Website
          </a>
        </div>
      )}

      <div className="mt-6 text-[11px] text-blue-600 font-semibold">
        Service
      </div>
    </div>
  );
}
