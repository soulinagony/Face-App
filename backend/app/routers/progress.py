from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, datetime, timedelta

from app.core.database import SessionLocal
from app.models.user import User
from app.models.progress import Progress
from app.schemas.progress import ProgressCreate, ProgressRead, StreakInfo
from app.services.auth import get_current_user

router = APIRouter(prefix="/progress", tags=["progress"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[ProgressRead])
def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: Optional[int] = 30
):
    """Получить прогресс пользователя за последние дни"""
    progress_records = db.query(Progress).filter(
        Progress.user_id == current_user.id
    ).order_by(Progress.date.desc()).limit(limit).all()
    
    return progress_records

@router.post("/", response_model=ProgressRead)
def create_progress_record(
    progress_data: ProgressCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Создать запись о выполненном упражнении"""
    # Проверяем, есть ли уже запись на сегодня для этого упражнения
    existing_record = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.exercise_id == progress_data.exercise_id,
        Progress.date == progress_data.date
    ).first()
    
    if existing_record:
        # Обновляем существующую запись
        existing_record.completed = progress_data.completed
        existing_record.points_earned = progress_data.points_earned
        db.commit()
        db.refresh(existing_record)
        return existing_record
    
    # Создаем новую запись
    progress_record = Progress(
        user_id=current_user.id,
        exercise_id=progress_data.exercise_id,
        date=progress_data.date,
        completed=progress_data.completed,
        points_earned=progress_data.points_earned
    )
    
    db.add(progress_record)
    db.commit()
    db.refresh(progress_record)
    
    return progress_record

@router.get("/streak", response_model=StreakInfo)
def get_user_streak(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить информацию о streak пользователя"""
    # Получаем все дни, когда пользователь выполнял упражнения (по убыванию даты)
    completed_days = db.query(Progress.date).filter(
        Progress.user_id == current_user.id,
        Progress.completed == True
    ).distinct().order_by(Progress.date.desc()).all()
    
    if not completed_days:
        return StreakInfo(current_streak=0, longest_streak=0, total_completed=0, completion_rate=0.0)
    
    # Конвертируем в список дат
    dates = [day.date for day in completed_days]
    dates.sort(reverse=True)  # От новых к старым
    
    # Вычисляем текущий streak
    current_streak = 0
    today = date.today()
    
    # Проверяем, есть ли активность сегодня или вчера
    if dates and (dates[0] == today or dates[0] == today - timedelta(days=1)):
        current_streak = 1
        current_date = dates[0]
        
        # Подсчитываем подряд идущие дни
        for i in range(1, len(dates)):
            expected_date = current_date - timedelta(days=1)
            if dates[i] == expected_date:
                current_streak += 1
                current_date = dates[i]
            else:
                break
    
    # Вычисляем самый длинный streak
    longest_streak = 0
    temp_streak = 1
    
    for i in range(1, len(dates)):
        expected_date = dates[i-1] - timedelta(days=1)
        if dates[i] == expected_date:
            temp_streak += 1
        else:
            longest_streak = max(longest_streak, temp_streak)
            temp_streak = 1
    
    longest_streak = max(longest_streak, temp_streak)
    
    # Вычисляем completion rate за последние 30 дней
    thirty_days_ago = today - timedelta(days=30)
    days_in_period = 30
    completed_in_period = sum(1 for d in dates if d >= thirty_days_ago)
    completion_rate = (completed_in_period / days_in_period) * 100
    
    return StreakInfo(
        current_streak=current_streak,
        longest_streak=longest_streak,
        total_completed=len(dates),
        completion_rate=completion_rate
    )

@router.get("/calendar")
def get_progress_calendar(
    year: int,
    month: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить календарь прогресса для конкретного месяца"""
    # Определяем начало и конец месяца
    start_date = date(year, month, 1)
    if month == 12:
        end_date = date(year + 1, 1, 1) - timedelta(days=1)
    else:
        end_date = date(year, month + 1, 1) - timedelta(days=1)
    
    # Получаем все записи за месяц
    progress_records = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.date >= start_date,
        Progress.date <= end_date,
        Progress.completed == True
    ).all()
    
    # Группируем по дням
    calendar_data = {}
    for record in progress_records:
        day_str = record.date.strftime("%Y-%m-%d")
        if day_str not in calendar_data:
            calendar_data[day_str] = {
                "date": day_str,
                "exercises_completed": 0,
                "total_points": 0
            }
        calendar_data[day_str]["exercises_completed"] += 1
        calendar_data[day_str]["total_points"] += record.points_earned
    
    return {
        "year": year,
        "month": month,
        "calendar": list(calendar_data.values())
    } 