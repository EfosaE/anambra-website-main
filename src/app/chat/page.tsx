"use client";

import { parseRichContent } from "@/lib/utils/app.utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        text: "👋 Welcome! I’m Anambra AI — your smart assistant. Ask me anything about government services, programs, or support.",
      },
    ]);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const isOverflowing =
      scrollContainer.scrollHeight > scrollContainer.clientHeight;

    if (isOverflowing) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Show temporary "thinking" bubble
    setMessages((prev) => [...prev, { role: "assistant", text: "..." }]);

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Unknown server error");
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      let assistantText = "";

      while (true) {
        const { value, done } = await reader?.read()!;
        if (done) break;

        const chunk = decoder.decode(value);
        assistantText += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            text: assistantText,
          };
          return updated;
        });
      }
    } catch (err) {
      console.error("Stream error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="h-[85vh] px-4 flex justify-center">
      <div
        className="w-full max-w-3xl flex flex-col overflow-hidden h-full"
        ref={scrollContainerRef}>
        {/* Messages area */}
        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#d1e7dd] text-gray-800"
                    : "bg-[#f4f4f0] text-gray-700"
                }`}>
                {msg.text === "..." ? (
                  <span className="animate-pulse text-gray-400">
                    Thinking...
                  </span>
                ) : msg.role === "user" ? (
                  msg.text
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseRichContent(msg.text),
                    }}
                    className="prose prose-sm max-w-none"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 rounded-full border-t border-gray-200 pl-6 py-2 bg-white">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            className="flex-1 px-4 py-2 md:py-4 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-0"
          />

          <button
            onClick={sendMessage}
            disabled={isThinking}
            className="bg-gray-700 hover:bg-[#d1a800] text-white font-medium px-4 py-2 md:py-4 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// border border-gray-300 rounded-full focus:ring-2 focus:ring-[#e4b900] focus:outline-none
