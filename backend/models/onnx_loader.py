import onnxruntime as ort
import os

# Get the directory of this file and construct the path to the onnx model
model_dir = os.path.dirname(os.path.abspath(__file__))
onnx_model_path = os.path.join(os.path.dirname(model_dir), "onnx", "disease_model.onnx")

session = None
if os.path.exists(onnx_model_path):
    session = ort.InferenceSession(onnx_model_path)
else:
    print(f"Warning: ONNX model not found at {onnx_model_path}")

def predict_onnx(img_array):
    if session is None:
        raise RuntimeError("ONNX model not loaded. Please ensure disease_model.onnx exists.")
    preds = session.run(None, {"input": img_array})[0]
    class_id = preds.argmax()
    confidence = float(preds[0][class_id])
    return class_id, confidence
