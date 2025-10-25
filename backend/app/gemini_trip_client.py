from typing import List
from .schemas import Trip
from google import genai
import os
import json
from .prompts import TRIPS_PROMPT
from dotenv import load_dotenv
import re

load_dotenv()

GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def generate_trips() -> List[Trip]:
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=TRIPS_PROMPT
    )

    if not response.candidates:
        print("No Trips")
        return []
    
    raw_text = response.candidates[0].content.parts[0].text

    cleaned_text = re.sub(r"```(?:json)?\n|\n```", "", raw_text).strip()

    try:
        trips_data = json.loads(cleaned_text)
        trips = [Trip(**trip) for trip in trips_data]
        return trips
    except json.JSONDecodeError as e:
        print("Error parsing AI output", e)
        return []