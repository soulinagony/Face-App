# 🚀 ДЕПЛОЙ НА RAILWAY

## 📋 Что уже готово

- ✅ `railway.json` - конфигурация Railway
- ✅ `Procfile` - команда запуска
- ✅ `runtime.txt` - версия Python
- ✅ Backend обновлен для Railway
- ✅ Frontend конфигурация готова

## 🌐 Пошаговый деплой

### 1. Подготовка GitHub
```bash
# Убедиться, что все изменения закоммичены
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Деплой на Railway

1. **Зайти на [railway.app](https://railway.app)**
2. **Войти через GitHub**
3. **New Project → Deploy from GitHub repo**
4. **Выбрать ваш репозиторий**
5. **Railway автоматически определит структуру**

### 3. Настройка переменных окружения

В Railway Dashboard добавить:
```
SUPABASE_URL=https://nqhzvnagozjgsxwkatmg.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

### 4. Получение URL

Railway даст URL вида:
```
https://your-app-name.railway.app
```

## 🔧 Настройка Frontend

После деплоя backend обновить frontend `.env`:
```env
VITE_RAILWAY_API_URL=https://your-app-name.railway.app
```

## 📱 Деплой Frontend на Vercel

1. **Обновить переменные окружения в Vercel**
2. **Добавить `VITE_RAILWAY_API_URL`**
3. **Передеплоить frontend**

## 🎯 Результат

- **Backend**: работает на Railway
- **Frontend**: работает на Vercel
- **База данных**: Supabase (как есть)
- **API**: доступен по Railway URL

## 🆘 Если что-то пошло не так

1. **Проверить логи в Railway Dashboard**
2. **Убедиться, что переменные окружения настроены**
3. **Проверить, что backend запустился**
4. **Проверить CORS настройки**

---

**Удачи с деплоем! 🎉** 