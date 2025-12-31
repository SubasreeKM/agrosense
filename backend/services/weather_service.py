import requests
from datetime import datetime, timedelta
import os

OPENWEATHER_KEY = os.getenv("OPENWEATHER_KEY")

def get_weather_data(city: str):
    # ---------------- CURRENT WEATHER ----------------
    current_url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={OPENWEATHER_KEY}&units=metric"
    )
    current_res = requests.get(current_url).json()

    if "coord" not in current_res:
        return {"error": "City not found"}

    lat = current_res["coord"]["lat"]
    lon = current_res["coord"]["lon"]

    # ---------------- FORECAST ----------------
    forecast_url = (
        f"https://api.openweathermap.org/data/2.5/forecast"
        f"?q={city}&appid={OPENWEATHER_KEY}&units=metric"
    )
    forecast_res = requests.get(forecast_url).json()

    # ---------------- NASA POWER ----------------
    today = datetime.utcnow()
    end = today.strftime("%Y%m%d")
    start = (today - timedelta(days=6)).strftime("%Y%m%d")

    nasa_url = (
        "https://power.larc.nasa.gov/api/temporal/daily/point"
        f"?latitude={lat}&longitude={lon}"
        f"&parameters=T2M,RH2M,PRECTOT"
        f"&start={start}&end={end}"
        f"&community=AG&format=JSON"
    )
    nasa_res = requests.get(nasa_url).json()

    rainfall = sum(
        nasa_res.get("properties", {})
        .get("parameter", {})
        .get("PRECTOT", {})
        .values()
    )

    # ---------------- FORMAT RESPONSE ----------------
    return {
        "location": {
            "city": current_res["name"],
            "country": current_res["sys"]["country"],
        },
        "today": {
            "temp": round(current_res["main"]["temp"]),
            "feels": current_res["main"]["feels_like"],
            "humidity": current_res["main"]["humidity"],
            "wind": current_res["wind"]["speed"],
            "pressure": current_res["main"]["pressure"],
            "high": current_res["main"]["temp_max"],
            "low": current_res["main"]["temp_min"],
            "condition": current_res["weather"][0]["description"],
        },
        "hourly": [
            {
                "time": f["dt_txt"],
                "temp": round(f["main"]["temp"]),
                "icon": f["weather"][0]["icon"],
            }
            for f in forecast_res["list"][:8]
        ],
        "weekly": [
            {
                "date": f["dt_txt"],
                "max": f["main"]["temp_max"],
                "min": f["main"]["temp_min"],
                "condition": f["weather"][0]["main"],
            }
            for i, f in enumerate(forecast_res["list"])
            if i % 8 == 0
        ],
        "insights": {
            "irrigation": "Rainfall sufficient" if rainfall > 10 else "Irrigation advised",
            "soil": "Healthy" if current_res["main"]["humidity"] > 60 else "Dry",
            "spraying": "Safe" if current_res["wind"]["speed"] < 10 else "Avoid",
        },
    }
