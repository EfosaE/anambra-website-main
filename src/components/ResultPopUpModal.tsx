"use client";

import { Article } from "@/types/graphql/articles";
import { FAQ } from "@/types/graphql/faq";
import { Mda } from "@/types/graphql/mda";
import { Service } from "@/types/graphql/service";
import { X } from "lucide-react";
import ServiceDetails from "./services/ServiceDetails";
import FAQDetails from "./faq/FAQDetails";

type ResultModalProps = {
  item: Article | FAQ | Service | Mda;
  onClose: () => void;
};

export default function ResultPopUpModal({ item, onClose }: ResultModalProps) {
  console.log("Modal item type:", item.__typename, item); // ✅ debug here

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 overflow-auto py-10">
      <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black focus:outline-none">
          <X size={20} />
        </button>

        {/* FAQ Block */}
        {item.__typename === "Faq" && (
          <FAQDetails faq={item} isOpen={true}/>
        )}

        {/* Article Block */}
        {item.__typename === "Article" && (
          <>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            {item.cover?.url && (
              <img
                src={item.cover.url}
                alt={item.cover.alternativeText || ""}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <div className="text-sm text-gray-700 space-y-4">
              {item.blocks?.map((block, idx) => {
                switch (block.__typename) {
                  case "ComponentSharedRichText":
                    return (
                      <div
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: block.body }}
                      />
                    );
                  case "ComponentSharedQuote":
                    return (
                      <blockquote
                        key={idx}
                        className="italic text-gray-600 border-l-4 pl-4">
                        {block.body}
                      </blockquote>
                    );
                  case "ComponentSharedMedia":
                    return (
                      <div key={idx}>
                        <img
                          src={block.file.url}
                          alt="Media"
                          className="rounded-md"
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <div className="mt-6 flex justify-between text-[11px] text-blue-600 font-semibold">
              <span>{item.category.name}</span>
              <span>Article</span>
            </div>
          </>
        )}

        {/* Service Block */}
        {item.__typename === "Service" && (
          <ServiceDetails documentId={item.documentId} />
        )}

        {/* MDA Block */}
        {item.__typename === "Mda" && (
          <>
            <h2 className="text-lg font-semibold mb-4">{item.name}</h2>

            {item.Mandate && (
              <div className="mb-4">
                <h3 className="font-semibold text-sm">Mandate</h3>
                {item.Mandate.map((block, idx) =>
                  block.type === "paragraph" ? (
                    <p key={idx} className="text-sm text-gray-700">
                      {block.children.map((child, childIdx) => (
                        <span key={childIdx}>{child.text}</span>
                      ))}
                    </p>
                  ) : null
                )}
              </div>
            )}

            {item.Functions && (
              <div className="mb-4">
                <h3 className="font-semibold text-sm">Functions</h3>
                {item.Functions.map((block, idx) =>
                  block.type === "paragraph" ? (
                    <p key={idx} className="text-sm text-gray-700">
                      {block.children.map((child, childIdx) => (
                        <span key={childIdx}>{child.text}</span>
                      ))}
                    </p>
                  ) : null
                )}
              </div>
            )}

            {item.websitelink && (
              <p className="text-sm text-blue-600 mt-2">
                Website:{" "}
                <a
                  href={item.websitelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline">
                  {item.websitelink}
                </a>
              </p>
            )}

            <div className="mt-6 text-[11px] text-blue-600 font-semibold">
              MDA
            </div>
          </>
        )}
      </div>
    </div>
  );
}
