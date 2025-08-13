# FaceFit — Приложение для ежедневных упражнений лица

## Описание
FaceFit — это веб-приложение, которое помогает выполнять ежедневные упражнения для лица по 30-дневной программе с системой прогресса, как в Duolingo. В будущем будет расширено на тренировки для всего тела.

## Стек технологий
- **Frontend**: React (Vite), TailwindCSS, React Router, Zustand/Redux Toolkit
- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, JWT
- **Прочее**: Firebase Cloud Messaging, S3-хранилище, Railway/Render

## Функционал (MVP)
- Регистрация/вход
- 30-дневный план упражнений
- Streak и уровни
- Календарь прогресса
- Push-уведомления
- Загрузка фото "до/после"

## Структура репозитория
```
/frontend
  /src
    /pages
    /components
    /store
    /services
    /assets
/backend
  /app
    /routers
    /models
    /schemas
    /services
    /core
```

## Запуск проекта
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Деплой
- Рекомендуемый деплой: Railway или Render
- Статические файлы: Vercel/Netlify для фронтенда

## Планы на будущее
- Расширение на упражнения для тела
- Пользовательские программы
- Интеграция с фитнес-сервисами

## Мобильные платформы
FaceFit также разрабатывается как мобильное приложение для App Store и Google Play (через обёртку, например, React Native или Capacitor).

## Виртуальное окружение
Вся разработка backend ведётся строго в виртуальном окружении .venv.

привет, изучи файлы внутри instructions, там же создай файл прогресса и веди его после каждого ответа, что бы можно было быстро включится в работу в другом чате и приступай к разработке строго в .venv в соответсвии с инструкциями в файлах tech_spec.md, exercise_program.md, design.md, readme.md, добавь туда в них что мы готовим мобильное приложение для appstore и playmarket и о том что б разработка велась в venv