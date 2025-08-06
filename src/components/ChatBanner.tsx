// "use client";

// import Link from "next/link";
// import { MessageCircle } from "lucide-react";

// export default function ChatBanner() {
//   return (
//     <nav className="w-full bg-golden/80 shadow-md px-4 py-2 flex items-center justify-center">
//       <Link
//         href="/chat"
//         className="flex items-center gap-2 underline text-white text-xs md:text-sm font-medium rounded-full transition-all duration-200 hover:text-gray-100"
//       >
//         <MessageCircle className="w-5 h-5 underline" />
//         <span>
//           Click to Chat with Our Smart Assistant – Serving Ndi Anambra Better
//         </span>
//       </Link>
//     </nav>
//   );
// }

// "use client";

import Link from "next/link";
import { IoChatbubbles } from "react-icons/io5";

export default function ChatBanner() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/chat"
        className="flex items-center gap-2 px-4 py-2 bg-golden/90 underline text-white text-xs md:text-sm font-medium rounded-full transition-all duration-200 hover:bg-golden hover:text-gray-100 shadow-lg">
        <IoChatbubbles className="text-lg" />
        Chat with our AI
      </Link>
    </div>
  );
}
