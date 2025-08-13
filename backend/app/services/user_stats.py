from sqlalchemy.orm import Session
from app.models.user_stats import UserStats
from app.models.user import User
from datetime import datetime, date
from typing import Optional

class UserStatsService:
    @staticmethod
    def create_user_stats(db: Session, user_id: int) -> UserStats:
        """Создает начальную статистику для нового пользователя"""
        user_stats = UserStats(
            user_id=user_id,
            total_exercises_completed=0,
            total_workout_time_minutes=0,
            total_xp_earned=0,
            current_streak_days=0,
            best_streak_days=0,
            level=1,
            xp_to_next_level=150,
            exercises_completed_today=0,
            workout_time_today_minutes=0,
            xp_earned_today=0
        )
        db.add(user_stats)
        db.commit()
        db.refresh(user_stats)
        return user_stats

    @staticmethod
    def get_user_stats(db: Session, user_id: int) -> Optional[UserStats]:
        """Получает статистику пользователя"""
        return db.query(UserStats).filter(UserStats.user_id == user_id).first()

    @staticmethod
    def update_daily_stats(db: Session, user_id: int, exercises_completed: int, workout_time_minutes: int, xp_earned: int):
        """Обновляет ежедневную статистику пользователя"""
        user_stats = UserStatsService.get_user_stats(db, user_id)
        if not user_stats:
            user_stats = UserStatsService.create_user_stats(db, user_id)

        today = date.today()
        last_workout = user_stats.last_workout_date.date() if user_stats.last_workout_date else None

        # Сброс ежедневных счетчиков если это новый день
        if last_workout != today:
            user_stats.exercises_completed_today = 0
            user_stats.workout_time_today_minutes = 0
            user_stats.xp_earned_today = 0

            # Обновление серии дней
            if last_workout and (today - last_workout).days == 1:
                user_stats.current_streak_days += 1
            elif last_workout and (today - last_workout).days > 1:
                user_stats.current_streak_days = 1
            else:
                user_stats.current_streak_days = 1

            # Обновление лучшей серии
            if user_stats.current_streak_days > user_stats.best_streak_days:
                user_stats.best_streak_days = user_stats.current_streak_days

        # Обновление счетчиков
        user_stats.exercises_completed_today += exercises_completed
        user_stats.workout_time_today_minutes += workout_time_minutes
        user_stats.xp_earned_today += xp_earned

        # Обновление общей статистики
        user_stats.total_exercises_completed += exercises_completed
        user_stats.total_workout_time_minutes += workout_time_minutes
        user_stats.total_xp_earned += xp_earned

        # Обновление уровня
        while user_stats.total_xp_earned >= user_stats.xp_to_next_level:
            user_stats.level += 1
            user_stats.xp_to_next_level = user_stats.level * 150

        user_stats.last_workout_date = datetime.now()

        db.commit()
        db.refresh(user_stats)
        return user_stats

    @staticmethod
    def reset_daily_stats(db: Session, user_id: int):
        """Сбрасывает ежедневную статистику (для тестирования)"""
        user_stats = UserStatsService.get_user_stats(db, user_id)
        if user_stats:
            user_stats.exercises_completed_today = 0
            user_stats.workout_time_today_minutes = 0
            user_stats.xp_earned_today = 0
            db.commit()
            db.refresh(user_stats)
        return user_stats 