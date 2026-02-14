import httpx
import os
from dotenv import load_dotenv

load_dotenv()

MODEL_URL = os.getenv("MODEL_URL")

async def predict_by_city(city: str):

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{MODEL_URL}/predict_city",
            json={"city": city},
            timeout=10.0
        )

    response.raise_for_status()

    return response.json()
