'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you are looking for does not exist.</p>
      <p className="text-sm text-gray-400 mt-1">Redirecting to homepage...</p>
    </div>
  )
}
