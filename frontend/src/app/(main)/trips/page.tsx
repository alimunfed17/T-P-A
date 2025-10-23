"use client";

import TripCard from "@/components/Trips/TripCard";
import TripHeader from "@/components/Trips/TripHeader";
import TripModal from "@/components/Trips/TripModal";
import { Trips, Trip as Itinerary } from "@/types/types";
import { useEffect, useState } from "react";

export default function Trip() {
  const [trips, setTrips] = useState<Trips>([]);
  const [selectedTrip, setSelectedTrip] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/trips");
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto p-4 flex justify-center">
          <TripHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 flex flex-wrap justify-center gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-60">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-gray-200"></div>
          </div>
        ) : trips.length > 0 ? (
          trips.map((trip) => (
            <TripCard
              key={trip.title}
              trip={trip}
              onClick={() => setSelectedTrip(trip)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No trips available.</p>
        )}
      </div>

      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </div>
  );
}
