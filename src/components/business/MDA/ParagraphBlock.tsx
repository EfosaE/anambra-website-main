type ParagraphBlockProps = {
  heading: string;
  content: string;
  linkLabel?: string;
  linkUrl?: string;
  id?: string;
};

export default function ParagraphBlock({
  heading,
  content,
  linkLabel,
  linkUrl,
  id,
}: ParagraphBlockProps) {
  return (
    <section id={id} className="space-y-6 mt-[72px] max-w-[800px] mx-auto">
      <h2 className="text-[20px] text-center">{heading}</h2>

      <div className="bg-[#BBBBBB]/20  rounded p-6 text-sm text-gray-700 space-y-4">
        <p>{content}</p>

        {linkUrl && linkLabel && (
          <p>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {linkLabel}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
