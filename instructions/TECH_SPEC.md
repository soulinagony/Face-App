# Техническое задание — Приложение "FaceFit" (React + Tailwind + FastAPI)

## 1. Цель проекта
Создать веб-приложение для ежедневных упражнений для лица с:
- 30-дневной программой
- системой прогресса (streak, уровни) по типу Duolingo
- уведомлениями о тренировках
- возможностью масштабирования до упражнений для всего тела

## 2. Стек технологий
**Frontend**:
- React (Vite)
- TailwindCSS
- React Router (многостраничная SPA)
- Zustand или Redux Toolkit (глобальное состояние)

**Backend**:
- FastAPI (Python)
- PostgreSQL (SQLAlchemy + Alembic)
- JWT-аутентификация
- REST API

**Прочее**:
- Push-уведомления: Firebase Cloud Messaging (FCM)
- Хранение фото: Cloudflare R2 / AWS S3
- Деплой: Railway / Render
- Версионирование: Git

## 3. Архитектура проекта
### Frontend
- `pages/` — страницы (Home, Exercises, Progress, Settings, Profile)
- `components/` — UI-компоненты
- `store/` — глобальное состояние
- `services/` — запросы к API
- `assets/` — медиа

### Backend
- `app/main.py` — точка входа
- `app/routers/` — эндпоинты (users, exercises, progress, notifications)
- `app/models/` — модели БД
- `app/schemas/` — Pydantic-схемы
- `app/services/` — бизнес-логика
- `app/core/` — конфигурация

## 4. Основные функции (MVP)
### Пользователь
- Регистрация и вход по email
- Профиль с настройками уведомлений
- Загрузка фото "до/после"

### Программа тренировок
- Список упражнений с фильтрацией по зонам (в MVP — только лицо)
- Анимация или видео-демо
- Таймер выполнения

### Прогресс и геймификация
- 30-дневный план
- Streak (серии выполненных дней)
- Уровни и бейджи
- Календарь прогресса

### Уведомления
- Push или локальные напоминания о тренировке
- Возможность настройки времени напоминания

## 5. API-эндпоинты (MVP)
### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Exercises
- `GET /exercises` — список упражнений
- `GET /exercises/{id}` — детали
- `POST /exercises/complete` — отметить выполненным

### Progress
- `GET /progress`
- `POST /progress/update`

### Notifications
- `POST /notifications/subscribe`
- `POST /notifications/send`

## 6. Масштабирование
После MVP:
- Категории для тела (шея, плечи, руки и т.д.)
- Пользовательские программы
- Интеграция с Apple Health / Google Fit
- Маркетплейс программ

## 7. Приоритет разработки
1. Структура проекта (Frontend + Backend)
2. Авторизация
3. Экран программы и упражнения
4. Прогресс и streak
5. Уведомления

## 0. Мобильная версия
Приложение также готовится к публикации в App Store и Google Play (например, через React Native/Capacitor).

## 0.1 Виртуальное окружение
Вся разработка backend ведётся строго в виртуальном окружении .venv.
