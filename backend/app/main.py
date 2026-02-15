from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.routes.predict import router as predict_router


# =====================================================
# CREATE FASTAPI APP
# =====================================================
app = FastAPI(
    title="GENESYS AQI Prediction API",
    description="Backend service for AQI prediction and smoke detection",
    version="1.0.0"
)

print("✅ APP CREATED SUCCESSFULLY")


# =====================================================
# CORS MIDDLEWARE (Frontend Connection)
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js frontend
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# INCLUDE ROUTES
# =====================================================
app.include_router(predict_router)


# =====================================================
# HEALTH CHECK ENDPOINT (BEST PRACTICE)
# =====================================================
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "GENESYS Backend",
        "message": "API is running"
    }


# =====================================================
# ROOT ENDPOINT (OPTIONAL)
# =====================================================
@app.get("/")
def root():
    return {
        "message": "Welcome to GENESYS AQI Backend API",
        "docs": "/docs"
    }
