'use client'

import { useAllTranscripts } from '../../../../hooks/useAdmin'

export default function AdminTranscriptsPage() {
  const { transcripts, loading, error } = useAllTranscripts()

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transcript Management</h1>
          <p className="text-gray-600 mt-2">Loading transcripts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transcript Management</h1>
          <p className="text-red-600 mt-2">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transcript Management</h1>
        <p className="text-gray-600 mt-2">View all transcripts ({transcripts.length} total)</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">File Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Language</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
            </tr>
          </thead>
          <tbody>
            {transcripts.map((transcript) => (
              <tr key={transcript.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="max-w-xs truncate" title={transcript.file_name}>
                    {transcript.file_name}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium">{transcript.user_name}</div>
                    <div className="text-sm text-gray-500">{transcript.user_email}</div>
                  </div>
                </td>
                <td className="py-4 px-6">{transcript.language.toUpperCase()}</td>
                <td className="py-4 px-6">
                  {transcript.duration ? `${Math.round(transcript.duration)}s` : 'N/A'}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transcript.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : transcript.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : transcript.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {transcript.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {new Date(transcript.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transcripts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No transcripts found.</p>
        </div>
      )}
    </div>
  )
}