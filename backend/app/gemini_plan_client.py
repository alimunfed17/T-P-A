import os
import json
import re
from typing import Dict, Any, List
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import Request
from fastapi.responses import StreamingResponse
from .prompts import SYSTEM_PROMPT
import requests
from datetime import datetime
from .db import collection

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

def get_weather_forecast(city: str, start_date: str, end_date: str) -> str:
    """
    Fetch daily weather forecast from Visual Crossing for the given date range.
    Returns a formatted string to inject into the AI prompt.
    """
    if not WEATHER_API_KEY:
        return ""

    url = (
        f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        f"{city}/{start_date}/{end_date}"
    )
    params = {
        "unitGroup": "metric",
        "key": WEATHER_API_KEY,
        "include": "days",
        "elements": "datetime,tempmax,tempmin,conditions,description"
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code != 200:
            return ""

        data = response.json()
        days = data.get("days", [])[:7]  

        weather_lines = []
        for day in days:
            date = day["datetime"]
            temp_max = day["tempmax"]
            temp_min = day["tempmin"]
            condition = day["conditions"]
            desc = day.get("description", "").split(".")[0]  
            weather_lines.append(f"- {date}: {condition} ({temp_min:.0f}°C to {temp_max:.0f}°C) — {desc}")

        return "Weather forecast for your trip:\n" + "\n".join(weather_lines) + "\nPlan outdoor activities accordingly."

    except Exception as e:
        print(f"Weather API error: {e}")
        return ""

async def generate_plans(request: Request) -> StreamingResponse:
    try:
        data = await request.json()
    except Exception:
        return StreamingResponse(iter(["Error: Invalid JSON"]), media_type="text/plain")

    user_message: str = data.get("message", "").strip()
    history: List[Dict[str, str]] = data.get("history", [])

    if not user_message:
        return StreamingResponse(iter(["Error: No message provided"]), media_type="text/plain")

    full_context = " ".join(
        [msg["content"] for msg in history if msg["role"] == "user"] + [user_message]
    ).lower()

    destination_match = re.search(r'\b(destination|to|in)\s*[:\-]?\s*([A-Za-z\s]+?)(?=\b|$|,|\.|\d)', full_context)
    dates_match = re.search(r'(\d{4}-\d{2}-\d{2})\s*(to|-)\s*(\d{4}-\d{2}-\d{2})', full_context)

    weather_info = ""
    if destination_match and dates_match and WEATHER_API_KEY:
        city = destination_match.group(2).strip().title()
        start_date = dates_match.group(1)
        end_date = dates_match.group(3)

        try:
            datetime.strptime(start_date, "%Y-%m-%d")
            datetime.strptime(end_date, "%Y-%m-%d")
            weather_info = get_weather_forecast(city, start_date, end_date)
        except:
            weather_info = ""

    enhanced_system_prompt = SYSTEM_PROMPT
    if weather_info:
        enhanced_system_prompt += f"\n\nIMPORTANT WEATHER CONTEXT (include in plan):\n{weather_info}"

    chat_history = []
    for msg in history:
        role = "user" if msg["role"] == "user" else "model"
        chat_history.append({"role": role, "parts": [{"text": msg["content"]}]})

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash-lite",
        system_instruction=enhanced_system_prompt
    )

    chat = model.start_chat(history=chat_history)

    ai_response = ""

    def stream_response():
        nonlocal ai_response
        try:
            response_stream = chat.send_message(user_message, stream=True)
            for chunk in response_stream:
                if chunk.text:
                    ai_response += chunk.text
                    yield chunk.text
        except Exception as e:
            yield f"\nError generating response: {str(e)}"

        try:
            collection.insert_one({
                "timestamp": datetime.utcnow(),
                "user_message": user_message,
                "history": history,
                "ai_response": ai_response,
            })
        except Exception as e:
            print(f"MongoDB insert error: {e}")

    return StreamingResponse(stream_response(), media_type="text/plain")