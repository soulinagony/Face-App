import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const { user } = useAuthStore()
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                F
              </div>
              <div>
                <h1 className="text-xl font-bold text-indigo-600">FaceFit</h1>
                <p className="text-xs text-gray-500">{currentTime.toLocaleTimeString('ru')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                🔥 5 дней
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer hover:bg-indigo-600"
                title="Профиль"
              >
                👤
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-bold mb-2">Добро пожаловать!</h2>
          <p className="text-indigo-100 text-sm mb-4">Каждое движение приближает вас к цели</p>
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Готов к тренировке</span>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Сегодня</h3>
            <div className="text-2xl">💪</div>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <CircularProgress percentage={60} size={100} />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-800">3/5</div>
              <div className="text-xs text-gray-600">Упражнения</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">18</div>
              <div className="text-xs text-gray-600">Минут</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">+45</div>
              <div className="text-xs text-gray-600">XP</div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/exercises')}
            className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Продолжить тренировку
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Streak Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-lg font-bold text-orange-600 mb-1">5</div>
            <div className="text-sm text-gray-600">Дней подряд</div>
            <div className="text-xs text-gray-500 mt-1">Лучший: 12 дней</div>
          </div>
          
          {/* Level Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-lg font-bold text-indigo-600 mb-1">Новичок</div>
            <div className="text-sm text-gray-600">850 XP</div>
            <div className="text-xs text-gray-500 mt-1">До уровня 2: 150 XP</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/exercises')}
              className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">🏃‍♀️</div>
              <span className="text-sm font-medium text-indigo-800">Тренировка</span>
            </button>
            
            <button 
              onClick={() => navigate('/progress')}
              className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium text-green-800">Прогресс</span>
            </button>
          </div>
        </div>

        {/* Exercise of the Day */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Упражнение дня</h3>
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">День 5 из 30</span>
          </div>
          
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">👱‍♀️</div>
              <div>
                <h4 className="font-semibold text-gray-800">Подъём бровей</h4>
                <p className="text-sm text-gray-600">Укрепляет мышцы лба</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>⏱️ 30 секунд</span>
              <span>🎯 Легко</span>
            </div>
            
            <button 
              onClick={() => navigate('/exercises')}
              className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
            >
              Начать упражнение
            </button>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💡</div>
          <p className="text-sm font-medium">
            "Постоянство важнее интенсивности"
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {[
              { icon: '🏠', label: 'Домой', path: '/', active: true },
              { icon: '📊', label: 'Прогресс', path: '/progress' },
              { icon: '📋', label: 'Упражнения', path: '/exercises' },
              { icon: '👤', label: 'Профиль', path: '/profile' }
            ].map((item, index) => (
              <button 
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                  item.active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Dashboard 