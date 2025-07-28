"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatBanner() {
  return (
    <nav className="w-full bg-golden/80 shadow-md px-4 py-2 flex items-center justify-center">
      <Link
        href="/chat"
        className="flex items-center gap-2 underline text-white text-xs md:text-sm font-medium rounded-full transition-all duration-200 hover:text-gray-100"
      >
        <MessageCircle className="w-5 h-5 underline" />
        <span>
          Click to Chat with Our Smart Assistant – Serving Ndi Anambra Better
        </span>
      </Link>
    </nav>
  );
}
