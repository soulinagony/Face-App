from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User
from app.routers.auth import get_current_user

router = APIRouter(prefix="/exercises", tags=["exercises"])

# Заглушки для MVP - базовые упражнения для лица
FAKE_EXERCISES = [
    {
        "id": 1, 
        "name": "Мьюинг", 
        "duration": 120, 
        "zone": "лицо",
        "description": "Правильное положение языка для укрепления челюсти",
        "instructions": ["Прижмите язык к нёбу", "Держите 2 минуты", "Дышите через нос"]
    },
    {
        "id": 2, 
        "name": "Улыбка-растяжка", 
        "duration": 60, 
        "zone": "лицо",
        "description": "Упражнение для мышц щёк и губ",
        "instructions": ["Широко улыбнитесь", "Удерживайте 10 секунд", "Повторите 6 раз"]
    },
    {
        "id": 3, 
        "name": "Надувание щёк", 
        "duration": 60, 
        "zone": "лицо",
        "description": "Укрепление мышц щёк",
        "instructions": ["Надуйте щёки воздухом", "Перекатывайте воздух", "Выполняйте 1 минуту"]
    },
    {
        "id": 4, 
        "name": "Массаж лба", 
        "duration": 90, 
        "zone": "лицо",
        "description": "Разглаживание морщин на лбу",
        "instructions": ["Поставьте пальцы на лоб", "Массируйте круговыми движениями", "1.5 минуты"]
    }
]

@router.get("/", summary="Список упражнений")
def list_exercises(current_user: User = Depends(get_current_user)):
    return {"exercises": FAKE_EXERCISES, "total": len(FAKE_EXERCISES)}

@router.get("/{exercise_id}", summary="Детали упражнения")
def get_exercise(exercise_id: int, current_user: User = Depends(get_current_user)):
    for ex in FAKE_EXERCISES:
        if ex["id"] == exercise_id:
            return ex
    raise HTTPException(status_code=404, detail="Exercise not found")

@router.post("/{exercise_id}/complete", summary="Отметить упражнение выполненным")
def complete_exercise(exercise_id: int, current_user: User = Depends(get_current_user)):
    # Проверяем, что упражнение существует
    exercise = None
    for ex in FAKE_EXERCISES:
        if ex["id"] == exercise_id:
            exercise = ex
            break
    
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    
    # Здесь будет логика записи прогресса в БД
    return {
        "message": f"Exercise '{exercise['name']}' marked as completed",
        "exercise_id": exercise_id,
        "user_id": current_user.id,
        "points_earned": 10  # Базовые очки за выполнение
    } 