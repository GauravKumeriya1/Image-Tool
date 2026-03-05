import { useCallback } from 'react'
import apiClient from '@/lib/api'

export const useAuth = () => {
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      return { token, user }
    } catch (error) {
      throw error
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/signup', { name, email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      return { token, user }
    } catch (error) {
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
    }
  }, [])

  const getProfile = useCallback(async () => {
    try {
      const response = await apiClient.get('/api/auth/profile')
      return response.data.user
    } catch (error) {
      throw error
    }
  }, [])

  return { login, signup, logout, getProfile }
}
