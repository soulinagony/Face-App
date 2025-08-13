import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStatsStore } from '../store/statsStore'
import Card from '../components/Card'
import Button from '../components/Button'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

const Progress: React.FC = () => {
  const navigate = useNavigate()
  const { stats, fetchStats, isLoading } = useStatsStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Если статистика загружается, показываем загрузку
  if (isLoading || !stats) {
    return (
      <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-bg)' }}>
        <Header title="Прогресс" />
        <div className="max-w-md mx-auto p-4 space-y-6">
          <Card className="text-center p-8">
            <div className="text-2xl mb-4">⏳</div>
            <p style={{ color: 'var(--text-secondary)' }}>Загружаем статистику...</p>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  const statsData = [
    { icon: '📊', label: 'Всего упражнений', value: stats.total_exercises_completed.toString(), color: 'from-blue-500 to-indigo-600' },
    { icon: '⏱️', label: 'Время тренировок', value: `${Math.floor(stats.total_workout_time_minutes / 60)}ч ${stats.total_workout_time_minutes % 60}м`, color: 'from-green-500 to-emerald-600' },
    { icon: '🔥', label: 'Лучшая серия', value: `${stats.best_streak_days} дней`, color: 'from-orange-500 to-red-600' },
    { icon: '⭐', label: 'Уровень', value: `Уровень ${stats.level}`, color: 'from-purple-500 to-pink-600' }
  ]

  const weeklyData = [
    { day: 'Пн', exercises: Math.min(stats.exercises_completed_today, 3), time: Math.min(stats.workout_time_today_minutes, 15), color: 'bg-indigo-500' },
    { day: 'Вт', exercises: Math.min(stats.exercises_completed_today, 5), time: Math.min(stats.workout_time_today_minutes, 25), color: 'bg-indigo-500' },
    { day: 'Ср', exercises: Math.min(stats.exercises_completed_today, 2), time: Math.min(stats.workout_time_today_minutes, 10), color: 'bg-gray-400' },
    { day: 'Чт', exercises: Math.min(stats.exercises_completed_today, 4), time: Math.min(stats.workout_time_today_minutes, 20), color: 'bg-indigo-500' },
    { day: 'Пт', exercises: Math.min(stats.exercises_completed_today, 6), time: Math.min(stats.workout_time_today_minutes, 30), color: 'bg-indigo-500' },
    { day: 'Сб', exercises: Math.min(stats.exercises_completed_today, 3), time: Math.min(stats.workout_time_today_minutes, 15), color: 'bg-indigo-500' },
    { day: 'Вс', exercises: 0, time: 0, color: 'bg-gray-400' }
  ]

  const achievements = [
    { icon: '🏆', title: 'Первая тренировка', description: 'Завершили первое упражнение', unlocked: stats.total_exercises_completed > 0 },
    { icon: '🔥', title: 'Серия 5 дней', description: 'Тренировались 5 дней подряд', unlocked: stats.best_streak_days >= 5 },
    { icon: '⭐', title: 'Уровень 2', description: 'Достигли второго уровня', unlocked: stats.level >= 2 },
    { icon: '💪', title: '100 упражнений', description: 'Завершили 100 упражнений', unlocked: stats.total_exercises_completed >= 100 }
  ]

  // Вычисляем процент выполнения дневной цели
  const dailyGoal = 5 // Цель: 5 упражнений в день
  const dailyProgress = Math.min(Math.round((stats.exercises_completed_today / dailyGoal) * 100), 100)

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--page-bg)' }}>
      <Header title="Прогресс" />

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-r ${stat.color} text-white text-center`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-lg font-bold mb-1">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Weekly Activity */}
        <Card className="border-l-4 border-l-indigo-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#6366f1'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>📅</span>
            Активность за неделю
          </h3>
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg shadow-sm" style={{ 
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)'
              }}>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8" style={{ color: 'var(--text-secondary)' }}>{day.day}</span>
                  <div className={`w-3 h-3 rounded-full ${day.color}`}></div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{day.exercises} упр.</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{day.time} мин</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="border-l-4 border-l-yellow-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#eab308'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>🏆</span>
            Достижения
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.unlocked ? 'shadow-sm' : 'opacity-60'
              }`} style={{ 
                backgroundColor: achievement.unlocked ? 'var(--card-bg)' : 'var(--bg-secondary)',
                border: achievement.unlocked ? '1px solid var(--card-border)' : 'none'
              }}>
                <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium" style={{ 
                    color: achievement.unlocked ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm" style={{ 
                    color: achievement.unlocked ? 'var(--text-secondary)' : 'var(--text-secondary)'
                  }}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Goal */}
        <Card className="border-l-4 border-l-green-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#10b981'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>🎯</span>
            Цель месяца
          </h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600 mb-2">{dailyProgress}%</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Выполнено {stats.exercises_completed_today} из {dailyGoal} упражнений сегодня</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${dailyProgress}%` }}></div>
          </div>
          <div className="text-center">
            {stats.exercises_completed_today >= dailyGoal ? (
              <p className="text-sm text-green-600 mb-3 font-medium">🎉 Цель дня достигнута! Отличная работа!</p>
            ) : (
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Осталось {dailyGoal - stats.exercises_completed_today} упражнений для достижения цели!</p>
            )}
            <Button 
              onClick={() => navigate('/exercises')}
              variant="primary"
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              🚀 Тренироваться
            </Button>
          </div>
        </Card>

        {/* Personal Records */}
        <Card className="border-l-4 border-l-purple-500" style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          borderLeftColor: '#8b5cf6'
        }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--bg-primary)' }}>📈</span>
            Личные рекорды
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔥</span>
                <span style={{ color: 'var(--text-primary)' }}>Самая длинная серия</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{stats.best_streak_days} дней</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⏱️</span>
                <span style={{ color: 'var(--text-primary)' }}>Самая долгая тренировка</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{stats.workout_time_today_minutes} мин</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg shadow-sm" style={{ 
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)'
            }}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💪</span>
                <span style={{ color: 'var(--text-primary)' }}>Больше всего упражнений</span>
              </div>
              <span className="text-lg font-bold text-purple-600">{stats.exercises_completed_today} упр.</span>
            </div>
          </div>
        </Card>

        {/* Motivation */}
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10 -translate-x-10"></div>
          <div className="relative z-10">
            <div className="text-3xl mb-2">🌟</div>
            <p className="text-sm font-medium">
              "Каждый день - новая возможность стать лучше"
            </p>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}

export default Progress 