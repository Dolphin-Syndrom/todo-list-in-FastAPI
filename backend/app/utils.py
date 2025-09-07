from bson import ObjectId

def serialize_document(doc):
    """Convert MongoDB document to JSON-serializable dict."""
    if doc is None:
        return None
    
    if isinstance(doc, list):
        return [serialize_document(item) for item in doc]
    
    if isinstance(doc, dict):
        serialized = {}
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                serialized[key] = str(value)
            elif isinstance(value, (dict, list)):
                serialized[key] = serialize_document(value)
            else:
                serialized[key] = value
        return serialized
    
    if isinstance(doc, ObjectId):
        return str(doc)
    
    return doc