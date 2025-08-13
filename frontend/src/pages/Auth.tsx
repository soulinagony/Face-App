import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { login, register, loginWithGoogle, loginWithApple, isLoading } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля')
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (!isLogin && password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)'
        }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full blur-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}></div>
          <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full blur-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 rounded-full blur-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}></div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl shadow-2xl p-8 border" style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)'
        }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text">FaceFit</h1>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Добро пожаловать обратно!' : 'Создайте свой аккаунт'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl p-1 mb-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLogin 
                  ? 'shadow-sm' 
                  : ''
              }`}
              style={{ 
                backgroundColor: isLogin ? 'var(--card-bg)' : 'transparent',
                color: isLogin ? '#4f46e5' : 'var(--text-secondary)'
              }}
            >
              Вход
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'shadow-sm' 
                  : ''
              }`}
              style={{ 
                backgroundColor: !isLogin ? 'var(--card-bg)' : 'transparent',
                color: !isLogin ? '#2563eb' : 'var(--text-secondary)'
              }}
            >
              Регистрация
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Email адрес
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ 
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password - только для регистрации */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Подтверждение пароля
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ 
                    borderColor: 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="border rounded-xl p-4" style={{ 
                backgroundColor: 'var(--bg-secondary)',
                borderColor: '#fecaca'
              }}>
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Вход...' : 'Создание аккаунта...'}</span>
                </div>
              ) : (
                isLogin ? 'Войти' : 'Создать аккаунт'
              )}
            </button>
          </form>

          {/* OAuth Section */}
          <div className="mt-6">
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--card-border)' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ 
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-secondary)'
                }}>или</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-xl font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
                style={{ 
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Продолжить с Google
              </button>

              <button
                type="button"
                onClick={loginWithApple}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-xl font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
                style={{ 
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)'
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Продолжить с Apple
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError('')
                    setConfirmPassword('')
                  }}
                  className="ml-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <h3 className="font-medium mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
              Что вас ждет в FaceFit:
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-indigo-500">🧘‍♀️</span>
                <span>30-дневная программа упражнений для лица</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-orange-500">🔥</span>
                <span>Streak система как в Duolingo</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-green-500">📊</span>
                <span>Отслеживание прогресса и статистика</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-purple-500">⭐</span>
                <span>Система уровней и достижений</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth 