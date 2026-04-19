from database import Base
from sqlalchemy import Column, Float, Integer, String


class Car(Base):
    __tablename__ = "cars"

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
