"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "./ChatContainer";

export default function ChatMessageList({
  messages,
  isLoading,
}: {
  messages: ChatMessageType[];
  isLoading: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isThinking = (txt: string) => txt.trim().startsWith("Thinking:");

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="px-6 py-8 text-center border-b border-gray-200 bg-white">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-lg font-semibold">AI</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Ready to plan your perfect trip?
        </h2>
        <p className="text-gray-600 text-sm">
          Tell me about your destination and I’ll create a personalized itinerary
        </p>
      </div>

      {/* Messages */}
      <div className="divide-y divide-gray-100">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === "model" && isThinking(msg.content) ? (
              <div className="px-6 py-3 space-y-2">
                {/* Grey italic "Thinking:" */}
                <div className="max-w-2xl mx-auto text-sm italic text-gray-500">
                  {msg.content.split("\n").map((line, j) =>
                    line.trim().startsWith("Thinking:") ? (
                      <div key={j}>{line}</div>
                    ) : null
                  )}
                </div>

                {/* Boxed question */}
                <div className="max-w-2xl mx-auto bg-white border border-gray-300 rounded-lg p-4 shadow-sm text-gray-800">
                  {msg.content.split("\n").map((line, j) =>
                    !line.trim().startsWith("Thinking:") ? (
                      <div key={j}>{line}</div>
                    ) : null
                  )}
                </div>
              </div>
            ) : (
              <ChatMessage
                sender={msg.role === "user" ? "user" : "system"}
                message={msg.content}
              />
            )}
          </div>
        ))}

        {/* Loading */}
        {isLoading && (
          <div className="px-6 py-4 bg-white flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
            <span className="ml-2 text-sm text-gray-500">Thinking…</span>
          </div>
        )}
      </div>

      <div ref={endRef} />
    </div>
  );
}
