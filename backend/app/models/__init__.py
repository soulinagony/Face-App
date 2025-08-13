from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Импортируем только базовые модели
from .user import User
from .progress import Progress
from .user_stats import UserStats 