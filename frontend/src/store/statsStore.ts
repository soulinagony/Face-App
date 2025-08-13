import { create } from 'zustand'
import { useAuthStore } from './authStore'

interface UserStats {
  id: number
  user_id: number
  total_exercises_completed: number
  total_workout_time_minutes: number
  total_xp_earned: number
  current_streak_days: number
  best_streak_days: number
  level: number
  xp_to_next_level: number
  exercises_completed_today: number
  workout_time_today_minutes: number
  xp_earned_today: number
  last_workout_date: string | null
  created_at: string
  updated_at: string | null
}

interface StatsStore {
  stats: UserStats | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchStats: () => Promise<void>
  updateStats: (exercisesCompleted: number, workoutTimeMinutes: number, xpEarned: number) => Promise<void>
  resetDailyStats: () => Promise<void>
}

const API_BASE_URL = 'http://localhost:8000'

export const useStatsStore = create<StatsStore>((set, get) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    const { user, token } = useAuthStore.getState()
    if (!user || !token) return

    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-stats/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }

      const stats = await response.json()
      set({ stats, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
    }
  },

  updateStats: async (exercisesCompleted: number, workoutTimeMinutes: number, xpEarned: number) => {
    const { user, token } = useAuthStore.getState()
    if (!user || !token) return

    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-stats/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exercises_completed: exercisesCompleted,
          workout_time_minutes: workoutTimeMinutes,
          xp_earned: xpEarned
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update stats')
      }

      const updatedStats = await response.json()
      set({ stats: updatedStats, isLoading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
    }
  },

  resetDailyStats: async () => {
    const { user, token } = useAuthStore.getState()
    if (!user || !token) return

    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-stats/reset-daily`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to reset daily stats')
      }

      // Перезагружаем статистику после сброса
      await get().fetchStats()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false })
    }
  }
})) 