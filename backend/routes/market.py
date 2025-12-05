from flask import Blueprint, request
from services.market_service import get_market_prices
from utils.response import success, error

market_bp = Blueprint("market_bp", __name__)

@market_bp.route("/market", methods=["GET"])
def market():
    try:
        data = get_market_prices()
        return success("Market Prices", data)
    except Exception as e:
        return error(str(e))
