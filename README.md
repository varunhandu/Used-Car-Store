# Car Recommendation System

An intelligent car discovery platform that adapts its interface based on user expertise. Whether a user is looking for a vehicle based on lifestyle "vibes" or hard technical specifications, this system bridges the gap.

---

## 🏗️ Architecture & Data Model

The application is built on a structured SQL schema that tracks comprehensive automotive metrics.

### **Database Schema**
| Field | Type | Description |
| :--- | :--- | :--- |
| `manufacturer` / `model` | `String` | Vehicle branding |
| `price` | `Integer` | MSRP / Listing price |
| `mileage` | `Float` | Fuel efficiency (km/l) |
| `engine_cc` | `Integer` | Displacement in Cubic Centimeters |
| `power_bhp` | `Integer` | Horsepower (BHP) |
| `body_type` | `String` | SUV, Hatchback, Sedan, etc. |
| `safety_rating` | `Integer` | Crash test rating (1-5) |
| `average_user_rating` | `Float` | Aggregated user reviews (0-5) |

---

## 🧠 Intelligent UI Logic

The frontend acts as a strategic gateway, funneling users into two distinct search experiences:

### **1. General User (Lifestyle Persona)**
Designed for users who prioritize outcomes over specs. Users select "Non-Negotiable" chips which the UI maps to backend logic:

* **⚡ Efficiency:** `mileage >= 12`, `BodyType: Hatchback`, `BHP <= 100`
* **🏎️ Performance:** `BHP > 100`, `engine > 1200cc`, `BodyType: NOT Hatchback`
* **🛋️ Comfort:** `Transmission: NOT Manual`, `BodyType: SUV`
* **🛡️ Safety:** `Safety Rating > 3`

### **2. Enthusiast User (Technical Persona)**
Designed for users who know exactly what they want under the hood. 
* **Granular Filters:** Direct input for `Min Power` and `Min User Rating`.
* **Dropdown Selection:** Precise control over `Transmission` and `Fuel Type`.

Deployed on Vercel

---

## 🚀 API Implementation

The backend exposes two specialized endpoints to handle the dual-persona logic:

### **POST** `/recommend/general`
Accepts a list of lifestyle preferences.
> **Logic:** Appends a JSON payload for each selected chip into a query array to filter the database dynamically.

### **POST** `recommend/enthusiast`
Accepts a strict specification object.
> **Logic:** Performs direct comparative filtering against BHP, ratings, and categorical strings.

Both endpoints filter the fetched results based on Ratings (returning Highest to Lowest)\
Deployed on Render

---

## 🛠️ Public URL

Go to the Public link for the app. [CarFinderPro](https://used-car-store-coral.vercel.app/)
The First search might take some time, as the backend solution is Serverless, and requires some time to get warmed up.
---

### **Future Scope:**
* **Score Based Ranking:** Currently app is using hard restrictions, which only works for small scale projects. Our preferences should Ideally change the weight of a particular attribute's score, and then our results should show these scored results in a descending order.
* **Support for Concurrency:** Current Backend configuration has no consideration for multiple users accessing the data at the same time.
* **Database:** I used SQLite to reduce the time taken to configure an online database. Provided more time, I could have added a robust and scalable Database solution.
* **Improved Error Handling for UI:** Ran out of time on the UI front. There is little to no error handling.
