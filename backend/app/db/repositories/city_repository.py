from datetime import datetime
from app.db.database import db
from app.utils.mongo_serializer import serialize_mongo   # ✅ add this import

collection = db["predictions"]

class CityRepository:

    @staticmethod
    def get_latest_city_data(city: str):
        from app.db.database import db
        collection = db["city_data"]
        return collection.find_one(
            {"city": city},
            sort=[("timestamp", -1)]
        )

    @staticmethod
    def insert_city_data(data: dict):
        from app.db.database import db
        collection = db["city_data"]
        return collection.insert_one(data)

    @staticmethod
    def update_city_data(city: str, update_data: dict):
        from app.db.database import db
        collection = db["city_data"]
        return collection.update_one(
            {"city": city},
            {"$set": update_data}
        )

    @staticmethod
    def save_prediction(data: dict):
        data["created_at"] = datetime.utcnow()

        result = collection.insert_one(data)

        saved_doc = collection.find_one({"_id": result.inserted_id})
        return saved_doc

    # ✅ -------- ADD STEP 1 HERE --------
    @staticmethod
    def get_all_predictions():
        predictions = collection.find().sort("created_at", -1)

        result = []
        for doc in predictions:
            result.append(serialize_mongo(doc))

        return result
