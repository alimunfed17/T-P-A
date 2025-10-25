from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .schemas import Trip
from .gemini_trip_client import generate_trips
from .gemini_plan_client import generate_plans

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/trips", response_model=list[Trip])
def read_trips():
    return generate_trips()

@app.post("/planner")
async def planner(request: Request):
    return await generate_plans(request)