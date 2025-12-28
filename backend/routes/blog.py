from flask import Blueprint, request
from utils.supabase_client import supabase
from utils.response import success, error

blog_bp = Blueprint("blog_bp", __name__)

@blog_bp.route("/blogs", methods=["GET"])
def get_blogs():
    try:
        response = supabase.table("blogs").select("*").order("created_at", desc=True).execute()
        return success("Blogs Fetched", response.data)
    except Exception as e:
        print("BLOG FETCH ERROR:", e)
        return error(str(e))

@blog_bp.route("/blogs", methods=["POST"])
def add_blog():
    try:
        data = request.get_json()

        supabase.table("blogs").insert({
            "title": data["title"],
            "excerpt": data["excerpt"],
            "content": data["content"],
            "category": data["category"],
            "image": data["image"],
            "author": data["author"],
            "avatar": data["avatar"],
            "read_time": data["read_time"],
            "likes": 0,
            "comments": 0
        }).execute()

        return success("Blog Added")
    except Exception as e:
        print("BLOG ERROR:", e)
        return error(str(e))



