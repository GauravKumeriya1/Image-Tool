import axios from 'axios'
import { Upload, Transcript } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// API Functions
export const uploadFile = async (file: File, projectName: string, language: string = 'en'): Promise<Upload> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('projectName', projectName)
  formData.append('language', language)

  const response = await apiClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}

export const startTranscription = async (uploadId: string): Promise<{ transcriptId: string }> => {
  const response = await apiClient.post('/api/transcribe', { uploadId })
  return response.data.data
}

export const getTranscript = async (transcriptId: string): Promise<Transcript> => {
  const response = await apiClient.get(`/api/transcript/${transcriptId}`)
  return response.data.data
}

export const downloadSubtitle = async (transcriptId: string, format: 'srt' | 'vtt' | 'stl'): Promise<Blob> => {
  const response = await apiClient.get(`/api/download/${format}/${transcriptId}`, {
    responseType: 'blob',
  })
  return response.data
}

export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  const response = await apiClient.get('/api/health')
  return response.data
}

export default apiClient
