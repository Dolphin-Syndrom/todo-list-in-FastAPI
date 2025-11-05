from pymongo import MongoClient
import os 
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017/todoapp")

try:
    client = MongoClient(MONGO_DETAILS)
    # Test the connection
    client.admin.command('ping')
    database = client["todoapp"]
    print(f"✅ Connected to MongoDB: {MONGO_DETAILS}")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    raise

collections = {
    "todos": database["todos"]
}