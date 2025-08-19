import Link from "next/link";
import { IoChatbubbles } from "react-icons/io5";

export default function ChatBanner() {
  return (
    // Add 'relative' to position the tooltip correctly relative to this container
    <div className="group fixed bottom-6 right-6 z-50 flex items-center">
      <Link
        href="/chat"
        className="flex items-center gap-2 rounded-full bg-golden/90 p-4 text-white shadow-lg transition-all duration-200 hover:bg-golden hover:text-gray-100"
      >
        <IoChatbubbles className="md:text-3xl text-lg 4xl:text-5xl" />
      </Link>
      
      {/* This is the tooltip */}
      <div
        className="absolute right-full top-1/2 mr-3 -translate-y-1/2 transform
                   whitespace-nowrap rounded-md bg-gray-800 px-3 py-2
                   text-sm font-medium text-white opacity-0 shadow-lg
                   transition-opacity duration-300 group-hover:opacity-100"
      >
        Chat with our AI
        
        {/* This is the arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 transform">
          <div className="h-0 w-0 border-y-4 border-y-transparent border-l-4 border-l-gray-800"></div>
        </div>
      </div>
    </div>
  );
}