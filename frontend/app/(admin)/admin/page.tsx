'use client'

import { useAdminStats, useUserUsage } from '../../../hooks/useAdmin'

export default function AdminDashboard() {
  const { stats, loading: statsLoading, error: statsError } = useAdminStats()
  const { usage, loading: usageLoading, error: usageError } = useUserUsage()

  if (statsLoading || usageLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  if (statsError || usageError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-red-600 mt-2">Error: {statsError || usageError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">{stats?.totalUsers || 0}</div>
          <p className="text-gray-600 text-sm mt-2">Total Users</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">{stats?.totalTranscripts || 0}</div>
          <p className="text-gray-600 text-sm mt-2">Total Transcripts</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-orange-600">{usage.length}</div>
          <p className="text-gray-600 text-sm mt-2">Active Users</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {usage.reduce((sum, user) => sum + user.transcript_count, 0)}
          </div>
          <p className="text-gray-600 text-sm mt-2">Total Usage</p>
        </div>
      </div>

      {/* Usage per User */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Usage per User</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">User</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Projects</th>
                <th className="text-left py-2 px-4">Transcripts</th>
                <th className="text-left py-2 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {usage.slice(0, 10).map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.project_count}</td>
                  <td className="py-2 px-4">{user.transcript_count}</td>
                  <td className="py-2 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
