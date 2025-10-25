"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessagesList";
import ChatInput from "./ChatInput";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortCtrl = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: "model",
        content: "Hi! I'm your AI travel planner. Where would you like to go?",
      },
    ]);
  }, []);

  const sendMessage = async (input: string) => {
    if (!input.trim() || isLoading) return;

    abortCtrl.current?.abort();
    abortCtrl.current = new AbortController();

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("http://localhost:8000/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history }),
        signal: abortCtrl.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("Network error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let ai = "";

      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        ai += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "model", content: ai };
          return copy;
        });
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: "Sorry, something went wrong. Try again?" },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-hidden">
        <ChatMessageList messages={messages} isLoading={isLoading} />
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}