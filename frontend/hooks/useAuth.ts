import { useCallback } from 'react'
import apiClient from '@/lib/api'

export const useAuth = () => {
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      return response.data
    } catch (error) {
      throw error
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/signup', { name, email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      return response.data
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
  }, [])

  return { login, signup, logout }
}
