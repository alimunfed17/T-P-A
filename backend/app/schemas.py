from pydantic import BaseModel
from typing import List

class Activity(BaseModel):
    time: str
    description: str
    location: str
    notes: str

class DailyPlan(BaseModel):
    day_number: int
    morning: Activity
    lunch: Activity
    afternoon: Activity
    evening: Activity
    transportation_tips: str

class Trip(BaseModel):
    title: str
    destination: str
    duration_days: int
    traveler_type: str
    budget: str
    highlights: str
    best_time_to_visit: str
    overview: str
    daily_plan: List[DailyPlan]
    additional_recommendations: List[str]
    travel_notes: str
    references: List[str]
    image_url: str