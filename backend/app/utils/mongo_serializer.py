from bson import ObjectId

def serialize_mongo(document: dict):
    if not document:
        return document

    document["_id"] = str(document["_id"])
    return document
