'use client';

import StatusForm from '@/components/StatustForm';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-20">Loading user...</p>;

  return (
    <main>
      <div className='flex flex-col gap-4 items-start justify-between md:flex-row md:items-center'>
        <div className='flex flex-col'>
          <h2 className="text-xl font-semibold">
            Hello, 
            {user.fullName || user.email}
          </h2>

          <p>
            Your current role is: 
            <strong>{user.teamRole}</strong>
          </p>
        </div>

        <StatusForm />
      </div>

      {/* current task */}
    </main>
  );
}