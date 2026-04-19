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
