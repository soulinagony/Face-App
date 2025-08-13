from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import date, datetime, timedelta
from typing import List, Optional
from app.models.progress import Progress
from app.models.user import User
from app.schemas.progress import ProgressCreate, ProgressUpdate, StreakInfo, CalendarDay

def create_progress_record(db: Session, user_id: int, progress_data: ProgressCreate) -> Progress:
    """Создать запись о прогрессе"""
    db_progress = Progress(
        user_id=user_id,
        exercise_id=progress_data.exercise_id,
        date=progress_data.date,
        completed=progress_data.completed,
        points_earned=progress_data.points_earned
    )
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

def get_user_progress_by_date(db: Session, user_id: int, date: date) -> List[Progress]:
    """Получить прогресс пользователя за определенную дату"""
    return db.query(Progress).filter(
        and_(Progress.user_id == user_id, Progress.date == date)
    ).all()

def get_user_progress_range(db: Session, user_id: int, start_date: date, end_date: date) -> List[Progress]:
    """Получить прогресс пользователя за период"""
    return db.query(Progress).filter(
        and_(
            Progress.user_id == user_id,
            Progress.date >= start_date,
            Progress.date <= end_date
        )
    ).all()

def update_progress_record(db: Session, progress_id: int, progress_update: ProgressUpdate) -> Optional[Progress]:
    """Обновить запись о прогрессе"""
    db_progress = db.query(Progress).filter(Progress.id == progress_id).first()
    if not db_progress:
        return None
    
    update_data = progress_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_progress, field, value)
    
    db.commit()
    db.refresh(db_progress)
    return db_progress

def calculate_streak(db: Session, user_id: int) -> StreakInfo:
    """Вычислить streak пользователя"""
    today = date.today()
    
    # Получаем все дни с завершенными упражнениями за последние 365 дней
    start_date = today - timedelta(days=365)
    completed_days = db.query(Progress.date).filter(
        and_(
            Progress.user_id == user_id,
            Progress.completed == True,
            Progress.date >= start_date,
            Progress.date <= today
        )
    ).distinct().order_by(Progress.date.desc()).all()
    
    completed_dates = [row.date for row in completed_days]
    
    # Вычисляем текущий streak
    current_streak = 0
    check_date = today
    
    while check_date in completed_dates:
        current_streak += 1
        check_date -= timedelta(days=1)
    
    # Если сегодня не выполнено, проверяем вчера
    if current_streak == 0 and len(completed_dates) > 0:
        yesterday = today - timedelta(days=1)
        if yesterday in completed_dates:
            current_streak = 1
            check_date = yesterday - timedelta(days=1)
            while check_date in completed_dates:
                current_streak += 1
                check_date -= timedelta(days=1)
    
    # Вычисляем самый длинный streak
    longest_streak = 0
    temp_streak = 0
    prev_date = None
    
    for current_date in sorted(completed_dates):
        if prev_date is None or current_date == prev_date + timedelta(days=1):
            temp_streak += 1
            longest_streak = max(longest_streak, temp_streak)
        else:
            temp_streak = 1
        prev_date = current_date
    
    # Общее количество выполненных дней
    total_completed = len(completed_dates)
    
    # Процент выполнения за последние 30 дней
    last_30_days = today - timedelta(days=29)
    completed_last_30 = len([d for d in completed_dates if d >= last_30_days])
    completion_rate = (completed_last_30 / 30) * 100
    
    return StreakInfo(
        current_streak=current_streak,
        longest_streak=longest_streak,
        total_completed=total_completed,
        completion_rate=round(completion_rate, 1)
    )

def get_calendar_data(db: Session, user_id: int, year: int, month: int) -> List[CalendarDay]:
    """Получить данные календаря для определенного месяца"""
    from calendar import monthrange
    
    days_in_month = monthrange(year, month)[1]
    start_date = date(year, month, 1)
    end_date = date(year, month, days_in_month)
    
    # Получаем прогресс за весь месяц
    progress_records = get_user_progress_range(db, user_id, start_date, end_date)
    
    # Группируем по датам
    progress_by_date = {}
    for record in progress_records:
        if record.date not in progress_by_date:
            progress_by_date[record.date] = {
                'completed': False,
                'exercises_count': 0,
                'points_earned': 0
            }
        
        if record.completed:
            progress_by_date[record.date]['completed'] = True
        progress_by_date[record.date]['exercises_count'] += 1
        progress_by_date[record.date]['points_earned'] += record.points_earned
    
    # Создаем данные для каждого дня месяца
    calendar_days = []
    for day in range(1, days_in_month + 1):
        current_date = date(year, month, day)
        day_data = progress_by_date.get(current_date, {
            'completed': False,
            'exercises_count': 0,
            'points_earned': 0
        })
        
        calendar_days.append(CalendarDay(
            date=current_date,
            completed=day_data['completed'],
            exercises_count=day_data['exercises_count'],
            points_earned=day_data['points_earned']
        ))
    
    return calendar_days

def mark_exercise_completed(db: Session, user_id: int, exercise_id: int, points: int = 10) -> Progress:
    """Отметить упражнение как выполненное"""
    today = date.today()
    
    # Проверяем, есть ли уже запись за сегодня для этого упражнения
    existing_record = db.query(Progress).filter(
        and_(
            Progress.user_id == user_id,
            Progress.exercise_id == exercise_id,
            Progress.date == today
        )
    ).first()
    
    if existing_record:
        # Обновляем существующую запись
        existing_record.completed = True
        existing_record.points_earned = points
        db.commit()
        db.refresh(existing_record)
        return existing_record
    else:
        # Создаем новую запись
        progress_data = ProgressCreate(
            exercise_id=exercise_id,
            date=today,
            completed=True,
            points_earned=points
        )
        return create_progress_record(db, user_id, progress_data) 