from flask import Blueprint, request, jsonify
from services.weather_service import get_weather_data

weather_bp = Blueprint("weather", __name__)

@weather_bp.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "Ludhiana")

    data = get_weather_data(city)
    if "error" in data:
        return jsonify(data), 404

    return jsonify(data)
