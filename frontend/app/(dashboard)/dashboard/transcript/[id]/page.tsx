'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getTranscript, downloadSubtitle } from '@/lib/api'
import { Transcript } from '@/lib/types'
import toast from 'react-hot-toast'
import { Download, FileText, Clock, Languages } from 'lucide-react'

export default function TranscriptViewerPage() {
  const params = useParams()
  const transcriptId = params.id as string

  const [transcript, setTranscript] = useState<Transcript | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    loadTranscript()
  }, [transcriptId])

  const loadTranscript = async () => {
    try {
      const data = await getTranscript(transcriptId)
      setTranscript(data)
    } catch (error: any) {
      console.error('Error loading transcript:', error)
      toast.error('Failed to load transcript')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: 'srt' | 'vtt' | 'stl') => {
    if (!transcript) return

    setDownloading(format)
    try {
      const blob = await downloadSubtitle(transcript.id, format)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transcript.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success(`${format.toUpperCase()} downloaded successfully!`)
    } catch (error: any) {
      console.error('Download error:', error)
      toast.error(`Failed to download ${format.toUpperCase()}`)
    } finally {
      setDownloading(null)
    }
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!transcript) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transcript Not Found</h2>
        <p className="text-gray-600">The transcript you're looking for doesn't exist or is still processing.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transcript Viewer</h1>
          <p className="text-gray-600 mt-2">Review and download your generated subtitles</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleDownload('srt')}
            disabled={downloading === 'srt'}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'srt' ? 'Downloading...' : 'Download SRT'}</span>
          </button>
          <button
            onClick={() => handleDownload('vtt')}
            disabled={downloading === 'vtt'}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'vtt' ? 'Downloading...' : 'Download VTT'}</span>
          </button>
          <button
            onClick={() => handleDownload('stl')}
            disabled={downloading === 'stl'}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'stl' ? 'Downloading...' : 'Download STL'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold capitalize">{transcript.status}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <Languages className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Language</p>
              <p className="font-semibold">{transcript.language.toUpperCase()}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{formatDuration(transcript.duration)}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">ID</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Transcript ID</p>
              <p className="font-semibold text-xs">{transcript.id.slice(0, 8)}...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Full Transcript</h2>
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {transcript.fullText}
          </p>
        </div>
      </div>

      {/* Subtitle Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <span>SRT Format</span>
            <button
              onClick={() => handleDownload('srt')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </h3>
          <div className="bg-gray-50 rounded p-3 text-sm font-mono max-h-48 overflow-y-auto">
            <pre className="text-gray-700 whitespace-pre-wrap">
              {transcript.srtContent?.slice(0, 500)}...
            </pre>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <span>VTT Format</span>
            <button
              onClick={() => handleDownload('vtt')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </h3>
          <div className="bg-gray-50 rounded p-3 text-sm font-mono max-h-48 overflow-y-auto">
            <pre className="text-gray-700 whitespace-pre-wrap">
              {transcript.vttContent?.slice(0, 500)}...
            </pre>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <span>STL Format</span>
            <button
              onClick={() => handleDownload('stl')}
              className="text-blue-600 hover:text-blue-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </h3>
          <div className="bg-gray-50 rounded p-3 text-sm font-mono max-h-48 overflow-y-auto">
            <pre className="text-gray-700 whitespace-pre-wrap">
              {transcript.stlContent?.slice(0, 500)}...
            </pre>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="btn-secondary"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Refresh Transcript
        </button>
      </div>
    </div>
  )
}