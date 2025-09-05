from pymongo import MongoClient
import os 
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS")
client = MongoClient(MONGO_DETAILS)
database = client["todoapp"]

collections = {
    "todos": database["todos"]
}