'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    notifications: true,
    apiNotifications: false,
  })

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences</p>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="rounded"
              />
              <span className="ml-2 text-gray-700">Email notifications for project completion</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.apiNotifications}
                onChange={(e) => handleChange('apiNotifications', e.target.checked)}
                className="rounded"
              />
              <span className="ml-2 text-gray-700">Email notifications for API usage alerts</span>
            </label>
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Account
          </button>
        </div>

        <button className="w-full btn-primary py-2 font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  )
}
