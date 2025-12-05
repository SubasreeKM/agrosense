from flask import Blueprint, request
import google.generativeai as genai
from utils.response import success, error
from utils.supabase_client import supabase
import os

chat_bp = Blueprint("chat_bp", __name__)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@chat_bp.route("/chat", methods=["POST"])
def chat():
    try:
        msg = request.json.get("message")
        response = genai.chat(model="gemini-pro").send_message(msg)
        text = response.text

        supabase.table("chats").insert({"message": msg, "response": text}).execute()

        return success("AI Responded", {"answer": text})
    except Exception as e:
        return error(str(e))
