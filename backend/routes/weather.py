from flask import Blueprint, request
from services.weather_service import get_weather
from utils.response import success, error

weather_bp = Blueprint("weather_bp", __name__)

@weather_bp.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city")
    if not city:
        return error("City is required")

    data = get_weather(city)
    return success("Weather Fetched", data)
