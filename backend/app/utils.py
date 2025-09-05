from bson import ObjectId

def serialize_document(doc):
    """Convert MongoDB document to JSON-serializable dict."""
    return {**doc, "_id": str(doc["_id"])}