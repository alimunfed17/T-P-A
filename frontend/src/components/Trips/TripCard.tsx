import { Trip } from "../../types/types";

type TripCardProps = {
  trip: Trip;
  onClick: () => void;
};

const fallbackImage = "https://placehold.co/600x400";

export default function TripCard({ trip, onClick }: TripCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl 
        transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 
        overflow-hidden w-80 hover:shadow-blue-500"
      onClick={onClick}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={trip.image_url || fallbackImage}
          alt={trip.title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>

      <div className="p-5 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-2xl font-bold text-blue-700">{trip.title}</h2>
        <p className="text-gray-700 font-medium">{trip.destination}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full">
            {trip.duration_days} days
          </span>
          <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-full">
            {trip.traveler_type}
          </span>
          <span className="text-sm text-white bg-yellow-500 px-2 py-1 rounded-full">
            {trip.budget}
          </span>
        </div>

        <p className="mt-3 text-gray-600 line-clamp-3">{trip.highlights}</p>
        <p className="mt-2 text-gray-500 text-sm">
          Best time to visit: <span className="font-medium">{trip.best_time_to_visit}</span>
        </p>
      </div>
    </div>
  );
}
