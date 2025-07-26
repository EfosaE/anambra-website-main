// "use client";

// import { useState, useEffect, useCallback } from "react";
// import clsx from "clsx";
// import Image from "next/image";
// import { fetchAllUploadFiles } from "@/lib/clients/upload.client";
// import { UploadFile } from "@/types/graphql/upload";

// const categories = [
//   "All",
//   "Festivals",
//   "Investments in Anambra",
//   "Signs & Places",
//   "Other Events",
// ];

// export default function Gallery() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [galleryImages, setGalleryImages] = useState<UploadFile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const allImages = await fetchAllUploadFiles();

//         // Filter out invalid images
//         const validImages = allImages.filter(img =>
//           img.url &&
//           img.mime?.startsWith('image/') &&
//           img.width &&
//           img.height
//         );

//         setGalleryImages(validImages);
//       } catch (err) {
//         console.error("Failed to load gallery images:", err);
//         setError("Failed to load gallery images. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadImages();
//   }, []);

//   // Fixed filtering logic
//   const filteredImages = galleryImages.filter((img) => {
//     if (selectedCategory === "All") return true;

//     // Check both caption and alternativeText for category matching
//     const searchText = (img.caption || img.alternativeText || "").toLowerCase();
//     return searchText.includes(selectedCategory.toLowerCase());
//   });

//   const closeOverlay = useCallback(() => {
//     setActiveIndex(null);
//   }, []);

//   const showPrev = useCallback(() => {
//     setActiveIndex((prev) => {
//       if (prev === null || prev <= 0) return prev;
//       return prev - 1;
//     });
//   }, []);

//   const showNext = useCallback(() => {
//     setActiveIndex((prev) => {
//       if (prev === null || prev >= filteredImages.length - 1) return prev;
//       return prev + 1;
//     });
//   }, [filteredImages.length]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (activeIndex === null) return;

//       switch (e.key) {
//         case 'Escape':
//           closeOverlay();
//           break;
//         case 'ArrowLeft':
//           showPrev();
//           break;
//         case 'ArrowRight':
//           showNext();
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [activeIndex, closeOverlay, showPrev, showNext]);

//   // Prevent body scroll when overlay is open
//   useEffect(() => {
//     document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [activeIndex]);

//   if (loading) {
//     return (
//       <section className="max-w-7xl mx-auto px-4 py-10">
//         <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
//           Gallery
//         </h2>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="max-w-7xl mx-auto px-4 py-10">
//         <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
//           Gallery
//         </h2>
//         <div className="text-center text-red-600 py-8">
//           <p>{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="mt-[50px] text-[28px] md:text-[32px] lg:text-[40px] font-bold text-center mb-12">
//         Gallery
//       </h2>

//       {/* Category Filter */}
//       <div className="mt-9 w-full h-12 mb-12 overflow-x-auto scrollbar-none">
//         <div className="flex justify-center h-full gap-12 min-w-max mx-auto px-6 whitespace-nowrap">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={clsx(
//                 "text-sm sm:text-base font-semibold border-b-2 transition duration-200 pb-2",
//                 selectedCategory === cat
//                   ? "text-black border-black"
//                   : "text-gray-600 border-transparent hover:text-black hover:border-gray-300"
//               )}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Images Grid */}
//       {filteredImages.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600 text-lg">
//             No images found for "{selectedCategory}" category.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredImages.slice(0, 16).map((img, idx) => (
//             <div
//               key={`${img.documentId}-${idx}`}
//               className="cursor-pointer overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300 hover:scale-105"
//               onClick={() => setActiveIndex(idx)}
//             >
//               <div className="relative aspect-square">
//                 <Image
//                   src={img.url}
//                   alt={img.alternativeText || img.caption || `Gallery image ${idx + 1}`}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                   priority={idx < 4} // Prioritize first 4 images
//                 />
//               </div>
//               {img.caption && (
//                 <div className="p-3 bg-white">
//                   <p className="text-sm text-gray-700 truncate">{img.caption}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Show more button if there are more than 16 images */}
//       {filteredImages.length > 16 && (
//         <div className="text-center mt-8">
//           <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
//             Load More Images ({filteredImages.length - 16} remaining)
//           </button>
//         </div>
//       )}

