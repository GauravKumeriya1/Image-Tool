'use client'

import { useState } from 'react'

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1240,
    totalProjects: 4850,
    totalStorage: '2.4 TB',
    apiCalls: 124500,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
          <p className="text-gray-600 text-sm mt-2">Total Users</p>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-green-600">{stats.totalProjects}</div>
          <p className="text-gray-600 text-sm mt-2">Total Projects</p>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-orange-600">{stats.totalStorage}</div>
          <p className="text-gray-600 text-sm mt-2">Total Storage</p>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold text-purple-600">{stats.apiCalls}</div>
          <p className="text-gray-600 text-sm mt-2">API Calls Today</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent User Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">User</th>
                <th className="text-left py-2 px-4">Action</th>
                <th className="text-left py-2 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">user@example.com</td>
                <td className="py-2 px-4">Uploaded video</td>
                <td className="py-2 px-4">5 minutes ago</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">another@example.com</td>
                <td className="py-2 px-4">Downloaded subtitles</td>
                <td className="py-2 px-4">15 minutes ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
