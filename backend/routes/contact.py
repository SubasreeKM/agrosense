from flask import Blueprint, request
from utils.response import success, error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

contact_bp = Blueprint("contact_bp", __name__)

EMAIL_USER = os.getenv("CONTACT_EMAIL")
EMAIL_PASS = os.getenv("CONTACT_EMAIL_PASSWORD")

@contact_bp.route("/contact", methods=["POST"])
def contact():
    data = request.json
    
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not name or not email or not subject or not message:
        return error("All fields are required")

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER
        msg["Subject"] = f"New Contact Message: {subject}"

        body = f"""
        Message from: {name}
        Email: {email}

        {message}
        """

        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_USER, msg.as_string())
        server.quit()

        return success("Message sent successfully!")

    except Exception as e:
        return error(str(e))
