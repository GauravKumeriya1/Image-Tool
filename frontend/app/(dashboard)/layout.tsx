'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'

interface User {
  id: string
  name: string
  email: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const { getProfile, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getProfile()
        setUser(userData)
      } catch (error) {
        console.error('Failed to load user profile:', error)
      }
    }

    loadUser()
  }, [getProfile])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-white shadow-sm transition-all duration-300`}
        >
          <div className="p-6">
            <h1 className={`font-bold text-blue-600 ${sidebarOpen ? 'text-xl' : 'text-sm'}`}>
              {sidebarOpen ? 'Subtitle AI' : 'SAI'}
            </h1>
          </div>

          <nav className="mt-8 space-y-2 px-4">
            <a
              href="/dashboard"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <span>📊</span>
              {sidebarOpen && <span>Dashboard</span>}
            </a>
            <a
              href="/dashboard/upload"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <span>📁</span>
              {sidebarOpen && <span>Upload</span>}
            </a>
            <a
              href="/dashboard/download"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <span>⬇️</span>
              {sidebarOpen && <span>Download</span>}
            </a>
            <a
              href="/dashboard/projects"
              className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <span>📝</span>
              {sidebarOpen && <span>Projects</span>}
            </a>
            <a
              href="/dashboard/settings"
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
              <span className="text-gray-600">
                👤 {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
