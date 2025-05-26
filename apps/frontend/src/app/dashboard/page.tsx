'use client';

import Spinner from '@/components/Spinner';
import StatusForm from '@/components/StatustForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <Spinner />

  if (!user) {
    router.push('/unauthorized');
    return;
  }

  return (
    <main>
      <div className='flex flex-col gap-4 items-start justify-between md:flex-row md:items-center'>
        <div>
          <h2 className="text-xl font-semibold">
            Hello, {' '} 
            {user.fullName || user.email}
          </h2>
        </div>

        <StatusForm />
      </div>

      {/* current task */}
    </main>
  );
}