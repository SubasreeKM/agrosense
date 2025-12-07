import cv2
import numpy as np

def preprocess_image(path):
    img = cv2.imread(path)
    img = cv2.resize(img, (224, 224))
    img = img.astype(np.float32)
    img = img / 127.5 - 1      # REQUIRED FOR MobileNetV2
    img = np.expand_dims(img, axis=0)
    return img
