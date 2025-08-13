from sqlalchemy import Column, Integer, Date, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from app.models import Base

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    exercise_id = Column(Integer, nullable=False)  # ID упражнения
    date = Column(Date, nullable=False)
    completed = Column(Boolean, default=False)
    points_earned = Column(Integer, default=0)  # Очки за выполнение
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="progress_records") 