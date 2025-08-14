# 🎯 Face App - Приложение для фитнеса

## 🔒 БЕЗОПАСНОСТЬ

**ВАЖНО: Все API ключи и пароли убраны из кода!**

- ✅ Секреты убраны из всех файлов
- ✅ .gitignore настроен правильно
- ✅ Создан .env.example шаблон
- ✅ Инструкции по безопасности в `instructions/SECURITY.md`

## 🚀 Быстрый старт

### 1. Клонирование и настройка
```bash
git clone <your-repo>
cd face_app
cp .env.example .env
# Заполнить .env файл реальными значениями
```

### 2. Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Деплой

### Railway (Backend)
- Автоматический деплой из GitHub
- Backend работает на Railway
- База данных Supabase

### Vercel (Frontend)
- Экспресс-деплой за 5 минут
- Подробные инструкции в `instructions/`

## 📁 Структура проекта

```
face_app/
├── frontend/          # React + Vite приложение
├── backend/           # FastAPI backend
├── instructions/      # Документация и инструкции
├── .env.example      # Шаблон переменных окружения
└── README.md         # Этот файл
```

## 🔐 Переменные окружения

Создайте `.env` файл на основе `.env.example`:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Database
DATABASE_URL=your_database_url

# Backend
API_HOST=0.0.0.0
API_PORT=8000
```

## 📱 Демо

После деплоя на Railway получите URL для backend:
```
https://your-app.railway.app
```

## 🆘 Поддержка

- **Безопасность**: `instructions/SECURITY.md`
- **Деплой**: `instructions/DEPLOY.md`
- **Railway**: `instructions/RAILWAY_DEPLOY.md`
- **Быстрый старт**: `instructions/QUICK_DEPLOY.md`

---

**Удачи с проектом! 🎉** 