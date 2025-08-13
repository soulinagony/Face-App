from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models import Base

class UserStats(Base):
    __tablename__ = "user_stats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Основная статистика
    total_exercises_completed = Column(Integer, default=0)
    total_workout_time_minutes = Column(Integer, default=0)
    total_xp_earned = Column(Integer, default=0)

    # Серии и достижения
    current_streak_days = Column(Integer, default=0)
    best_streak_days = Column(Integer, default=0)
    level = Column(Integer, default=1)
    xp_to_next_level = Column(Integer, default=150)

    # Детальная статистика
    exercises_completed_today = Column(Integer, default=0)
    workout_time_today_minutes = Column(Integer, default=0)
    xp_earned_today = Column(Integer, default=0)

    # Даты
    last_workout_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Связи
    user = relationship("User", back_populates="stats")

    def __repr__(self):
        return f"<UserStats(user_id={self.user_id}, level={self.level}, xp={self.total_xp_earned})>" 