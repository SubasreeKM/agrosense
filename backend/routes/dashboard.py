from flask import Blueprint, jsonify

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.route("/", methods=["GET"])
def dashboard_home():
    return jsonify({
        "status": "success",
        "message": "Dashboard API is running"
    })
