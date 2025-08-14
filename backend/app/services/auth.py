import os
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.database import SessionLocal, get_db
from app.services.user_stats import UserStatsService

# В продакшене использовать переменные окружения
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 дней

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
security = HTTPBearer()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Создаем начальную статистику для нового пользователя
    UserStatsService.create_user_stats(db, db_user.id)

    return db_user

def get_user(db: Session, email: str):
    try:
        return db.query(User).filter(User.email == email).first()
    except Exception as e:
        # Логируем ошибку и возвращаем None
        print(f"Error getting user by email {email}: {e}")
        return None

def authenticate_user(db: Session, email: str, password: str):
    try:
        user = get_user(db, email)
        if not user:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user
    except Exception as e:
        # Логируем ошибку и возвращаем False
        print(f"Error authenticating user {email}: {e}")
        return False

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    try:
        token = credentials.credentials
        payload = verify_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=404, detail="User not found")
        user = get_user(db, email=email)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        # Логируем ошибку и возвращаем 401
        print(f"Error in get_current_user: {e}")
        raise HTTPException(
            status_code=401, 
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) 