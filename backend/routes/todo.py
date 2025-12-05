from flask import Blueprint, request
from utils.supabase_client import supabase
from utils.response import success, error

todo_bp = Blueprint("todo_bp", __name__)

@todo_bp.route("/todo", methods=["GET"])
def get_todos():
    data = supabase.table("todos").select("*").execute().data
    return success("Todos Fetched", data)

@todo_bp.route("/todo", methods=["POST"])
def add_todo():
    task = request.json.get("task")
    supabase.table("todos").insert({"task": task}).execute()
    return success("Task Added")

@todo_bp.route("/todo", methods=["DELETE"])
def delete_todo():
    task_id = request.args.get("id")
    supabase.table("todos").delete().eq("id", task_id).execute()
    return success("Task Deleted")
