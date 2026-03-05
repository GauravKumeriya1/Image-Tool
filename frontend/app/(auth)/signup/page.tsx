'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthRedirect from '@/components/AuthRedirect'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    setLoading(true)

    try {
      await signup(formData.name, formData.email, formData.password)
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthRedirect>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-2 font-semibold"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </AuthRedirect>
  )
}
