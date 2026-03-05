import { useState, useEffect } from 'react'
import api from '../lib/api'

export interface AdminStats {
  totalUsers: number
  totalTranscripts: number
}

export interface UserUsage {
  id: string
  name: string
  email: string
  transcript_count: number
  project_count: number
  created_at: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
}

export interface Transcript {
  id: string
  full_text: string
  language: string
  duration: number
  status: string
  created_at: string
  file_name: string
  file_size: number
  user_name: string
  user_email: string
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/stats')
      setStats(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch admin stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}

export const useUserUsage = () => {
  const [usage, setUsage] = useState<UserUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsage = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/usage')
      setUsage(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch user usage')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsage()
  }, [])

  return { usage, loading, error, refetch: fetchUsage }
}

export const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/users')
      setUsers(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(users.filter(user => user.id !== userId))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.message || 'Failed to delete user' }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, loading, error, refetch: fetchUsers, deleteUser }
}

export const useAllTranscripts = () => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTranscripts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/transcripts')
      setTranscripts(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch transcripts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTranscripts()
  }, [])

  return { transcripts, loading, error, refetch: fetchTranscripts }
}