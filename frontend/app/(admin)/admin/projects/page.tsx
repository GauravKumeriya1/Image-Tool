'use client'

export default function AdminProjectsPage() {
  const projects = [
    { id: 1, name: 'Project 1', user: 'john@example.com', status: 'Completed', size: '2.3 GB' },
    { id: 2, name: 'Project 2', user: 'jane@example.com', status: 'Processing', size: '1.5 GB' },
    { id: 3, name: 'Project 3', user: 'bob@example.com', status: 'Completed', size: '3.1 GB' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
        <p className="text-gray-600 mt-2">View and manage all user projects</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Project Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">User Email</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Size</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{project.name}</td>
                <td className="py-4 px-6">{project.user}</td>
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
                <td className="py-4 px-6">{project.size}</td>
                <td className="py-4 px-6">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-red-600 hover:underline ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
