import { parseMarkdown } from "@/lib/utils/app.utils";
import { marked } from "marked";

type ParagraphBlockProps = {
  heading: string;
  content: string;
  id?: string;
};

export default function ParagraphBlock({
  heading,
  content,
  id,
}: ParagraphBlockProps) {
  return (
    <section id={id} className="space-y-6 mt-[72px] max-w-[800px] mx-auto">
      <h2 className="text-[20px] text-center uppercase font-bold">{heading}</h2>

      <div className="p-6 text-sm text-gray-700 space-y-4">
        <div
          className="prose prose-sm lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
      </div>
    </section>
  );
}
