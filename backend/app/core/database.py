from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
from app.models import Base
from app.core.config import settings

# Используем переменные окружения из конфигурации
DATABASE_URL = settings.DATABASE_URL

# Настройки пула соединений для стабильности
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,  # Количество соединений в пуле
    max_overflow=10,  # Максимальное количество дополнительных соединений
    pool_pre_ping=True,  # Проверка соединения перед использованием
    pool_recycle=3600,  # Пересоздание соединений каждый час
    pool_timeout=30,  # Таймаут ожидания соединения
    echo=False  # Отключить SQL логирование
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 