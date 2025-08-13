import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useStatsStore } from '../store/statsStore'
import { useThemeStore } from '../store/themeStore'
import Card from '../components/Card'
import Button from '../components/Button'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { stats, fetchStats, isLoading } = useStatsStore()
  const { isDark, toggleTheme } = useThemeStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const settings = [
    { 
      icon: '🔔', 
      label: 'Уведомления', 
      action: () => {
        // TODO: Реализовать настройки уведомлений
        alert('Настройки уведомлений будут добавлены в следующей версии')
      }
    },
    { 
      icon: '🌙', 
      label: isDark ? 'Светлая тема' : 'Тёмная тема', 
      action: () => {
        toggleTheme()
      }
    },
    { 
      icon: '🔒', 
      label: 'Безопасность', 
      action: () => {
        // TODO: Реализовать настройки безопасности
        alert('Настройки безопасности будут добавлены в следующей версии')
      }
    },
    { 
      icon: '💬', 
      label: 'Поддержка', 
      action: () => {
        // TODO: Реализовать систему поддержки
        alert('Система поддержки будет добавлена в следующей версии')
      }
    }
  ]

  // Используем реальную статистику или показываем загрузку
  const userStats = stats ? [
    { icon: '📊', label: 'Всего упражнений', value: stats.total_exercises_completed.toString() },
    { icon: '⏱️', label: 'Время тренировок', value: `${Math.floor(stats.total_workout_time_minutes / 60)}ч ${stats.total_workout_time_minutes % 60}м` },
    { icon: '🔥', label: 'Лучшая серия', value: `${stats.best_streak_days} дней` },
    { icon: '⭐', label: 'Уровень', value: `Уровень ${stats.level}` }
  ] : [
    { icon: '📊', label: 'Всего упражнений', value: '...' },
    { icon: '⏱️', label: 'Время тренировок', value: '...' },
    { icon: '🔥', label: 'Лучшая серия', value: '...' },
    { icon: '⭐', label: 'Уровень', value: '...' }
  ]

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Header title="Профиль" />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Profile Card */}
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <span className="text-3xl font-bold">👤</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{user?.email || 'Пользователь'}</h2>
            <p className="text-indigo-100 text-sm">Активный участник FaceFit</p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Онлайн</span>
            </div>
          </div>
        </Card>

        {/* User Statistics */}
        <Card className="border-l-4 border-l-blue-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#3b82f6'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>📊</span>
            Статистика
          </h3>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-2xl mb-2">⏳</div>
              <p style={{ color: 'var(--text-secondary)' }}>Загружаем статистику...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div key={index} className="rounded-lg p-3 text-center shadow-sm" style={{ 
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)'
                }}>
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="border-l-4 border-l-green-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#10b981'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>⚡</span>
            Быстрые действия
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => navigate('/exercises')}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto hover:bg-indigo-50 border-indigo-200 text-indigo-700 hover:text-indigo-800"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="text-2xl mb-2">🏃‍♀️</div>
              <span className="text-sm font-medium">Тренировка</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/progress')}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium">Прогресс</span>
            </Button>
          </div>
        </Card>

        {/* Settings */}
        <Card className="border-l-4 border-l-purple-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#8b5cf6'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>⚙️</span>
            Настройки
          </h3>
          <div className="space-y-3">
            {settings.map((setting, index) => (
              <button
                key={index}
                onClick={setting.action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors text-left shadow-sm"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <span className="text-xl">{setting.icon}</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{setting.label}</span>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </Card>

        {/* About */}
        <Card className="border-l-4 border-l-gray-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#6b7280'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>ℹ️</span>
            О приложении
          </h3>
          <div className="text-center text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
            <p>FaceFit v1.0.0</p>
            <p>Приложение для тренировки мышц лица</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>© 2024 FaceFit Team</p>
          </div>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={logout}
          variant="danger"
          size="lg"
          fullWidth
          className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
        >
          🚪 Выйти из аккаунта
        </Button>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default Profile 