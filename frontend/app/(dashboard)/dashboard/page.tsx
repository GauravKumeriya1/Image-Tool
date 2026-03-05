'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Upload, FileText, Download, Clock, TrendingUp, Activity } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalTranscripts: 0,
    totalMinutes: 0,
    completedTranscripts: 0,
  })

  const [recentTranscripts] = useState([
    {
      id: '1',
      projectName: 'Product Demo Video',
      duration: 245,
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      language: 'en',
    },
    {
      id: '2',
      projectName: 'Podcast Episode 15',
      duration: 180,
      status: 'processing',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      language: 'en',
    },
    {
      id: '3',
      projectName: 'Interview Recording',
      duration: 95,
      status: 'completed',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      language: 'en',
    },
  ])

  useEffect(() => {
    // In a real app, fetch stats from API
    setStats({
      totalUploads: 12,
      totalTranscripts: 10,
      totalMinutes: 620,
      completedTranscripts: 8,
    })
  }, [])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Just now' : `${diffInHours}h ago`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your transcription overview.</p>
        </div>
        <Link href="/dashboard/upload" className="btn-primary flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload Media</span>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/upload" className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Upload Media</h3>
              <p className="text-sm text-gray-600">Start a new transcription</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/download" className="card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Download Subtitles</h3>
              <p className="text-sm text-gray-600">Get your subtitle files</p>
            </div>
          </div>
        </Link>

        <div className="card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">API Status</h3>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Uploads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUploads}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transcripts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTranscripts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Minutes Processed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMinutes}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalTranscripts > 0
                  ? Math.round((stats.completedTranscripts / stats.totalTranscripts) * 100)
                  : 0
                }%
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transcripts */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Transcripts</h2>
          <Link href="/dashboard/download" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all →
          </Link>
        </div>

        <div className="space-y-4">
          {recentTranscripts.map((transcript) => (
            <div key={transcript.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{transcript.projectName}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDuration(transcript.duration)} • {transcript.language.toUpperCase()} • {formatDate(transcript.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  transcript.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : transcript.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {transcript.status}
                </span>

                {transcript.status === 'completed' && (
                  <Link
                    href={`/dashboard/transcript/${transcript.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {recentTranscripts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transcripts yet</h3>
            <p className="text-gray-600 mb-4">Upload your first media file to get started</p>
            <Link href="/dashboard/upload" className="btn-primary">
              Upload Media
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
