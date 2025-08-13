from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, exercises, user_stats

app = FastAPI(title="FaceFit API", description="API для приложения упражнений для лица", version="1.0.0")

# CORS middleware для frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(exercises.router)
app.include_router(user_stats.router)

@app.get("/")
def root():
    return {"message": "FaceFit backend is running"} 