"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (msg: string) => void;
  disabled?: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 200;

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || disabled) return;
    onSend(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 w-full bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow px-4 py-3"
      >
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gemini to plan your next trip..."
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none border-none outline-none text-base placeholder-gray-500 bg-transparent min-h-[24px] disabled:opacity-50"
          style={{ maxHeight: `${maxHeight}px`, overflowY: prompt.length > 100 ? "auto" : "hidden" }}
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            prompt.trim() && !disabled
              ? "bg-black hover:bg-gray-800 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <IoIosSend size={18} />
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-2">
        Press Enter to send • Shift+Enter for new line
      </p>
    </div>
  );
}