"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Trip } from "../../types/types";

type TripModalProps = {
  trip: Trip | null;
  onClose: () => void;
};

export default function TripModal({ trip, onClose }: TripModalProps) {
  if (!trip) return null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1502602898657-3e91760c0358?auto=format&fit=crop&w=500&q=60";

  return (
    <Dialog.Root open={!!trip} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90%] md:w-3/4 lg:w-2/3 overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50">
        <Dialog.Close className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold">
          &times;
        </Dialog.Close>

        <Dialog.Title className="text-3xl font-bold text-blue-700 mb-2">
          {trip.title}
        </Dialog.Title>
        <Dialog.Description className="text-gray-600 mb-4">
          {trip.overview}
        </Dialog.Description>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center mb-6">
          <img
            src={trip.image_url || fallbackImage}
            alt={trip.title}
            className="w-full md:w-64 h-48 md:h-48 object-cover rounded-xl shadow-md"
          />
          <div className="flex-1">
            <p className="text-gray-700 text-lg font-medium">{trip.destination}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full">
                {trip.duration_days} days
              </span>
              <span className="text-sm text-white bg-green-500 px-3 py-1 rounded-full">
                {trip.traveler_type}
              </span>
              <span className="text-sm text-white bg-yellow-500 px-3 py-1 rounded-full">
                {trip.budget}
              </span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">
              Best time to visit: <span className="font-medium">{trip.best_time_to_visit}</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Daily Plan</h3>
          {trip.daily_plan.map((day) => (
            <div key={day.day_number} className="mb-4 border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-md">
              <h4 className="font-semibold text-gray-800 mb-1">Day {day.day_number}</h4>
              {["morning", "lunch", "afternoon", "evening"].map((part) => {
                const block = day[part as keyof typeof day] as any;
                return (
                  <div key={part} className="mb-1">
                    <strong className="capitalize text-gray-700">{part} ({block.time}):</strong>{" "}
                    <span className="text-gray-800">{block.description}</span>
                    <div className="text-sm text-gray-500 ml-2">
                      <p>Location: {block.location}</p>
                      <p>Notes: {block.notes}</p>
                    </div>
                  </div>
                );
              })}
              <p className="text-sm text-gray-600 mt-1">Transportation: {day.transportation_tips}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Additional Recommendations</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {trip.additional_recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Travel Notes</h3>
          <p className="text-gray-700">{trip.travel_notes}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">References</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {trip.references.map((ref, idx) => (
              <li key={idx}>
                <a href={ref} target="_blank" className="text-blue-500 underline">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
