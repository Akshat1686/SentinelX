import httpx
import os
from dotenv import load_dotenv
import certifi

load_dotenv()

MODEL_URL = os.getenv("MODEL_URL")


async def predict_by_city(city: str):
    try:
        async with httpx.AsyncClient(
            timeout=60.0,
            verify=certifi.where()
        ) as client:

            # ✅ CALL REMOTE MODEL API
            response = await client.post(
                f"{MODEL_URL}/predict_city",
                json={"city": city}
            )

            # ✅ raise error if request failed
            response.raise_for_status()

            # ✅ return JSON response
            return response.json()

    except httpx.HTTPError as e:
        print("❌ Model API error:", str(e))
        raise