// API Configuration
export const API_CONFIG = {
  // Локальная разработка
  development: {
    baseURL: import.meta.env.VITE_API_URL,
    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  },
  // Продакшн (Railway)
  production: {
    baseURL: import.meta.env.VITE_RAILWAY_API_URL || 'https://your-app.railway.app',
    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  }
}

// Автоматически определяем окружение
const isDevelopment = import.meta.env.DEV
export const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production

// API endpoints
export const API_ENDPOINTS = {
  auth: `${currentConfig.baseURL}/auth`,
  exercises: `${currentConfig.baseURL}/exercises`,
  userStats: `${currentConfig.baseURL}/user-stats`,
  health: `${currentConfig.baseURL}/health`
} 