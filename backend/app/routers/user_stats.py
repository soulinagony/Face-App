from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.user_stats import UserStatsService
from app.services.auth import get_current_user
from app.models.user import User
from app.schemas.user_stats import UserStatsResponse, UpdateStatsRequest
from typing import List

router = APIRouter(prefix="/user-stats", tags=["user-stats"])

@router.get("/me", response_model=UserStatsResponse)
def get_my_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить статистику текущего пользователя"""
    stats = UserStatsService.get_user_stats(db, current_user.id)
    if not stats:
        # Создаем статистику если её нет
        stats = UserStatsService.create_user_stats(db, current_user.id)
    return stats

@router.post("/update", response_model=UserStatsResponse)
def update_stats(
    stats_update: UpdateStatsRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Обновить статистику пользователя после выполнения упражнения"""
    updated_stats = UserStatsService.update_daily_stats(
        db=db,
        user_id=current_user.id,
        exercises_completed=stats_update.exercises_completed,
        workout_time_minutes=stats_update.workout_time_minutes,
        xp_earned=stats_update.xp_earned
    )
    return updated_stats

@router.post("/reset-daily")
def reset_daily_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Сбросить ежедневную статистику (для тестирования)"""
    UserStatsService.reset_daily_stats(db, current_user.id)
    return {"message": "Daily stats reset successfully"} 