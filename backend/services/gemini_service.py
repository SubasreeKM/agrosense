import google.generativeai as genai
import os

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def configure_gemini():
    """Configure Gemini API with API key"""
    if GOOGLE_API_KEY:
        genai.configure(api_key=GOOGLE_API_KEY)

def send_message(message):
    """Send a message to Gemini and get response"""
    try:
        configure_gemini()
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(message)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
