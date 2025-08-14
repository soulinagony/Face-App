import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { signInWithGoogle, signInWithApple } from '../lib/supabase'

export interface User {
  id: number
  email: string
  is_active: boolean
  created_at: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithApple: () => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
  setLoading: (loading: boolean) => void
  checkAuth: () => Promise<void>
}

const API_BASE_URL = 'http://127.0.0.1:8000'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const formData = new FormData()
          formData.append('username', email)
          formData.append('password', password)

          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const data = await response.json()
          set({ 
            token: data.access_token,
            isAuthenticated: true,
            isLoading: false 
          })

          // Получаем данные пользователя
          await get().checkAuth()
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || 'Registration failed')
          }

          // После регистрации автоматически логинимся
          await get().login(email, password)
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User) => {
        set({ user })
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      checkAuth: async () => {
        const { token } = get()
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        try {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error('Token invalid')
          }

          const userData = await response.json()
          set({ 
            user: userData,
            isAuthenticated: true 
          })
        } catch (error) {
          // Токен невалидный, выходим
          get().logout()
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })
        try {
          // TODO: Implement Google OAuth
          console.log('Google OAuth not implemented yet')
        } catch (error) {
          console.error('Google login error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      loginWithApple: async () => {
        set({ isLoading: true })
        try {
          // TODO: Implement Apple OAuth
          console.log('Apple OAuth not implemented yet')
        } catch (error) {
          console.error('Apple login error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'facefit-auth',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }),
    }
  )
) 