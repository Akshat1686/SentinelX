from datetime import datetime
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
        from app.db.database import db
        collection = db["predictions"]

        data["created_at"] = datetime.utcnow()

        return collection.insert_one(data)
