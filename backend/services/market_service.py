import requests
import os

MARKET_API_KEY = os.getenv("MARKET_API_KEY")

def get_market_prices():
    """Fetch agricultural market prices"""
    if not MARKET_API_KEY:
        return {"error": "MARKET_API_KEY not configured"}
    
    try:
        # Using a mock market data endpoint
        # Replace with actual market API if available
        url = f"https://api.data.gov.in/resource/9ef84268-d588-465a-a5c0-3b405fcc2df8?api-key={MARKET_API_KEY}&format=json&limit=10"
        res = requests.get(url).json()
        return res
    except Exception as e:
        return {"error": str(e)}
