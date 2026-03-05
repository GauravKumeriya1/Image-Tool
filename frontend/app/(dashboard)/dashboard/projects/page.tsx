'use client'

export default function ProjectsPage() {
  const projects = [
    { id: 1, name: 'Podcast Episode 1', duration: '45:30', status: 'Completed', created: '2 days ago' },
    { id: 2, name: 'Tutorial Video', duration: '30:15', status: 'Processing', created: 'Today' },
    { id: 3, name: 'Meeting Recording', duration: '1:20:45', status: 'Completed', created: '1 week ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-2">Manage and download your subtitle projects</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{project.name}</td>
                <td className="py-4 px-6">{project.duration}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-600">{project.created}</td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-blue-600 hover:underline ml-4">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
