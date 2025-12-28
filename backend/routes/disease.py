from flask import Blueprint, request
import os

from models.disease_detector import (
    predict_disease,
    is_valid_leaf_prediction
)
from utils.response import success, error

disease_bp = Blueprint("disease_bp", __name__)

@disease_bp.route("/disease-detect", methods=["POST"])
def detect_disease():
    # 1️⃣ Validate request
    if "file" not in request.files:
        return error("Image file missing")

    file = request.files["file"]

    if file.filename == "":
        return error("No image selected")

    # 2️⃣ Save uploaded image temporarily
    temp_path = "temp_leaf_image.jpg"
    file.save(temp_path)

    try:
        # 3️⃣ Run pretrained model prediction
        disease, confidence = predict_disease(temp_path)

        # 4️⃣ Non-leaf / low-confidence rejection
        if not is_valid_leaf_prediction(disease, confidence):
            return success("Not a leaf image", {
                "is_leaf": False,
                "message": "Uploaded image is not a crop leaf or prediction is uncertain"
            })

        # 5️⃣ Valid disease prediction
        return success("Prediction Successful", {
            "is_leaf": True,
            "disease": disease,
            "confidence": confidence
        })

    except Exception as e:
        return error(f"Server error: {str(e)}")

    finally:
        # 6️⃣ Cleanup temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
