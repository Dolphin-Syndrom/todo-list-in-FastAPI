from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from ..db import collections
from bson import ObjectId
from ..utils import serialize_document

router = APIRouter()

todos_collection = collections["todos"]

class TodoModel(BaseModel):
    title: str
    description: str
    completed: bool = False

@router.post("/todo", status_code=201)
async def create_todo(todo: TodoModel):
    if not todo.title:
        raise HTTPException(status_code=400, detail="Atleast Title is required")
    try:
        new_todo = todo.model_dump()
        result = todos_collection.insert_one(new_todo)
        return {"_id": str(result.inserted_id), **new_todo}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database insertion error")

@router.get("/todos")
async def get_todos():
    try:
        todos = list(todos_collection.find())
        return [serialize_document(todo) for todo in todos]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database retrieval error")

@router.get("/todo/{todo_id}")
async def get_todo(todo_id: str):
    try:
        todo = todos_collection.find_one({"_id": ObjectId(todo_id)})
        if not todo:
            raise HTTPException(status_code=404, detail="Item not found")
        return serialize_document(todo)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Invalid ID format or database error")
    
@router.put("/todo/{todo_id}")
async def update_todo(todo_id: str, todo: TodoModel):
    if not todo.title:
        raise HTTPException(status_code=400, detail="Atleast Title is required")
    try:
        result = todos_collection.update_one(
            {"_id": ObjectId(todo_id)}, {"$set": todo.model_dump()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"_id": todo_id, **todo.model_dump()}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database update error")
    
@router.delete("/todo/{todo_id}", status_code=204)
async def delete_todo(todo_id: str):
    try:
        result = todos_collection.delete_one({"_id": ObjectId(todo_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return
    except Exception as e:
        raise HTTPException(status_code=500, detail="Invalid ID format or database error")
