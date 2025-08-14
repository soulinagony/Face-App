# 🚀 ИНСТРУКЦИИ ПО ДЕПЛОЮ НА VERCEL

## 📋 Подготовка к деплою

### 1. Проверка безопасности
- [ ] Убрать все API ключи из кода
- [ ] Проверить .gitignore
- [ ] Создать .env файл (НЕ коммитить!)
- [ ] Убедиться, что нет секретов в коде

### 2. Настройка переменных окружения
Создать файл `.env` в корне проекта:
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# OpenAI (если используется)
VITE_OPENAI_API_KEY=your_openai_key

# Backend API
VITE_API_URL=http://localhost:8000
```

## 🌐 Деплой Frontend на Vercel

### Установка Vercel CLI
```bash
npm install -g vercel
```

### Логин в Vercel
```bash
vercel login
```

### Деплой из папки frontend
```bash
cd frontend
vercel
```

### Настройка переменных окружения в Vercel
1. Зайти в проект на vercel.com
2. Settings → Environment Variables
3. Добавить:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY` (если нужно)

### Продакшн деплой
```bash
vercel --prod
```

## 🔧 Деплой Backend

### Вариант 1: Vercel Functions (рекомендуется)
Создать папку `api` в frontend и перенести туда backend логику.

### Вариант 2: Отдельный хостинг
- **Railway**: `railway up`
- **Heroku**: `git push heroku main`
- **DigitalOcean App Platform**

## 📁 Структура для Vercel

```
frontend/
├── api/           # Backend API endpoints
├── src/           # Frontend код
├── public/        # Статические файлы
├── vercel.json    # Конфигурация Vercel
└── package.json
```

### vercel.json
```json
{
  "functions": {
    "api/**/*.py": {
      "runtime": "python3.9"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

## 🚀 Команды для быстрого деплоя

### Первый деплой
```bash
cd frontend
vercel
```

### Обновление
```bash
vercel --prod
```

### Локальная разработка
```bash
vercel dev
```

## 🔍 Проверка после деплоя

- [ ] Приложение открывается
- [ ] API работает
- [ ] База данных подключена
- [ ] Переменные окружения настроены
- [ ] Нет ошибок в консоли

## 📱 Демо для тестирования

После деплоя получите URL вида:
```
https://your-app.vercel.app
```

Можете дать этот URL для демонстрации приложения.

---

## ⚠️ ВАЖНЫЕ НАПОМИНАНИЯ

1. **НИКОГДА не коммитить .env файлы**
2. **Проверять переменные окружения на Vercel**
3. **Тестировать локально перед деплоем**
4. **Использовать разные ключи для dev/prod**

---

**Удачи с деплоем! 🎉** 