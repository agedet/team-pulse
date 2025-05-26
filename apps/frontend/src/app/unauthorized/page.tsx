'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
      <p className="text-sm text-gray-400 mt-1">Redirecting to homepage...</p>
    </div>
  )
}
