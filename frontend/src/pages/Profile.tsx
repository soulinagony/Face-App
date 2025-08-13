import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const settings = [
    { label: 'Уведомления', value: 'Включены', icon: '🔔' },
    { label: 'Язык', value: 'Русский', icon: '🌐' },
    { label: 'Тема', value: 'Светлая', icon: '🎨' },
    { label: 'Звук', value: 'Включен', icon: '🔊' }
  ]

  const userStats = [
    { label: 'Дней в приложении', value: '12', icon: '📅' },
    { label: 'Завершено упражнений', value: '15', icon: '✅' },
    { label: 'Общее время', value: '2ч 30м', icon: '⏱️' },
    { label: 'Серия дней', value: '5', icon: '🔥' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Профиль</h1>
            <button 
              onClick={() => navigate('/profile')}
              className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-medium"
              title="Профиль"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Profile Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.email || 'Пользователь'}</h2>
              <p className="text-indigo-100 text-sm">Активный пользователь FaceFit</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">⭐ Новичок</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">🔥 5 дней</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">📊 Ваша статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            {userStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">⚡ Быстрые действия</h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/exercises')}
              className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">📋</span>
                <span className="font-medium text-indigo-800">Начать тренировку</span>
              </div>
              <span className="text-indigo-600">→</span>
            </button>
            <button 
              onClick={() => navigate('/progress')}
              className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">📈</span>
                <span className="font-medium text-green-800">Посмотреть прогресс</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">⚙️ Настройки</h3>
          <div className="space-y-4">
            {settings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{setting.icon}</span>
                  <span className="text-gray-700 font-medium">{setting.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">{setting.value}</span>
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">🆘 Поддержка</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">❓</span>
                <span className="text-gray-700">Часто задаваемые вопросы</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <span className="text-gray-700">Связаться с поддержкой</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">⭐</span>
                <span className="text-gray-700">Оценить приложение</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">ℹ️ О приложении</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Версия</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Дата обновления</span>
              <span>Январь 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Размер</span>
              <span>15.2 МБ</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="w-full py-4 px-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
        >
          🚪 Выйти из аккаунта
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {[
              { icon: '🏠', label: 'Домой', path: '/' },
              { icon: '📊', label: 'Прогресс', path: '/progress' },
              { icon: '📋', label: 'Упражнения', path: '/exercises' },
              { icon: '👤', label: 'Профиль', path: '/profile', active: true }
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

export default Profile 