## Backend Docs

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Backend](#running-the-backend)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

---

# Features
- Pre-generates a set of trips by Gemini API
- Generates an itinerary for a set of user inputs from user with Gemini API
- Stores the itineraries in Database
- Adds weather forecast with the itinerary.

---

## Tech Stack
- **FASTAPI**: Framework for building APIs
- **GEMINI API**: API for creating itineraries and pre-generated trips
- **MONGODB**: Storing Itineraries as collections
- **VISUALCROSSINGAPI**: API for weather forecast in itinerary generation

---

## Project Structure
```bash
backend/
├─ app/
│  ├─ db.py
│  ├─ gemini_plan_client.py
│  ├─ gemini_trip_client.py
│  ├─ main.py
│  ├─ prompts.py               
│  └─ schemas.py
├─ .env.example
├─ .gitignore
├─ README.md
└─ requirements.txt
```

---

## Setup & Installation

#### 1. Create a Virtual Environment:
```bash
cd backend

python3 -m venv venv
# or
python -m venv venv
```


#### 1. Install dependencies:
```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file in the backend root with the following:
```bash
GEMINI_API_KEY=your api key
WEATHER_API_KEY=your api key
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=travel_planner
COLLECTION_NAME=itineraries
```
- `GEMINI_API_KEY` — Generate and paste Gemini API Key.
- `WEATHER_API_KEY` — Generate and paste Weather API Key.
- `MONGODB_URL` — MongoDB connection string.

---

## Running the Backend

Start the server in development mode:
```bash
source venv/bin/activate && uvicorn app.main:app -reload
# or
venv\Scripts\activate && uvicorn app.main:app --reload
```

Start the production server:
```bash
uvicorn app.main:app --reload
```

Server will run at:
```bash
http://localhost:8000
```

---

## API Endpoints
| Method | Endpoint | Description | Request Body / Params |
|--------|----------|-------------|----------------------|
| POST | `/planner` | Input user Inputs (string) | `application/json` |
| GET | `/trips` | Get all pre-generated trips | None |



### Example: Generate Itinerary by User Inputs 
```bash
POST /planner
```

### Example: Fetch Pre-Generated Trips
```bash
GET /trips
```

---

## Database Schema
### CreditReport (Mongoose)
```bash
{
  Itinerary: {
    id: number,
    timestamp: Date,
    user_message: String,
    history: String,
    ai_response: String,
  },
}
```

---

## Error Handling
- No Response → 400 Bad Request
- Itinerary Generation errors → 500 Internal Server Error
- Trip Generation errors → 500 Internal Server Error
- MongoDB errors → 500 Internal Server Error

