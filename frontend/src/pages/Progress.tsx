import React from 'react'
import { useNavigate } from 'react-router-dom'

const Progress: React.FC = () => {
  const navigate = useNavigate()

  const stats = [
    { label: 'Дней подряд', value: '5', color: 'text-orange-600', icon: '🔥' },
    { label: 'Всего упражнений', value: '15', color: 'text-green-600', icon: '💪' },
    { label: 'Очков XP', value: '850', color: 'text-purple-600', icon: '⭐' },
    { label: 'Время тренировок', value: '2ч 30м', color: 'text-blue-600', icon: '⏱️' }
  ]

  const weekData = [
    { day: 'Пн', completed: true, exercises: 3 },
    { day: 'Вт', completed: true, exercises: 2 },
    { day: 'Ср', completed: false, exercises: 0 },
    { day: 'Чт', completed: true, exercises: 4 },
    { day: 'Пт', completed: true, exercises: 2 },
    { day: 'Сб', completed: false, exercises: 0 },
    { day: 'Вс', completed: true, exercises: 1 }
  ]

  const achievements = [
    { title: 'Первые шаги', description: 'Завершите первое упражнение', earned: true },
    { title: 'Постоянство', description: '5 дней подряд', earned: true },
    { title: 'Марафонец', description: '30 дней подряд', earned: false },
    { title: 'Мастер лица', description: 'Завершите все упражнения', earned: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Прогресс</h1>
            <button 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer hover:bg-indigo-600"
              title="Профиль"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Активность за неделю</h3>
          <div className="flex justify-between items-end space-x-2">
            {weekData.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div 
                  className={`w-8 h-${Math.max(8, day.exercises * 2 + 8)} rounded-t transition-all ${
                    day.completed ? 'bg-indigo-500' : 'bg-gray-200'
                  }`}
                  style={{ height: `${Math.max(32, day.exercises * 8 + 32)}px` }}
                ></div>
                <span className="text-xs text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Высота столбцов показывает количество выполненных упражнений
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">🏆 Достижения</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <div className={`text-xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.earned ? '✅' : '🔒'}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Goal */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6">
          <h3 className="font-semibold mb-2">🎯 Цель месяца</h3>
          <p className="text-purple-100 text-sm mb-4">Выполните 50 упражнений до конца месяца</p>
          <div className="w-full bg-purple-400 rounded-full h-3 mb-2">
            <div className="bg-white h-3 rounded-full" style={{ width: '30%' }}></div>
          </div>
          <div className="flex justify-between text-sm text-purple-100">
            <span>15 / 50 упражнений</span>
            <span>30%</span>
          </div>
        </div>

        {/* Personal Records */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">📈 Личные рекорды</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Самая длинная серия</span>
              <span className="font-semibold text-orange-600">7 дней</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Упражнений за день</span>
              <span className="font-semibold text-green-600">8 упражнений</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Время тренировки</span>
              <span className="font-semibold text-blue-600">15 минут</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {[
              { icon: '🏠', label: 'Домой', path: '/' },
              { icon: '📊', label: 'Прогресс', path: '/progress', active: true },
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

export default Progress 