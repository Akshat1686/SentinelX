from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.model_services import predict_by_city
from app.services.agent_services import generate_insight
import httpx
from app.db.repositories.city_repository import CityRepository

router = APIRouter()

class CityRequest(BaseModel):
    city: str


@router.post("/predict-aqi-impact")
async def predict(request: CityRequest):

    # Normalize input
    city = request.city.strip().title()

    if not city:
        raise HTTPException(status_code=400, detail="City is required")

    # Call remote model service
    try:
        model_response = await predict_by_city(city)
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Model service unavailable")
    except httpx.HTTPStatusError:
        raise HTTPException(status_code=500, detail="Model returned an error")

    # Extract prediction from model response
    prediction = model_response.get("predicted_aqi_change")
    CityRepository.save_prediction(model_response)

    return model_response

    if prediction is None:
        raise HTTPException(status_code=500, detail="Invalid response from model")

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
