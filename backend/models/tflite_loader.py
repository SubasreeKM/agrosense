import os
import numpy as np
import tensorflow as tf

# -----------------------------
# Load TFLite Model
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tflite_path = os.path.join(BASE_DIR, "tflite", "disease_model_6class.tflite")
# (rename your downloaded file to this name OR update the string above)

print("Loading TFLite model from:", tflite_path)

interpreter = tf.lite.Interpreter(model_path=tflite_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

input_index = input_details[0]["index"]
output_index = output_details[0]["index"]

# Expected input shape: (1, 224, 224, 3)
EXPECTED_INPUT_SHAPE = (1, 224, 224, 3)


# -----------------------------
# Predict Function
# -----------------------------
def predict_tflite(img_array: np.ndarray):
    """
    img_array → numpy array with shape (1, 224, 224, 3), float32.
    Preprocessing is already handled in preprocess_image.py.
    """
    # Ensure correct shape
    if img_array.shape != EXPECTED_INPUT_SHAPE:
        raise ValueError(
            f"Invalid input shape {img_array.shape}, expected {EXPECTED_INPUT_SHAPE}"
        )

    img = img_array.astype("float32")

    # Feed to model
    interpreter.set_tensor(input_index, img)
    interpreter.invoke()

    preds = interpreter.get_tensor(output_index)[0]

    class_id = int(np.argmax(preds))
    confidence = float(preds[class_id])

    print("RAW OUTPUT:", preds)  # Debugging

    return class_id, confidence, preds.tolist()
