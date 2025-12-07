from flask import Blueprint, request
from models.preprocess import preprocess_image
from models.tflite_loader import predict_tflite
from utils.response import success, error
import os

disease_bp = Blueprint("disease_bp", __name__)

# ✔ FINAL 6 CLASS LABELS (Your required output classes)
CLASS_NAMES = [
    "Healthy",
    "Black Rot",
    "Leaf Blight",
    "Rust",
    "Mosaic",
    "Late Blight"
]

@disease_bp.route("/disease-detect", methods=["POST"])
def detect():
    if "file" not in request.files:
        return error("Image file missing")

    img = request.files["file"]
    temp_path = "temp.jpg"
    img.save(temp_path)

    try:
        # Preprocess into (1, 224, 224, 3)
        processed = preprocess_image(temp_path)

        # Run TFLite model
        class_id, confidence, raw_output = predict_tflite(processed)

        # Safety check: Ensure class_id is in valid range
        if class_id < 0 or class_id >= len(CLASS_NAMES):
            return error(f"Model returned invalid class index: {class_id}")

        result = {
            "disease": CLASS_NAMES[class_id],
            "confidence": float(confidence),
            "raw_output": raw_output  # useful for debugging & tuning
        }

        return success("Prediction Successful", result)

    except Exception as e:
        return error(f"Server Error: {str(e)}")

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
