from fastapi import FastAPI

app = FastAPI()

print("APP CREATED SUCCESSFULLY")

from app.routes.predict import router as predict_router

app.include_router(predict_router)