//       {/* Lightbox Overlay */}
//       {activeIndex !== null && filteredImages[activeIndex] && (
//         <div
//           className="fixed inset-0 bg-black/55 flex items-center justify-center z-50"
//           onClick={closeOverlay}
//         >
//           <div className="relative w-full max-w-[90vw] max-h-[90vh] px-4 flex justify-center items-center">
//             {/* Close Button */}
//             <button
//               onClick={closeOverlay}
//               className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-opacity-20 rounded-full transition"
//               aria-label="Close gallery"
//             >
//               <Image
//                 src="/images/close.png"
//                 alt="Close"
//                 width={24}
//                 height={24}
//                 className="invert"
//               />
//             </button>

//             {/* Previous Button */}
//             {activeIndex > 0 && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   showPrev();
//                 }}
//                 className="absolute left-4 z-10 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
//                 aria-label="Previous image"
//               >
//                 <Image
//                   src="/images/leftarrow.png"
//                   alt="Previous"
//                   width={24}
//                   height={24}
//                   className="invert"
//                 />
//               </button>
//             )}

//             {/* Main Image */}
//             <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
//               <Image
//                 src={filteredImages[activeIndex].url}
//                 alt={filteredImages[activeIndex].alternativeText || filteredImages[activeIndex].caption || "Gallery image"}
//                 width={filteredImages[activeIndex].width || 800}
//                 height={filteredImages[activeIndex].height || 600}
//                 className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
//                 priority
//               />

//               {/* Image Caption */}
//               {filteredImages[activeIndex].caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b">
//                   <p className="text-center">{filteredImages[activeIndex].caption}</p>
//                 </div>
//               )}
//             </div>

//             {/* Next Button */}
//             {activeIndex < filteredImages.length - 1 && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   showNext();
//                 }}
//                 className="absolute right-4 z-10 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
//                 aria-label="Next image"
//               >
//                 <Image
//                   src="/images/rightarrow.png"
//                   alt="Next"
//                   width={24}
//                   height={24}
//                   className="invert"
//                 />
//               </button>
//             )}

//             {/* Image Counter */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
//               {activeIndex + 1} / {filteredImages.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import Image from "next/image";
import { fetchAllUploadFiles } from "@/lib/clients/upload.client";
import { UploadFile } from "@/types/graphql/upload";
import { X } from "lucide-react";

