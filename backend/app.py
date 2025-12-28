from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
# Load environment variables
load_dotenv()
import os
from routes.free_places import free_places_bp
from routes.disease import disease_bp

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register all routes
from routes.disease import disease_bp
from routes.chat import chat_bp
from routes.weather import weather_bp
from routes.shops import shops_bp
from routes.nasa import nasa_bp
from routes.market import market_bp
from routes.todo import todo_bp
from routes.blog import blog_bp
from routes.contact import contact_bp
from routes.dashboard import dashboard_bp

app.register_blueprint(contact_bp, url_prefix="/api")
app.register_blueprint(disease_bp, url_prefix="/api")
app.register_blueprint(chat_bp, url_prefix="/api")
app.register_blueprint(weather_bp, url_prefix="/api")
app.register_blueprint(shops_bp, url_prefix="/api")
app.register_blueprint(nasa_bp, url_prefix="/api")
app.register_blueprint(market_bp, url_prefix="/api")
app.register_blueprint(dashboard_bp, url_prefix="/api")

app.register_blueprint(todo_bp, url_prefix="/api")
app.register_blueprint(blog_bp, url_prefix="/api")
app.register_blueprint(free_places_bp, url_prefix="/api")


@app.route("/")
def home():
    return {"status": "AgroSense AI Backend Running"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)
