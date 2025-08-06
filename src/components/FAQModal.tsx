// components/FAQModal.tsx
"use client";

import { X } from "lucide-react";
import { FAQ } from "@/types/graphql/faq";
import FAQDetails from "./faq/FAQDetails";
import { useEffect } from "react";
// import FAQCard from "./faq/FAQDetails";

type FAQModalProps = {
  faq: FAQ;
  onClose: () => void;
};

export default function FAQModal({ faq, onClose }: FAQModalProps) {
  useEffect(() => {
    console.log(faq);
  }, [faq]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg p-6 mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black focus:outline-none">
          <X size={20} />
        </button>

        {/* Question */}
        {/* <h2 className="text-lg font-semibold mb-4">{faq.question}</h2> */}

        <FAQDetails faq={faq} isOpen={true}/>

        {/* Answer */}
        {/* <div className="text-gray-700 text-sm space-y-2">
          {faq.faqAnswer?.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx}>
                  {block.children?.map((child, childIdx) => (
                    <span key={childIdx}>{child.text}</span>
                  ))}
                </p>
              );
            }
            return null;
          })}
        </div> */}

        {/* Tags / Footer */}
        {/* <div className="mt-6 flex justify-between text-[11px] text-blue-600 font-semibold">
          <span>{faq.tags?.[0]?.Name || "General"}</span>
          <span>FAQ</span>
        </div> */}
      </div>
    </div>
  );
}
