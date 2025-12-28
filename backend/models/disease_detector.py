import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image

MODEL_ID = "Diginsa/Plant-Disease-Detection-Project"
DEVICE = "cpu"
CONFIDENCE_THRESHOLD = 60

# Load directly from Hugging Face (ONLINE)
processor = AutoImageProcessor.from_pretrained(MODEL_ID)
model = AutoModelForImageClassification.from_pretrained(MODEL_ID).to(DEVICE)
model.eval()

def normalize_label(label: str):
    label = label.lower()
    if "healthy" in label:
        return "Healthy"
    if "black" in label:
        return "Black Rot"
    if "early_blight" in label or "leaf_blight" in label or "blight" in label:
        return "Leaf Blight"
    if "rust" in label:
        return "Rust"
    if "mosaic" in label or "virus" in label or "curl" in label:
        return "Mosaic"
    if "late_blight" in label:
        return "Late Blight"
    return "Unknown"

def is_valid_leaf_prediction(disease, confidence):
    if disease == "Unknown":
        return False
    if confidence < CONFIDENCE_THRESHOLD:
        return False
    return True

def predict_disease(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)

    conf, idx = probs.max(dim=1)
    disease = normalize_label(model.config.id2label[idx.item()])
    confidence = round(conf.item() * 100, 2)

    return disease, confidence
