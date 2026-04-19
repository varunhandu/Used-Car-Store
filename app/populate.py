import csv

import models
from database import SessionLocal, engine

# 1. Create the tables if they don't exist
models.Base.metadata.create_all(bind=engine)


def import_cars_from_csv(file_path: str):
    db = SessionLocal()
    try:
        with open(file_path, mode="r", encoding="utf-8") as f:
            # DictReader uses the first row as keys for the dictionaries
            reader = csv.DictReader(f)

            for row in reader:
                # Convert numeric strings to proper Python types
                car_data = models.Car(
                    manufacturer=row["manufacturer"],
                    model=row["model"],
                    price=float(row["price"]),
                    mileage=float(row["mileage"]),
                    engine_cc=int(row["engine_cc"]),
                    power_bhp=int(row["power_bhp"]),
                    body_type=row["body_type"],
                    fuel_type=row["fuel_type"],
                    transmission=row["transmission"],
                    safety_rating=int(row["safety_rating"]),
                    average_user_rating=float(row["average_user_rating"]),
                )
                db.add(car_data)

            db.commit()
            print(f"Successfully imported data from {file_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    import_cars_from_csv("cars.csv")
