import { useCallback } from 'react'
import apiClient from '@/lib/api'

export const useUpload = () => {
  const uploadFile = useCallback(async (file: File, projectName: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', projectName)

    try {
      const response = await apiClient.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  }, [])

  return { uploadFile }
}
