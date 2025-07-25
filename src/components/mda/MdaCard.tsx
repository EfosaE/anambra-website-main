"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { Mda } from "@/types/graphql/mda";

const tabs = [
  "Core Mandate",
  "Functions",
  "Departments",
  "Contact",
  "Officials",
];

export default function MdaCard({ mda }: { mda: Mda }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [functionsParsed, setFunctionsParsed] = useState<any[]>([]);

  useEffect(() => {
    if (typeof mda.Functions === "string") {
      try {
        setFunctionsParsed(JSON.parse(mda.Functions));
      } catch {
        setFunctionsParsed([]);
      }
    } else {
      setFunctionsParsed(mda.Functions || []);
    }
  }, [mda.Functions]);

  // Before the return statement in your component
  if (activeTab === "Core Mandate") {
    console.log(mda); // ✅ Log once per render when tab is active
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer bg-white border border-gray-300 rounded-lg p-5 flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/icons/ministries.svg"
            alt="Icon"
            className="w-10 h-7 shrink-0"
          />
          <h4 className="text-base font-semibold leading-tight">{mda.name}</h4>
        </div>

        {Array.isArray(mda.Mandate) &&
          mda.Mandate.map((block: any, i: number) => (
            <p
              key={i}
              className="text-[13px] text-gray-700 leading-relaxed mb-2">
              {block.children?.map((child: any) => child.text).join("")}
            </p>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center">
          <div className="relative bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg p-6">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setActiveTab(tabs[0]);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-black">
              <X size={20} />
            </button>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "pb-2 text-sm font-semibold transition",
                    activeTab === tab
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  )}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-3 text-[13px] text-gray-700">
              <h3 className="text-xl font-bold mb-2">{mda.name}</h3>

              {activeTab === "Core Mandate" && (
                <div>
                  {Array.isArray(mda.Mandate) && mda.Mandate.length > 0 ? (
                    mda.Mandate.map((block, i) => (
                      <p key={i}>
                        {block.children
                          ?.map((child: any) => child.text)
                          .join("")}
                      </p>
                    ))
                  ) : (
                    <p>Not available.</p>
                  )}
                </div>
              )}

              {activeTab === "Functions" && (
                <div>
                  {Array.isArray(functionsParsed) &&
                  functionsParsed.length > 0 ? (
                    functionsParsed.map((block, i) => {
                      if (
                        block.type === "list" &&
                        Array.isArray(block.children)
                      ) {
                        return (
                          <ul key={i} className="list-disc ml-5 space-y-1">
                            {block.children.map((item: any, j: number) => {
                              const text = item.children
                                ?.map((child: any) => child.text)
                                .join("");
                              return <li key={j}>{text}</li>;
                            })}
                          </ul>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p>Not available.</p>
                  )}
                </div>
              )}

              {activeTab === "Departments" && (
                <ul className="list-disc ml-5 space-y-1">
                  {mda.departments?.length ? (
                    mda.departments.map((dept) => (
                      <li key={dept.documentId}>
                        <strong>{dept.name}</strong>: {dept.Description}
                      </li>
                    ))
                  ) : (
                    <li>No departments available.</li>
                  )}
                </ul>
              )}

              {activeTab === "Contact" && (
                <>
                  {mda.MdaContact ? (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {mda.MdaContact.address && (
                        <li>
                          <strong>Address:</strong> {mda.MdaContact.address}
                        </li>
                      )}
                      {mda.MdaContact.email && (
                        <li>
                          <strong>Email:</strong> {mda.MdaContact.email}
                        </li>
                      )}
                      {mda.MdaContact.phone && (
                        <li>
                          <strong>Phone:</strong> {mda.MdaContact.phone}
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No contact info available</p>
                  )}
                </>
              )}

              {activeTab === "Officials" && (
                <>
                  {mda.Officials.some(
                    (official) =>
                      official.name ||
                      official.designation ||
                      official.Contact?.email ||
                      official.Contact?.phone
                  ) ? (
                    <ul className="space-y-4">
                      {mda.Officials.map((official, index) => {
                        // Skip officials with no useful data
                        if (
                          !official.name &&
                          !official.designation &&
                          !official.Contact?.email &&
                          !official.Contact?.phone
                        ) {
                          return null;
                        }

                        return (
                          <li
                            key={index}
                            className="text-sm text-gray-700 border-b pb-2">
                            {official.name && (
                              <p>
                                <strong>Name:</strong> {official.name}
                              </p>
                            )}
                            {official.designation && (
                              <p>
                                <strong>Designation:</strong>{" "}
                                {official.designation}
                              </p>
                            )}
                            {official.Contact?.email && (
                              <p>
                                <strong>Email:</strong> {official.Contact.email}
                              </p>
                            )}
                            {official.Contact?.phone && (
                              <p>
                                <strong>Phone:</strong> {official.Contact.phone}
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No Officials info provided</p>
                  )}
                </>
              )}
            </div>

            <div className="text-center mt-6">
              <a
                href={mda?.websitelink || "#"}
                target="_blank"
                className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                Visit Website
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
