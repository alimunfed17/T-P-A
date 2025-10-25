import ChatInfo from "./ChatInfo";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">AI</span>
        </div>
        <h1 className="text-lg font-medium text-gray-900">
          Plan Your Itinerary
        </h1>
      </div>
      <ChatInfo />
    </div>
  );
}
