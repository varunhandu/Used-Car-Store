# Plan

## DB Schema

id = Column(Integer, primary_key=True, index=True)
manufacturer = Column(String)
model = Column(String)
price = Column(Float)
mileage = Column(Float)
engine_cc = Column(Integer)
power_bhp = Column(Integer)
body_type = Column(String)
fuel_type = Column(String)
transmission = Column(String)
safety_rating = Column(Integer)
average_user_rating = Column(Float)

## API

Contains two endpoints

General User (get recommendation based on factors like 
 Efficiency
 Performance
 Comfort
 Safety
)

Car Enthusiasts (get recommendations based on specifications like
min_power
min_user_rating
transmission
fuel_type
)

## UI
UI needs to be able to call the endpoints in a strategic manner.

It will distinguish between Naive and Enthusiast Users

Depending on the type, they will ask them the required questions.

#### General

Select the chips which contain values which are non-negotiables
Efficient (mileage >= 12, BodyType == Hatchback, BHP <= 100)
Performance (bhp > 100, engine > 1200 , BodyType != Hatchback)
Comfort (Transmission != Manual, BodyType == SUV)
Safety (Safety rating > 3)

Press Submit

#### Enthusiast

Select from dropdown : Transmission, Fuel Type
Mention in input validated text fields: Min User Rating, Min Power
