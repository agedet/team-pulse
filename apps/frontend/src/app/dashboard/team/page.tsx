'use client'

import Spinner from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation';
import React from 'react'

function TeamPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <Spinner />

  if (!user) {
    router.push('/unauthorized');
    return;
  }

  return (
    <main>
      team Page

    </main>
  )
}

export default TeamPage