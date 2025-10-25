import TripInfo from "./TripInfo";

export default function ChatHeader() {
  return (
    <div className="flex items-center px-6 space-x-2 bg-black rounded-xl max-w-sm justify-center">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white">
          Plan Your Itinerary
        </h1>
      </div>
      <TripInfo />
    </div>
  );
}
