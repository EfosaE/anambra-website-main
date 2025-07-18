// app/about/page.tsx

import Image from "next/image";
import { marked } from "marked";
import { fetchAboutPage } from "@/lib/clients/about.client";
import { AboutBlock } from "@/types/graphql/about";
import ScrollableSlider from "@/components/ScrollableSlider";
import TopTabs from "@/components/TopTabs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Anambra() {
  const data = await fetchAboutPage();
  const about = data?.about;
  if (!about)
    return <div className="text-center py-20">Content unavailable</div>;

  // Pair blocks: text + image together
  const blocks = about.main_page;
  const pairedBlocks: {
    text?: AboutBlock;
    media?: AboutBlock;
    slider?: AboutBlock;
  }[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    const next = blocks[i + 1];

    if (
      current.__typename === "ComponentSharedRichText" &&
      next?.__typename === "ComponentSharedMedia"
    ) {
      pairedBlocks.push({ text: current, media: next });
      i++;
    } else if (
      current.__typename === "ComponentSharedMedia" &&
      next?.__typename === "ComponentSharedRichText"
    ) {
      pairedBlocks.push({ media: current, text: next });
      i++;
    } else if (current.__typename === "ComponentSharedSlider") {
      pairedBlocks.push({ slider: current });
    } else if (current.__typename === "ComponentSharedRichText") {
      pairedBlocks.push({ text: current });
    } else if (current.__typename === "ComponentSharedMedia") {
      pairedBlocks.push({ media: current });
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-[40px] font-bold text-black text-center">
        {about.title}
      </h2>
      <TopTabs />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-2 sticky top-24 self-start">
          <div className="flex flex-col border rounded-md overflow-hidden">
            {about.main_page
              .filter((b) => b.__typename === "ComponentSharedRichText")
              .map((block, idx) => {
                const heading = block.body.match(/^##\s+(.*)/m)?.[1];
                return heading ? (
                  <Link
                    href={`#${heading}`}
                    key={idx}
                    className="py-3 px-4 border-b last:border-none text-left text-sm hover:bg-gray-100">
                    {heading}
                  </Link>
                ) : null;
              })}
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-10 space-y-12">
          {pairedBlocks.map((block, idx) => {
            if (
              block.text?.__typename === "ComponentSharedRichText" &&
              block.media?.__typename === "ComponentSharedMedia"
            ) {
              const heading = block.text.body.match(/^##\s+(.*)/m)?.[1];
              const html = marked.parse(
                block.text.body.replace(/^##\s+.*\n/, "")
              );

              const isEven = idx % 2 === 0;

              return (
                <section id={`${heading}`} key={idx} className="scroll-mt-24">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    {isEven ? (
                      <>
                        {/* Text First */}
                        <div>
                          {heading && (
                            <h3 className="inline-block text-sm mb-[10px] font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                              {heading}
                            </h3>
                          )}
                          <div
                            className="text-gray-700 space-y-4 text-sm"
                            dangerouslySetInnerHTML={{ __html: html }}
                          />
                        </div>
                        {/* Image */}
                        <div className="flex items-center h-full">
                          <Image
                            src={block.media.file.url}
                            width={block.media.file.width}
                            height={block.media.file.height}
                            alt={heading ?? "Anambra"}
                            className="rounded-md w-full h-auto"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Image First */}
                        <div className="flex items-center h-full">
                          <Image
                            src={block.media.file.url}
                            width={block.media.file.width}
                            height={block.media.file.height}
                            alt={heading ?? "Anambra"}
                            className="rounded-md w-full h-auto"
                          />
                        </div>
                        {/* Text */}
                        <div>
                          {heading && (
                            <h3 className="inline-block text-sm mb-[10px] font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                              {heading}
                            </h3>
                          )}
                          <div
                            className="text-gray-700 space-y-4 text-sm"
                            dangerouslySetInnerHTML={{ __html: html }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </section>
              );
            }

            if (block.text?.__typename === "ComponentSharedRichText") {
              const heading = block.text.body.match(/^##\s+(.*)/m)?.[1];

              // 1. Detect YouTube link
              const youtubeRegex =
                /\[?(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\]\s]+)\]?\(.*?\)/;
              const youtubeMatch = block.text.body.match(youtubeRegex);
              const youtubeUrl = youtubeMatch?.[1];

              // 2. Extract video ID
              const youtubeId = youtubeUrl?.match(
                /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
              )?.[1];

              // 3. Clean the body by removing YouTube markdown
              const cleanedBody = block.text.body
                .replace(youtubeRegex, "")
                .trim();

              // 4. Remove heading line so it’s not duplicated in HTML
              const html = marked.parse(cleanedBody.replace(/^##\s+.*\n/, ""));

              // 5. Conditional layout
              return youtubeId ? (
                // 🟩 2-column grid layout when YouTube exists
                <section
                  id={`${heading}`}
                  key={idx}
                  className="grid md:grid-cols-2 gap-6 py-[40px] items-start md:items-center scroll-mt-24">
                  <div>
                    {heading && (
                      <h3 className="inline-block text-sm font-semibold mb-[10px] text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                        {heading}
                      </h3>
                    )}
                    <div
                      className="text-gray-700 text-sm space-y-3"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </div>
                  <div className="aspect-w-16 aspect-h-9 w-full rounded-md overflow-hidden md:h-[280px]">
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={heading ?? "Embedded Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-md"
                    />
                  </div>
                </section>
              ) : (
                // 🟨 Single-column if no video
                <section
                  id={`${heading}`}
                  key={idx}
                  className="mt-10 max-w-[707px] scroll-mt-24">
                  {heading && (
                    <h3 className="inline-block mb-4 text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                      {heading}
                    </h3>
                  )}
                  <div
                    className="text-gray-700 text-sm space-y-3"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </section>
              );
            }

            if (block.media) {
              return (
                <div
                  key={idx}
                  className="flex items-center h-full justify-center">
                  {block.media.__typename === "ComponentSharedMedia" && (
                    <Image
                      src={block.media.file.url}
                      width={block.media.file.width}
                      height={block.media.file.height}
                      alt="About Anambra"
                      className="rounded-md w-full h-auto"
                    />
                  )}
                </div>
              );
            }

            if (block.slider) {
              return (
                <div key={idx} className="relative mt-12 max-w-[685px] mx-auto">
                  {block.slider.__typename === "ComponentSharedSlider" && (
                    <ScrollableSlider files={block.slider.files} />
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}
