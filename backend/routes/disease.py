from flask import Blueprint, request
from models.preprocess import preprocess_image
from models.onnx_loader import predict_onnx
from utils.response import success, error
import os

disease_bp = Blueprint("disease_bp", __name__)

CLASS_NAMES = [
    "Healthy", "Black Rot", "Leaf Blight", "Rust", "Mosaic", "Late Blight"
]

@disease_bp.route("/disease-detect", methods=["POST"])
def detect():
    if "file" not in request.files:
        return error("Image file missing")

    img = request.files["file"]
    path = "temp.jpg"
    img.save(path)

    processed = preprocess_image(path)
    class_id, confidence = predict_onnx(processed)

    os.remove(path)

    return success("Prediction Successful", {
        "disease": CLASS_NAMES[class_id],
        "confidence": confidence
    })
