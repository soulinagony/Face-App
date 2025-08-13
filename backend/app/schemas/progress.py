from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date, datetime

class ProgressBase(BaseModel):
    exercise_id: int
    date: date
    completed: bool = False
    points_earned: int = 0

class ProgressCreate(ProgressBase):
    pass

class ProgressUpdate(BaseModel):
    completed: Optional[bool] = None
    points_earned: Optional[int] = None

class ProgressRead(ProgressBase):
    id: int
    user_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class StreakInfo(BaseModel):
    current_streak: int
    longest_streak: int
    total_completed: int
    completion_rate: float  # Процент выполнения за последние 30 дней

class CalendarDay(BaseModel):
    date: date
    completed: bool
    exercises_count: int
    points_earned: int 