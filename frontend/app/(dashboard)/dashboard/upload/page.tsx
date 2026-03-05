'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadFile, startTranscription } from '@/lib/api'
import toast from 'react-hot-toast'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [projectName, setProjectName] = useState('')
  const [language, setLanguage] = useState('en')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !projectName.trim()) return

    setUploading(true)
    try {
      // Upload file
      const uploadResult = await uploadFile(file, projectName.trim(), language)
      toast.success('File uploaded successfully!')

      // Start transcription
      setTranscribing(true)
      const transcribeResult = await startTranscription(uploadResult.id)
      toast.success('Transcription started!')

      // Redirect to transcript viewer
      router.push(`/dashboard/transcript/${transcribeResult.transcriptId}`)
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      setTranscribing(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Media</h1>
        <p className="text-gray-600 mt-2">Upload your audio or video file for subtitle generation</p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              onChange={handleChange}
              accept="audio/*,video/*"
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-lg font-semibold text-gray-900">
                {file ? file.name : 'Drag and drop your file here'}
              </p>
              <p className="text-sm text-gray-600 mt-2">or click to select from your computer</p>
              <p className="text-xs text-gray-500 mt-4">
                Supported formats: MP4, MOV, AVI, WAV, MP3, AAC (Max 100MB)
              </p>
              {file && (
                <p className="text-xs text-blue-600 mt-2">
                  Size: {formatFileSize(file.size)}
                </p>
              )}
            </label>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="input-field"
                placeholder="e.g., My Video Podcast"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || !projectName.trim() || uploading || transcribing}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : transcribing ? 'Starting Transcription...' : 'Upload & Transcribe'}
          </button>
        </form>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3">🎥</div>
          <h3 className="font-semibold mb-2">Multiple Formats</h3>
          <p className="text-sm text-gray-600">Supports video and audio files</p>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-semibold mb-2">AI Powered</h3>
          <p className="text-sm text-gray-600">Whisper AI for accurate transcription</p>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl mb-3">📝</div>
          <h3 className="font-semibold mb-2">Multiple Subtitles</h3>
          <p className="text-sm text-gray-600">SRT, VTT, and STL formats</p>
        </div>
      </div>
    </div>
  )
}
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">VTT</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">STL</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full btn-primary py-2 font-semibold mt-6"
          >
            {uploading ? 'Uploading...' : 'Upload and Process'}
          </button>
        </form>
      </div>
    </div>
  )
}
