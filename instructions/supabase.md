# Supabase Configuration Template

## ⚠️ ВАЖНО: НЕ ИСПОЛЬЗУЙТЕ РЕАЛЬНЫЕ КЛЮЧИ В ЭТОМ ФАЙЛЕ!

### Project URL
```
https://your-project-id.supabase.co
```

### API Key (Anon/Public)
```
your_anon_key_here
```

### JavaScript Code
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```

### Database Connection Strings

#### Direct connection
```
postgresql://postgres:[YOUR_PASSWORD]@db.your-project-id.supabase.co:5432/postgres
```

#### Transaction pooler
```
postgresql://postgres.your-project-id:[YOUR_PASSWORD]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres
```

#### Session pooler
```
postgresql://postgres.your-project-id:[YOUR_PASSWORD]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres
```

---

## 🔐 Как использовать секреты:

1. **Создайте .env файл** (НЕ коммитьте!)
2. **Добавьте переменные окружения:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
3. **В коде используйте:**
   ```javascript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
   ```

---

**ПОМНИ: Безопасность превыше всего! 🔒**
