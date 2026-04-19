from typing import List

import models
from database import SessionLocal, engine
from fastapi import Depends, FastAPI
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import CarResponse, EnthusiastRequest, GeneralRequest
from sqlalchemy.orm import Session

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Car Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:3000"],  # Specify allowed origins
    allow_credentials=True,  # Allow cookies and authorization headers
    allow_methods=["GET", "POST"],  # Allowed HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {
        "message": "Welcome to the Car Rec API. goto /docs to see the available endpoints"
    }


@app.post("/recommend/enthusiast", response_model=List[CarResponse])
def get_enthusiast_recommendation(
    request: EnthusiastRequest, db: Session = Depends(get_db)
):
    # Start with a base query
    query = db.query(models.Car)

    # Apply mandatory filters from EnthusiastRequest
    query = query.filter(models.Car.power_bhp >= request.min_power)
    query = query.filter(models.Car.average_user_rating >= request.min_user_rating)

    # Apply optional filters
    if request.transmission:
        query = query.filter(models.Car.transmission.ilike(request.transmission))

    if request.fuel_type:
        query = query.filter(models.Car.fuel_type.ilike(request.fuel_type))

    # Sort by power for enthusiasts
    results = query.order_by(models.Car.power_bhp.desc()).all()

    if not results:
        raise HTTPException(
            status_code=404, detail="No cars found matching these enthusiast criteria."
        )

    return results


@app.post("/recommend/general", response_model=List[CarResponse])
def get_general_recommendation(request: GeneralRequest, db: Session = Depends(get_db)):
    query = db.query(models.Car)

    for pref in request.preferences:
        if pref.preference_type == "efficiency":
            query = query.filter(models.Car.mileage >= pref.min_mileage)
            if pref.body_type:
                query = query.filter(models.Car.body_type.ilike(pref.body_type))
            if pref.max_power:
                query = query.filter(models.Car.power_bhp <= pref.max_power)

        elif pref.preference_type == "performance":
            query = query.filter(models.Car.power_bhp >= pref.min_power)
            query = query.filter(models.Car.engine_cc >= pref.min_engine_cc)
            if pref.body_type:
                query = query.filter(models.Car.body_type.ilike(pref.body_type))

        elif pref.preference_type == "comfort":
            if pref.body_type:
                query = query.filter(models.Car.body_type.ilike(pref.body_type))
            if pref.transmission:
                query = query.filter(models.Car.transmission.ilike(pref.transmission))

        elif pref.preference_type == "safety":
            query = query.filter(models.Car.safety_rating >= pref.min_safety_rating)

    # Final result: Sort by user rating as a general quality metric
    results = query.order_by(models.Car.average_user_rating.desc()).limit(10).all()

    if not results:
        raise HTTPException(
            status_code=404, detail="No cars found. Please adjust your preferences."
        )
    return results
