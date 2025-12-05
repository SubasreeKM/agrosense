from flask import Blueprint, request
from utils.supabase_client import supabase
from utils.response import success, error

blog_bp = Blueprint("blog_bp", __name__)

@blog_bp.route("/blogs", methods=["GET"])
def get_blogs():
    try:
        data = supabase.table("blogs").select("*").execute().data
        return success("Blogs Fetched", data)
    except Exception as e:
        return error(str(e))

@blog_bp.route("/blogs", methods=["POST"])
def add_blog():
    try:
        title = request.json.get("title")
        content = request.json.get("content")
        author = request.json.get("author")
        supabase.table("blogs").insert({
            "title": title,
            "content": content,
            "author": author
        }).execute()
        return success("Blog Added")
    except Exception as e:
        return error(str(e))
