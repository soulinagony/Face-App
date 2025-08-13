import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Exercises from './pages/Exercises'
import Progress from './pages/Progress'
import Profile from './pages/Profile'
import './index.css'

// Компонент для защищенных роутов
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />
}

// Компонент для редиректа с авторизованных страниц
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>
}

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Проверяем авторизацию при загрузке приложения
    if (!isAuthenticated) {
      checkAuth()
    }
  }, [checkAuth, isAuthenticated])

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Страница авторизации */}
          <Route 
            path="/auth" 
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            } 
          />
          
          {/* Защищенные страницы */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/exercises" 
            element={
              <ProtectedRoute>
                <Exercises />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/progress" 
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Редирект на главную для всех остальных путей */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
