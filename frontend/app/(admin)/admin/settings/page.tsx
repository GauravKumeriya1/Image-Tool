'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    dataRetention: 90,
    maxFileSize: 1024,
    apiRateLimit: 1000,
    emailNotifications: true,
  })

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Configure system settings</p>
      </div>

      <div className="card p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Retention (days)
          </label>
          <input
            type="number"
            value={settings.dataRetention}
            onChange={(e) => handleChange('dataRetention', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum File Size (MB)
          </label>
          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) => handleChange('maxFileSize', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Rate Limit (calls/hour)
          </label>
          <input
            type="number"
            value={settings.apiRateLimit}
            onChange={(e) => handleChange('apiRateLimit', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              className="rounded"
            />
            <span className="ml-2 text-gray-700">Enable email notifications</span>
          </label>
        </div>

        <button className="w-full btn-primary py-2 font-semibold">
          Save Settings
        </button>
      </div>
    </div>
  )
}
