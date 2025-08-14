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

## 🌐 Деплой на Vercel

### Экспресс-деплой (5 минут)
```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

### Подробные инструкции
- `instructions/QUICK_DEPLOY.md` - Быстрый деплой
- `instructions/DEPLOY.md` - Подробный деплой
- `instructions/SECURITY.md` - Безопасность

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

После деплоя на Vercel получите URL для демонстрации:
```
https://your-app.vercel.app
```

## 🆘 Поддержка

- **Безопасность**: `instructions/SECURITY.md`
- **Деплой**: `instructions/DEPLOY.md`
- **Быстрый старт**: `instructions/QUICK_DEPLOY.md`

---

**Удачи с проектом! 🎉** 