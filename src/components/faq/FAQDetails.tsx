import { FAQ } from "@/types/graphql/faq";
import clsx from "clsx";

type FAQCardProps = {
  faq: FAQ;
  isOpen?: boolean;
  onToggle?: () => void;
  onReadMore?: () => void;
  className?: string;
};

export default function FAQDetails({
  faq,
  isOpen = false,
  onToggle,
  onReadMore,
  className,
}: FAQCardProps) {
  return (
    <div
      className={clsx(
        "bg-white p-6 rounded-[8px] flex flex-col justify-between transition-all duration-300 ease-in-out",
        {
          "min-w-[360px] h-[180px] overflow-hidden hover:shadow-md": !isOpen,
          "min-w-[360px] h-auto": isOpen,
        },
        className
      )}
      role="article"
      aria-labelledby={`faq-question-${faq.documentId}`}>
      {/* Question */}
      <p
        id={`faq-question-${faq.documentId}`}
        className={clsx(
          "text-[14px] sm:text-base md:text-lg font-medium text-black mb-2 leading-relaxed hover:underline",
          { "cursor-pointer line-clamp-2 hover:text-primary": !!onToggle }
        )}
        onClick={onReadMore}>
        {faq.question?.trim() || "Question not available"}
      </p>

      {/* Answer Preview */}
      {isOpen && (
        <div className="text-sm text-gray-700 mb-6 leading-relaxed">
          <div className="line-clamp-3">
            {faq.faqAnswer?.length ? (
              faq.faqAnswer.map((block, i) =>
                block.type === "paragraph"
                  ? block.children?.map((child, j) => (
                      <span key={j}>{child.text}</span>
                    ))
                  : null
              )
            ) : (
              <p>Answer not available</p>
            )}
          </div>

          {onReadMore && (
            <div className="mt-2">
              <button
                onClick={onReadMore}
                className="text-[#DA9617] hover:underline text-xs font-medium">
                Read more →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between  pt-4 text-[11px] text-blue-600 font-semibold">
        <span className="truncate mr-2">
          {faq.tags?.[0]?.Name?.trim() || "General"}
        </span>
        <span>FAQ</span>
      </div>
    </div>
  );
}
