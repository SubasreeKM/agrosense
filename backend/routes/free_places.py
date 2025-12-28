from flask import Blueprint, request, jsonify
import requests

free_places_bp = Blueprint("free_places", __name__)

# 🌍 Convert place name → lat/lng (FREE)
def geocode_location(place):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": place,
        "format": "json",
        "limit": 1
    }
    headers = {"User-Agent": "AgroSenseAI/1.0"}
    res = requests.get(url, params=params, headers=headers, timeout=15).json()
    if not res:
        return None, None
    return float(res[0]["lat"]), float(res[0]["lon"])


@free_places_bp.route("/free-nearby-places")
def free_nearby_places():
    lat = request.args.get("lat")
    lng = request.args.get("lng")
    location = request.args.get("location")

    # 🔍 Manual location search
    if location and not (lat and lng):
        lat, lng = geocode_location(location)

    if not lat or not lng:
        return jsonify([])

    # 🔎 Broad Overpass query (reliable)
    query = f"""
    [out:json][timeout:25];
    (
      node(around:10000,{lat},{lng})["shop"];
      way(around:10000,{lat},{lng})["shop"];
      node(around:10000,{lat},{lng})["office"];
      way(around:10000,{lat},{lng})["office"];
      node(around:10000,{lat},{lng})["amenity"];
      way(around:10000,{lat},{lng})["amenity"];
    );
    out center tags;
    """

    data = requests.post(
        "https://overpass-api.de/api/interpreter",
        data=query,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        timeout=30
    ).json()

    fertilizer_keywords = [
        "fertilizer", "fertilisers", "seed", "agro",
        "krushi", "pesticide", "farm", "agriculture"
    ]

    office_keywords = [
        "agriculture office", "department of agriculture",
        "agri office", "krushi bhavan", "assistant director"
    ]

    results = []

    for el in data.get("elements", []):
        tags = el.get("tags", {})
        name = (tags.get("name") or "").lower()

        lat_val = el.get("lat") or el.get("center", {}).get("lat")
        lon_val = el.get("lon") or el.get("center", {}).get("lon")
        if not lat_val or not lon_val:
            continue

        category = None
        if any(k in name for k in fertilizer_keywords):
            category = "fertilizer"
        elif any(k in name for k in office_keywords):
            category = "office"

        if not category:
            continue

        results.append({
            "name": tags.get("name", "Agricultural Service"),
            "lat": lat_val,
            "lng": lon_val,
            "address": tags.get("addr:full") or tags.get("addr:street") or "Address not available",
            "phone": tags.get("phone") or "Not available",
            "category": category
        })

    return jsonify(results)
