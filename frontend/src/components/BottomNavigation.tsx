import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavItem {
  icon: string
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: '🏠', label: 'Домой', path: '/' },
  { icon: '📊', label: 'Прогресс', path: '/progress' },
  { icon: '📋', label: 'Упражнения', path: '/exercises' },
  { icon: '👤', label: 'Профиль', path: '/profile' }
]

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t px-4 py-3 z-50" style={{ 
      backgroundColor: 'var(--card-bg)',
      borderColor: 'var(--card-border)'
    }}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <button 
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-indigo-50' : 'hover:bg-indigo-50'
                }`}
                style={{ 
                  color: isActive ? '#4f46e5' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent'
                }}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNavigation 