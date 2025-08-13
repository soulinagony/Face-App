import React from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  backPath?: string
  showProfileButton?: boolean
  rightContent?: React.ReactNode
  showLogo?: boolean
  onBackClick?: () => void
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  backPath = '/', 
  showProfileButton = true,
  rightContent,
  showLogo = false,
  onBackClick
}) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(backPath)
    }
  }

  return (
    <header className="shadow-sm border-b sticky top-0 z-40" style={{ 
      backgroundColor: 'var(--card-bg)',
      borderColor: 'var(--card-border)'
    }}>
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button 
                onClick={handleBackClick}
                className="flex items-center space-x-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Назад</span>
              </button>
            )}
            
            {showLogo && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  F
                </div>
                <div>
                  <h1 className="text-xl font-bold text-indigo-600">{title}</h1>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{new Date().toLocaleTimeString('ru')}</p>
                </div>
              </div>
            )}
            
            {!showLogo && (
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {rightContent}
            {showProfileButton && (
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                title="Профиль"
              >
                👤
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 