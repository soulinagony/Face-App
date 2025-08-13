from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserStatsBase(BaseModel):
    total_exercises_completed: int = 0
    total_workout_time_minutes: int = 0
    total_xp_earned: int = 0
    current_streak_days: int = 0
    best_streak_days: int = 0
    level: int = 1
    xp_to_next_level: int = 150
    exercises_completed_today: int = 0
    workout_time_today_minutes: int = 0
    xp_earned_today: int = 0

class UserStatsResponse(UserStatsBase):
    id: int
    user_id: int
    last_workout_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UpdateStatsRequest(BaseModel):
    exercises_completed: int
    workout_time_minutes: int
    xp_earned: int 