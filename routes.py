from fastapi import APIRouter, HTTPException
from typing import List
from models import TodoItem

router = APIRouter()

# In-memory storage for to-do items
todo_items = []

@router.post("/todos/", response_model=TodoItem)
def create_todo_item(item: TodoItem):
    todo_item = TodoItem(**item.dict())  # Ensure item is a TodoItem instance
    todo_items.append(todo_item)
    return todo_item

@router.get("/todos/", response_model=List[TodoItem])
def read_todo_items():
    return todo_items

@router.get("/todos/{item_id}", response_model=TodoItem)
def read_todo_item(item_id: int):
    for item in todo_items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@router.put("/todos/{item_id}", response_model=TodoItem)
def update_todo_item(item_id: int, updated_item: TodoItem):
    for index, item in enumerate(todo_items):
        if item.id == item_id:
            todo_items[index] = TodoItem(**updated_item.dict())  # Ensure updated_item is a TodoItem instance
            return todo_items[index]
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/todos/{item_id}", response_model=TodoItem)
def delete_todo_item(item_id: int):
    for index, item in enumerate(todo_items):
        if item.id == item_id:
            deleted_item = todo_items.pop(index)
            return deleted_item
    raise HTTPException(status_code=404, detail="Item not found")
