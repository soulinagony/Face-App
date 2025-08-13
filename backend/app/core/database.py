import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

# В продакшене следует использовать переменные окружения
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres.nqhzvnagozjgsxwkatmg:Cdtiybrjd_77@aws-0-eu-north-1.pooler.supabase.com:5432/postgres"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 