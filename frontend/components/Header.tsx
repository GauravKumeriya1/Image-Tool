import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Subtitle AI</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link href="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  )
}
