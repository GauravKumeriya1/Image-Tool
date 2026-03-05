'use client'

import { useAllUsers } from '../../../../hooks/useAdmin'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminUsersPage() {
  const { users, loading, error, deleteUser } = useAllUsers()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return
    }

    setDeletingId(userId)
    const result = await deleteUser(userId)
    setDeletingId(null)

    if (result.success) {
      toast.success('User deleted successfully')
    } else {
      toast.error(result.error || 'Failed to delete user')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-red-600 mt-2">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">View and manage all users ({users.length} total)</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Joined</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <button
                    className="text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    disabled={deletingId === user.id || user.role === 'admin'}
                  >
                    {deletingId === user.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
