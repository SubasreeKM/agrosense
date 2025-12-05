from flask import Blueprint
from services.nasa_service import fetch_nasa
from utils.response import success

nasa_bp = Blueprint("nasa_bp", __name__)

@nasa_bp.route("/nasa", methods=["GET"])
def nasa():
    return success("NASA Data", fetch_nasa())
