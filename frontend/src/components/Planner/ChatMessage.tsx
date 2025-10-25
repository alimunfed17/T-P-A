interface ChatMessageProps {
  sender: "user" | "system";
  message: string;
}

export default function ChatMessage({ sender, message }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`group flex gap-3 px-6 py-4 ${
        isUser ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100 transition-colors`}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">You</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">AI</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {isUser ? "You" : "Assistant"}
          </span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </div>
      </div>
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}