const categories = [
  "All",
  "Festivals",
  "Investments in Anambra",
  "Signs & Places",
  "Other Events",
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const allImages = await fetchAllUploadFiles();

        // Filter out invalid images
        const validImages = allImages.filter(
          (img) =>
            img.url && img.mime?.startsWith("image/") && img.width && img.height
        );

        setGalleryImages(validImages);
      } catch (err) {
        console.error("Failed to load gallery images:", err);
        setError("Failed to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Fixed filtering logic
  const filteredImages = galleryImages.filter((img) => {
    if (selectedCategory === "All") return true;

    // Check both caption and alternativeText for category matching
    const searchText = (img.caption || img.alternativeText || "").toLowerCase();
    return searchText.includes(selectedCategory.toLowerCase());
  });

  const closeOverlay = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || prev <= 0) return prev;
      return prev - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || prev >= filteredImages.length - 1) return prev;
      return prev + 1;
    });
  }, [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeOverlay();
          break;
        case "ArrowLeft":
          showPrev();
          break;
        case "ArrowRight":
          showNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeOverlay, showPrev, showNext]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeIndex]);

  // Reset showMore when category changes
  useEffect(() => {
    setShowMore(false);
  }, [selectedCategory]);

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <h2 className="mt-8 sm:mt-12 lg:mt-[50px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Gallery
        </h2>
        <div className="flex justify-center items-center h-40 sm:h-48 lg:h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-black"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <h2 className="mt-8 sm:mt-12 lg:mt-[50px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Gallery
        </h2>
        <div className="text-center text-red-600 py-6 sm:py-8 px-4">
          <p className="text-sm sm:text-base mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base rounded hover:bg-gray-800 transition">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const displayedImages = showMore
    ? filteredImages
    : filteredImages.slice(0, 16);

  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
      <h2 className="mt-8 sm:mt-12 lg:mt-[50px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[40px] font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
        Gallery
      </h2>

      {/* Category Filter - Improved mobile responsiveness */}
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <div className="overflow-x-auto scrollbar-hide pb-2">
          <div className="flex justify-start sm:justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12 min-w-max px-2 sm:px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  "text-xs sm:text-sm lg:text-base font-semibold border-b-2 transition duration-200 pb-1 sm:pb-2 whitespace-nowrap flex-shrink-0",
                  selectedCategory === cat
                    ? "text-black border-black"
                    : "text-gray-600 border-transparent hover:text-black hover:border-gray-300"
                )}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images Grid - Enhanced responsive grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            No images found for "{selectedCategory}" category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {displayedImages.map((img, idx) => (
            <div
              key={`${img.documentId}-${idx}`}
              className="cursor-pointer overflow-hidden rounded-md sm:rounded-lg border hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white"
              onClick={() => setActiveIndex(idx)}>
              <div className="relative aspect-square">
                <Image
                  src={img.url}
                  alt={
                    img.alternativeText ||
                    img.caption ||
                    `Gallery image ${idx + 1}`
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
                  priority={idx < 8} // Prioritize first 8 images for mobile
                />
              </div>
              {img.caption && (
                <div className="p-2 sm:p-3 bg-white">
                  <p className="text-xs sm:text-sm text-gray-700 truncate leading-tight">
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Show more button - Enhanced responsive styling */}
      {filteredImages.length > 16 && !showMore && (
        <div className="text-center mt-6 sm:mt-8 px-4">
          <button
            onClick={() => setShowMore(true)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition">
            Load More Images ({filteredImages.length - 16} remaining)
          </button>
        </div>
      )}

      {/* Lightbox Overlay - Enhanced mobile experience */}
      {activeIndex !== null && filteredImages[activeIndex] && (
        <div
          className="fixed inset-0 bg-black/90 sm:bg-black/75 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={closeOverlay}>
          <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] max-h-[95vh] sm:max-h-[90vh] flex justify-center items-center">
            {/* Close Button - Better mobile positioning */}
            <button
              onClick={closeOverlay}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full transition text-white"
              aria-label="Close gallery">
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Previous Button - Mobile optimized */}
            {activeIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full transition"
                aria-label="Previous image">
                <Image
                  src="/images/leftarrow.png"
                  alt="Previous"
                  width={20}
                  height={20}
                  className="invert sm:w-6 sm:h-6"
                />
              </button>
            )}

            {/* Main Image - Responsive sizing */}
            <div
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={filteredImages[activeIndex].url}
                alt={
                  filteredImages[activeIndex].alternativeText ||
                  filteredImages[activeIndex].caption ||
                  "Gallery image"
                }
                width={filteredImages[activeIndex].width || 800}
                height={filteredImages[activeIndex].height || 600}
                className="max-w-full max-h-[85vh] sm:max-h-[80vh] object-contain rounded shadow-2xl"
                priority
              />

              {/* Image Caption - Mobile responsive */}
              {filteredImages[activeIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 sm:p-4 rounded-b">
                  <p className="text-center text-xs sm:text-sm lg:text-base leading-tight">
                    {filteredImages[activeIndex].caption}
                  </p>
                </div>
              )}
            </div>

            {/* Next Button - Mobile optimized */}
            {activeIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full transition"
                aria-label="Next image">
                <Image
                  src="/images/rightarrow.png"
                  alt="Next"
                  width={20}
                  height={20}
                  className="invert sm:w-6 sm:h-6"
                />
              </button>
            )}

            {/* Image Counter - Mobile responsive */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              {activeIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
