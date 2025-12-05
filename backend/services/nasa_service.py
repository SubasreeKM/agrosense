import requests
import os

NASA_API_KEY = os.getenv("NASA_API_KEY")

def fetch_nasa():
    """Fetch NASA Astronomy Picture of the Day (APOD)"""
    if not NASA_API_KEY:
        return {"error": "NASA_API_KEY not configured"}
    
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}"
    try:
        res = requests.get(url).json()
        return res
    except Exception as e:
        return {"error": str(e)}
