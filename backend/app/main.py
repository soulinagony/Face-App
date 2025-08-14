from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, exercises, user_stats
import os

app = FastAPI(title="FaceFit API", description="API для приложения упражнений для лица", version="1.0.0")

# Получаем порт из переменной окружения Railway
PORT = int(os.getenv("PORT", 8000))

# CORS middleware для frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://127.0.0.1:5173",
        "https://*.vercel.app",  # Для frontend на Vercel
        "https://*.railway.app"  # Для Railway
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(exercises.router)
app.include_router(user_stats.router)

@app.get("/")
def root():
    return {"message": "FaceFit backend is running", "port": PORT}

@app.get("/health")
def health_check():
    return {"status": "healthy", "port": PORT} 