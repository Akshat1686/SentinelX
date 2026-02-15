from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from app.db.repositories.city_repository import CityRepository
from app.services.model_services import predict_by_city
from app.utils.mongo_serializer import serialize_mongo
import traceback
from app.db.database import db
from app.db.database import db
router = APIRouter()

@router.get("/predictions")
def fetch_predictions():
    return CityRepository.get_all_predictions()


@router.get("/stats")
def get_stats():
    collection = db["predictions"]

    total = collection.count_documents({})

    return {
        "total_predictions": total
    }

@router.post("/city")
def get_city(data: dict):
    city = data.get("city", "Unknown")

    return {
        "city": city,
        "status": "received"
    }

class CityRequest(BaseModel):
    city: str


@router.post("/predict-aqi-impact")
async def predict(request: CityRequest):

    city = request.city.strip().title()
    print("\n==== REQUEST START ====")
    print("City received:", city)

    try:
        print("➡ Calling model...")
        model_response = await predict_by_city(city)
        print("✅ Model response received:", model_response)

        print("➡ Saving to MongoDB...")
        saved_doc = CityRepository.save_prediction(model_response)
        print("✅ Saved successfully")

        return serialize_mongo(saved_doc)

    except Exception as e:
        print("❌ ERROR OCCURRED:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Prediction failed")


    # Generate insights using agent
    insight = generate_insight(
        city=city,
        prediction=prediction
    )

    return {
        "city": city,
        "predicted_aqi": prediction,
        "insight": insight
    }
