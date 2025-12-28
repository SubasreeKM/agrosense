from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/contact", methods=["POST"])
def send_contact_email():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not all([name, email, subject, message]):
        return jsonify({"error": "Missing fields"}), 400
    
    



    sender_email = os.getenv("CONTACT_EMAIL")
    sender_password = os.getenv("CONTACT_EMAIL_PASSWORD")


    
    print("EMAIL:", sender_email)
    print("PASSWORD LOADED:", bool(sender_password))

    receiver_email = "subhamurali2717@gmail.com"
    

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = f"📩 AgroSense Contact: {subject}"

    body = f"""
    Name: {name}
    Email: {email}

    Message:
    {message}
    """

    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        return jsonify({"success": True})
    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))
        return jsonify({
            "error": "Failed to send email",
            "details": str(e)
        }), 500
