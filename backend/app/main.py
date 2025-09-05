from fastapi import FastAPI
from .routers.todo import router as todo_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origin = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

app.include_router(todo_router, tags=["todos"], prefix="/api")