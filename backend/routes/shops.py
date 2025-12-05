from flask import Blueprint, request
from utils.response import success

shops_bp = Blueprint("shops_bp", __name__)

@shops_bp.route("/shops", methods=["GET"])
def shops():
    return success("Nearby Shops", {
        "map_url": "https://www.google.com/maps/search/fertilizer+shops+near+me"
    })
