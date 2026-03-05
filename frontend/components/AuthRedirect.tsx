'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface AuthRedirectProps {
  children: React.ReactNode
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const { getProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {
          await getProfile()
          router.push('/dashboard')
        } catch (error) {
          // Token is invalid, stay on auth page
          localStorage.removeItem('token')
        }
      }
    }

    checkAuth()
  }, [getProfile, router])

  return <>{children}</>
}