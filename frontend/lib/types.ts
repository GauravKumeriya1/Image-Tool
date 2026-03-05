export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface Upload {
  id: string
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  projectName: string
  language: string
  status: 'uploaded' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

export interface Transcript {
  id: string
  uploadId: string
  fullText: string
  language: string
  duration: number
  srtContent: string
  vttContent: string
  stlContent: string
  jsonContent: string
  status: 'processing' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  userId: string
  name: string
  duration: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  fileUrl: string
  subtitles: {
    srt?: string
    vtt?: string
    stl?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface Subtitle {
  id: string
  projectId: string
  format: 'srt' | 'vtt' | 'stl'
  content: string
  createdAt: Date
}
