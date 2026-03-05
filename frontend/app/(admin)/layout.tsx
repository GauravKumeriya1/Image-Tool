'use client'

import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-sm transition-all duration-300`}
      >
        <div className="p-6">
          <h1 className={`font-bold text-red-600 ${sidebarOpen ? 'text-xl' : 'text-sm'}`}>
            {sidebarOpen ? 'Admin' : 'ADM'}
          </h1>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <a
            href="/admin"
            className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <span>📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </a>
          <a
            href="/admin/users"
            className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <span>👥</span>
            {sidebarOpen && <span>Users</span>}
          </a>
          <a
            href="/admin/transcripts"
            className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <span>📝</span>
            {sidebarOpen && <span>Transcripts</span>}
          </a>
          <a
            href="/admin/projects"
            className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <span>📁</span>
            {sidebarOpen && <span>Projects</span>}
          </a>
          <a
            href="/admin/settings"
            className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <span>⚙️</span>
            {sidebarOpen && <span>Settings</span>}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm p-6 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            ☰
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">👤 Admin</span>
            <button className="btn-secondary text-sm">Logout</button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
