from flask import Blueprint, request
from utils.supabase_client import supabase
from utils.response import success, error

todo_bp = Blueprint("todo_bp", __name__)

@todo_bp.route("/todo", methods=["GET"])
def get_todos():
    res = supabase.table("todos").select("*").order("created_at", desc=True).execute()
    return success("Todos fetched", res.data)

@todo_bp.route("/todo", methods=["POST"])
def add_todo():
    task = request.json.get("task")

    if not task:
        return error("Task is required")

    supabase.table("todos").insert({
        "task": task,
        "completed": False
    }).execute()

    return success("Task added")

@todo_bp.route("/todo/<id>", methods=["PUT"])
def update_todo(id):
    completed = request.json.get("completed")

    supabase.table("todos").update({
        "completed": completed
    }).eq("id", id).execute()

    return success("Task updated")

@todo_bp.route("/todo/<id>", methods=["DELETE"])
def delete_todo(id):
    supabase.table("todos").delete().eq("id", id).execute()
    return success("Task deleted")
