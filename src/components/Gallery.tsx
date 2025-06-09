// "use client";

// import { useState, useEffect } from "react";
// import clsx from "clsx";
// import Image from "next/image";

// const categories = [
//   "Festivals",
//   "Investments in Anambra",
//   "Signs & Places",
//   "Other Events",
// ];

// const galleryImages = [
//   { url: "/images/gallery/gallery.png", category: "Festivals" },
//   { url: "/images/gallery/gallery1.png", category: "Festivals" },
//   { url: "/images/gallery/gallery.png", category: "Festivals" },
//   { url: "/images/gallery/gallery1.png", category: "Festivals" },
//   { url: "/images/gallery/gallery.png", category: "Festivals" },
//   { url: "/images/gallery/gallery1.png", category: "Investments in Anambra" },
//   { url: "/images/gallery/gallery.png", category: "Investments in Anambra" },
//   { url: "/images/gallery/gallery1.png", category: "Investments in Anambra" },
//   { url: "/images/gallery/gallery.png", category: "Investments in Anambra" },
//   { url: "/images/gallery/gallery1.png", category: "Investments in Anambra" },
//   { url: "/images/gallery/gallery1.png", category: "Signs & Places" },
//   { url: "/images/gallery/gallery.png", category: "Signs & Places" },
//   { url: "/images/gallery/gallery.png", category: "Signs & Places" },
//   { url: "/images/gallery/gallery.png", category: "Signs & Places" },
//   { url: "/images/gallery/gallery.png", category: "Signs & Places" },
//   { url: "/images/gallery/gallery.png", category: "Other Events" },
//   { url: "/images/gallery/gallery.png", category: "Other Events" },
//   { url: "/images/gallery/gallery.png", category: "Other Events" },
//   { url: "/images/gallery/gallery.png", category: "Other Events" },
//   { url: "/images/gallery/gallery.png", category: "Other Events" },
// ];

// export default function Gallery() {
//   const [selectedCategory, setSelectedCategory] = useState("Festivals");
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const filteredImages = galleryImages.filter(
//     (img) => selectedCategory === "All" || img.category === selectedCategory
//   );

//   const closeOverlay = () => setActiveIndex(null);
//   const showPrev = () =>
//     setActiveIndex((prev) => (prev! > 0 ? prev! - 1 : prev));
//   const showNext = () =>
//     setActiveIndex((prev) =>
//       prev! < filteredImages.length - 1 ? prev! + 1 : prev
//     );

//   // Prevent body scroll when overlay is open
//   useEffect(() => {
//     document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
//   }, [activeIndex]);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
//         Gallery
//       </h2>

//       <div className="mt-9 w-full h-12 mb-12 overflow-x-auto scrollbar-none">
//         <div className="flex justify-center h-full gap-12 min-w-max mx-auto px-6 whitespace-nowrap">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={clsx(
//                 "text-sm sm:text-base font-semibold border-b-2 transition duration-200",
//                 selectedCategory === cat
//                   ? "text-black border-black"
//                   : "text-black border-transparent hover:text-black hover:border-black"
//               )}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//         {filteredImages.slice(0, 16).map((img, idx) => (
//           <div
//             key={idx}
//             className="cursor-pointer overflow-hidden rounded-md border hover:shadow-md transition"
//             onClick={() => setActiveIndex(idx)}
//           >
//             <img
//               src={img.url}
//               alt={`Gallery ${idx}`}
//               className="w-full h-60 object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {activeIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
//           {/* Overlay content container */}
//           <div className="relative w-full max-w-[1201px] px-4 flex justify-center items-center">
//             {/* Close Button */}
//             <button
//               onClick={closeOverlay}
//               className="absolute top-4 right-4 z-10"
//             >
//               <Image
//                 src="/images/close.png"
//                 alt="Close"
//                 width={32}
//                 height={32}
//               />
//             </button>

//             {/* Left Arrow */}
//             {activeIndex > 0 && (
//               <button onClick={showPrev} className="absolute left-4 z-10">
//                 <Image
//                   src="/images/leftarrow.png"
//                   alt="Previous"
//                   width={32}
//                   height={32}
//                 />
//               </button>
//             )}

//             {/* Image */}
//             <img
//               src={filteredImages[activeIndex].url}
//               alt="Enlarged view"
//               className="w-full max-w-[836px] max-h-[510px] object-contain rounded shadow-lg"
//             />

//             {/* Right Arrow */}
//             {activeIndex < filteredImages.length - 1 && (
//               <button onClick={showNext} className="absolute right-4 z-10">
//                 <Image
//                   src="/images/rightarrow.png"
//                   alt="Next"
//                   width={32}
//                   height={32}
//                 />
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import { fetchAllUploadFiles } from "@/lib/clients/upload.client";

const categories = [
  "Festivals",
  "Investments in Anambra",
  "Signs & Places",
  "Other Events",
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("Festivals");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const allImages = await fetchAllUploadFiles();
        // Optionally filter for gallery-specific content based on tags or naming convention
        setGalleryImages(allImages);
      } catch (err) {
        console.error("Failed to load gallery images:", err);
      }
    };

    loadImages();
  }, []);

  const filteredImages = galleryImages.filter(
    (img) =>
      selectedCategory === "All" ||
      img.caption?.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const closeOverlay = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((prev) => (prev! > 0 ? prev! - 1 : prev));
  const showNext = () =>
    setActiveIndex((prev) =>
      prev! < filteredImages.length - 1 ? prev! + 1 : prev
    );

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
        Gallery
      </h2>

      <div className="mt-9 w-full h-12 mb-12 overflow-x-auto scrollbar-none">
        <div className="flex justify-center h-full gap-12 min-w-max mx-auto px-6 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "text-sm sm:text-base font-semibold border-b-2 transition duration-200",
                selectedCategory === cat
                  ? "text-black border-black"
                  : "text-black border-transparent hover:text-black hover:border-black"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {filteredImages.slice(0, 16).map((img, idx) => (
          <div
            key={idx}
            className="cursor-pointer overflow-hidden rounded-md border hover:shadow-md transition"
            onClick={() => setActiveIndex(idx)}
          >
            <img
              src={img.url}
              alt={`Gallery ${idx}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[1201px] px-4 flex justify-center items-center">
            <button
              onClick={closeOverlay}
              className="absolute top-4 right-4 z-10"
            >
              <Image
                src="/images/close.png"
                alt="Close"
                width={32}
                height={32}
              />
            </button>

            {activeIndex > 0 && (
              <button onClick={showPrev} className="absolute left-4 z-10">
                <Image
                  src="/images/leftarrow.png"
                  alt="Previous"
                  width={32}
                  height={32}
                />
              </button>
            )}

            <img
              src={filteredImages[activeIndex].url}
              alt="Enlarged view"
              className="w-full max-w-[836px] max-h-[510px] object-contain rounded shadow-lg"
            />

            {activeIndex < filteredImages.length - 1 && (
              <button onClick={showNext} className="absolute right-4 z-10">
                <Image
                  src="/images/rightarrow.png"
                  alt="Next"
                  width={32}
                  height={32}
                />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
