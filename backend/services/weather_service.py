import requests
import os

API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city):
    url = f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={city}&days=7"
    res = requests.get(url).json()
    return res
