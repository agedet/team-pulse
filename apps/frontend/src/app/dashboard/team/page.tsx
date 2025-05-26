import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation';
import React from 'react'

function TeamPage() {
  const { user } = useAuth();
  const router = useRouter();

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