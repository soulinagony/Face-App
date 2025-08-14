# 🔒 ИНСТРУКЦИИ ПО БЕЗОПАСНОСТИ

## ⚠️ ВАЖНО: НИКОГДА НЕ ПУШИТЬ В GIT

### Что НЕЛЬЗЯ коммитить:
- API ключи (Supabase, OpenAI, etc.)
- Пароли от баз данных
- Токены доступа
- Приватные ключи
- Конфигурационные файлы с секретами
- Файлы .env с переменными окружения

### Что делать с секретами:
1. **Использовать .env файлы** (добавленные в .gitignore)
2. **Переменные окружения** на сервере
3. **Секреты в CI/CD** (GitHub Actions, Vercel, etc.)

### Пример .env файла:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
DATABASE_URL=your_database_url
```

### Проверка перед коммитом:
```bash
git diff --cached
git status
```

### Если случайно закоммитили секреты:
1. Немедленно удалить из истории git
2. Сменить все ключи
3. Уведомить команду

---

## 🚀 Деплой на Vercel

### Подготовка к деплою:
1. Убрать все секреты из кода
2. Настроить переменные окружения в Vercel
3. Проверить .gitignore

### Переменные окружения в Vercel:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- OPENAI_API_KEY
- DATABASE_URL

### Команды для деплоя:
```bash
# Установка Vercel CLI
npm i -g vercel

# Логин
vercel login

# Деплой
vercel

# Продакшн деплой
vercel --prod
```

---

## 📝 Чек-лист безопасности

- [ ] Проверил .gitignore
- [ ] Убрал все API ключи из кода
- [ ] Создал .env файл
- [ ] Добавил .env в .gitignore
- [ ] Проверил git status перед коммитом
- [ ] Настроил переменные окружения на сервере

---

**ПОМНИ: Безопасность превыше всего! 🔐** 