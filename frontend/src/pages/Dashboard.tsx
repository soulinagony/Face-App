import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useStatsStore } from '../store/statsStore'
import Card from '../components/Card'
import Button from '../components/Button'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const { user } = useAuthStore()
  const { stats, fetchStats, isLoading } = useStatsStore()
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user, fetchStats])

  const CircularProgress = ({ percentage, size = 80 }: { percentage: number; size?: number }) => {
    const radius = (size - 10) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-indigo-600 transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-indigo-600">{percentage}%</span>
        </div>
      </div>
    )
  }

  // Вычисляем процент выполнения дневной цели
  const getDailyProgress = () => {
    if (!stats) return 0
    const dailyGoal = 5 // Цель: 5 упражнений в день
    const completed = stats.exercises_completed_today
    return Math.min(Math.round((completed / dailyGoal) * 100), 100)
  }

  // Получаем уровень пользователя
  const getUserLevel = () => {
    if (!stats) return 'Новичок'
    const levels = ['Новичок', 'Ученик', 'Специалист', 'Мастер', 'Эксперт']
    const levelIndex = Math.min(Math.floor((stats.level - 1) / 2), levels.length - 1)
    return levels[levelIndex]
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Header 
        title="FaceFit" 
        showProfileButton 
        showLogo
        rightContent={
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              🔥 {stats?.current_streak_days || 0} дней
            </div>
          </div>
        }
      />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative text-center z-10">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="text-xl font-bold mb-2">Добро пожаловать!</h2>
            <p className="text-indigo-100 text-sm mb-4">Каждое движение приближает вас к цели</p>
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Готов к тренировке</span>
            </div>
          </div>
        </Card>

        {/* Today's Progress */}
        <Card className="border-l-4 border-l-indigo-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#6366f1'
        }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Сегодня</h3>
            <div className="text-2xl">💪</div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <CircularProgress percentage={getDailyProgress()} size={100} />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg p-3 shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats?.exercises_completed_today || 0}/5
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Упражнения</div>
            </div>
            <div className="rounded-lg p-3 shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                {stats?.workout_time_today_minutes || 0}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Минут</div>
            </div>
            <div className="rounded-lg p-3 shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                +{stats?.xp_earned_today || 0}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>XP</div>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/exercises')}
            variant="primary"
            fullWidth
            className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            🚀 Продолжить тренировку
          </Button>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Streak Card */}
          <Card className="border-l-4 border-l-orange-500" style={{ 
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
            borderLeftColor: '#f97316'
          }}>
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-lg font-bold text-orange-600 mb-1">
                {stats?.current_streak_days || 0}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Дней подряд</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Лучший: {stats?.best_streak_days || 0} дней
              </div>
            </div>
          </Card>
          
          {/* Level Card */}
          <Card className="border-l-4 border-l-indigo-500" style={{ 
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
            borderLeftColor: '#6366f1'
          }}>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-lg font-bold text-indigo-600 mb-1">
                {getUserLevel()}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stats?.total_xp_earned || 0} XP
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                До уровня {stats?.level || 1}: {stats?.xp_to_next_level || 150} XP
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-l-4 border-l-green-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#10b981'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Быстрые действия</h3>
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

        {/* Exercise of the Day */}
        <Card className="border-l-4 border-l-pink-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#ec4899'
        }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Упражнение дня</h3>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ 
              backgroundColor: 'var(--bg-primary)',
              color: '#ec4899'
            }}>
              День {stats?.current_streak_days || 1} из 30
            </span>
          </div>
          
          <div className="rounded-lg p-4 mb-4 border" style={{ 
            background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
            borderColor: 'var(--card-border)'
          }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">👱‍♀️</div>
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Подъём бровей</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Укрепляет мышцы лба</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              <span>⏱️ 30 секунд</span>
              <span>🎯 Легко</span>
            </div>
            
            <Button 
              onClick={() => navigate('/exercises')}
              variant="accent"
              size="sm"
              fullWidth
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              🚀 Начать упражнение
            </Button>
          </div>
        </Card>

        {/* Motivation */}
        <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="relative z-10">
            <div className="text-3xl mb-2">💡</div>
            <p className="text-sm font-medium">
              "Постоянство важнее интенсивности"
            </p>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default Dashboard 