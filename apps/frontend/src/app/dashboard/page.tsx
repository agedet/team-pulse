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
      <div className='flex flex-col gap-6 items-start justify-between md:flex-row md:items-center'>
        <div className='grid gap-2'>
          <h2 className="text-lg font-semibold">
            Hello, {' '}
          </h2>

          <h2 className="text-lg font-semibold">
            {user.fullName || user.email}
          </h2>
        </div>
        
        <div>
          <StatusForm />
        </div>
      </div>

      {/* current task */}
    </main>
  );
}