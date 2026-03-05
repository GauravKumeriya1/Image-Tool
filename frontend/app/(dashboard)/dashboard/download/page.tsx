'use client'

import { useState, useEffect } from 'react'
import { getTranscript, downloadSubtitle } from '@/lib/api'
import { Transcript } from '@/lib/types'
import toast from 'react-hot-toast'
import { Download, FileText, Search, Filter } from 'lucide-react'

export default function DownloadPage() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTranscripts, setSelectedTranscripts] = useState<Set<string>>(new Set())
  const [downloading, setDownloading] = useState<string | null>(null)

  // Mock data for now - in real app, you'd fetch from API
  useEffect(() => {
    // Simulate loading transcripts
    const mockTranscripts: Transcript[] = [
      {
        id: '1',
        uploadId: 'upload-1',
        fullText: 'This is a sample transcript...',
        language: 'en',
        duration: 120,
        srtContent: '1\n00:00:00,000 --> 00:00:05,000\nThis is a sample transcript...',
        vttContent: 'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nThis is a sample transcript...',
        stlContent: 'STL format content...',
        jsonContent: '{"segments": []}',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    setTranscripts(mockTranscripts)
    setLoading(false)
  }, [])

  const filteredTranscripts = transcripts.filter(transcript =>
    transcript.fullText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.language.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectTranscript = (id: string) => {
    const newSelected = new Set(selectedTranscripts)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTranscripts(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedTranscripts.size === filteredTranscripts.length) {
      setSelectedTranscripts(new Set())
    } else {
      setSelectedTranscripts(new Set(filteredTranscripts.map(t => t.id)))
    }
  }

  const handleDownload = async (transcriptId: string, format: 'srt' | 'vtt' | 'stl') => {
    setDownloading(`${transcriptId}-${format}`)
    try {
      const blob = await downloadSubtitle(transcriptId, format)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transcript-${transcriptId}.${format}`
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

  const handleBulkDownload = async (format: 'srt' | 'vtt' | 'stl') => {
    if (selectedTranscripts.size === 0) return

    setDownloading(`bulk-${format}`)
    try {
      for (const transcriptId of selectedTranscripts) {
        await handleDownload(transcriptId, format)
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      toast.success(`Bulk ${format.toUpperCase()} download completed!`)
    } catch (error) {
      toast.error('Some downloads failed')
    } finally {
      setDownloading(null)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Download Subtitles</h1>
          <p className="text-gray-600 mt-2">Download your generated subtitles in multiple formats</p>
        </div>
        {selectedTranscripts.size > 0 && (
          <div className="flex space-x-3">
            <button
              onClick={() => handleBulkDownload('srt')}
              disabled={downloading === 'bulk-srt'}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading === 'bulk-srt' ? 'Downloading...' : `Download SRT (${selectedTranscripts.size})`}</span>
            </button>
            <button
              onClick={() => handleBulkDownload('vtt')}
              disabled={downloading === 'bulk-vtt'}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading === 'bulk-vtt' ? 'Downloading...' : `Download VTT (${selectedTranscripts.size})`}</span>
            </button>
            <button
              onClick={() => handleBulkDownload('stl')}
              disabled={downloading === 'bulk-stl'}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading === 'bulk-stl' ? 'Downloading...' : `Download STL (${selectedTranscripts.size})`}</span>
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transcripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>
                {selectedTranscripts.size === filteredTranscripts.length && filteredTranscripts.length > 0
                  ? 'Deselect All'
                  : 'Select All'
                }
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcripts List */}
      <div className="space-y-4">
        {filteredTranscripts.length === 0 ? (
          <div className="card p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No transcripts found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Upload some media files to get started'}
            </p>
          </div>
        ) : (
          filteredTranscripts.map((transcript) => (
            <div key={transcript.id} className="card p-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedTranscripts.has(transcript.id)}
                  onChange={() => handleSelectTranscript(transcript.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Transcript {transcript.id.slice(0, 8)}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{formatDuration(transcript.duration)}</span>
                      <span>•</span>
                      <span className="capitalize">{transcript.language}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transcript.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transcript.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {transcript.fullText}
                  </p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDownload(transcript.id, 'srt')}
                      disabled={downloading === `${transcript.id}-srt`}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      {downloading === `${transcript.id}-srt` ? 'Downloading...' : 'SRT'}
                    </button>
                    <button
                      onClick={() => handleDownload(transcript.id, 'vtt')}
                      disabled={downloading === `${transcript.id}-vtt`}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      {downloading === `${transcript.id}-vtt` ? 'Downloading...' : 'VTT'}
                    </button>
                    <button
                      onClick={() => handleDownload(transcript.id, 'stl')}
                      disabled={downloading === `${transcript.id}-stl`}
                      className="btn-secondary text-sm disabled:opacity-50"
                    >
                      {downloading === `${transcript.id}-stl` ? 'Downloading...' : 'STL'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bulk Actions Footer */}
      {selectedTranscripts.size > 0 && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg p-4 border">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedTranscripts.size} transcript{selectedTranscripts.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTranscripts(new Set())}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}