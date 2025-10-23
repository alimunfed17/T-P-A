export type TimeBlock = {
  time: string;
  description: string;
  location: string;
  notes: string;
};

export type Day = {
  day_number: number;
  morning: TimeBlock;
  lunch: TimeBlock;
  afternoon: TimeBlock;
  evening: TimeBlock;
  transportation_tips: string;
};

export type Trip = {
  title: string;
  destination: string;
  duration_days: number;
  traveler_type: string;
  budget: string;
  highlights: string;
  best_time_to_visit: string;
  overview: string;
  daily_plan: Day[];
  additional_recommendations: string[];
  travel_notes: string;
  references: string[];
  image_url: string;
};

export type Trips = Trip[];
