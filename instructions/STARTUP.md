# 🚀 ЗАПУСК ПРИЛОЖЕНИЯ

## ✅ Что уже готово

- ✅ Все секреты убраны из кода
- ✅ Создан .env файл с реальными данными
- ✅ .env добавлен в .gitignore
- ✅ Backend настроен на чтение переменных окружения
- ✅ Frontend настроен на чтение переменных окружения

## 🔧 Запуск

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔍 Проверка

- Backend должен запуститься на http://localhost:8000
- Frontend должен запуститься на http://localhost:5173
- Supabase должен подключиться (проверить в консоли браузера)

## 🚨 Если не работает

1. **Проверить .env файл** - все ли переменные заполнены
2. **Проверить .gitignore** - .env не должен коммититься
3. **Перезапустить** backend и frontend
4. **Проверить логи** на ошибки

## 📱 Деплой

После проверки локального запуска можно деплоить на Vercel:
- `instructions/QUICK_DEPLOY.md` - быстрый деплой
- `instructions/DEPLOY.md` - подробный деплой

---

**Приложение должно работать локально! 🎉** 