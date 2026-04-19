from typing import List, Optional, Union

from pydantic import BaseModel, Field


class EnthusiastRequest(BaseModel):
    min_power: int = Field(..., ge=0, description="Minimum horsepower required")
    min_user_rating: float = Field(..., ge=0, le=5.0)
    transmission: Optional[str] = None
    fuel_type: Optional[str] = None


class BasePreference(BaseModel):
    preference_type: str


class EfficiencyPreference(BasePreference):
    preference_type: str = "efficiency"
    min_mileage: float
    body_type: Optional[str] = None
    max_power: Optional[int] = None


class PerformancePreference(BasePreference):
    preference_type: str = "performance"
    min_power: int
    min_engine_cc: int
    body_type: Optional[str] = None


class ComfortPreference(BasePreference):
    preference_type: str = "comfort"
    body_type: Optional[str] = None
    transmission: Optional[str] = None


class SafetyPreference(BasePreference):
    preference_type: str = "safety"
    min_safety_rating: int = Field(..., ge=1, le=5)


class GeneralRequest(BaseModel):
    preferences: List[
        Union[
            EfficiencyPreference,
            PerformancePreference,
            ComfortPreference,
            SafetyPreference,
        ]
    ]


class CarResponse(BaseModel):
    id: int
    manufacturer: str
    model: str
    price: float
    mileage: float
    engine_cc: int
    power_bhp: int
    body_type: str
    fuel_type: str
    transmission: str
    safety_rating: int
    average_user_rating: float

    class Config:
        from_attributes = True
