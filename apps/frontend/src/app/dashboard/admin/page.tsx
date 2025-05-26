'use client';

import { CreateTeamForm } from '@/components/CreateTeamForm';
import { InviteUserForm } from '@/components/InviteUsersForm';
import Spinner from '@/components/Spinner';
// import { TeamMembersTable } from '@/components/TeamMemberstable';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <Spinner />

  if (!user || user.teamRole !== 'admin') {
    router.push('/unauthorized');
    return
  }

  return (
    <main>
      <div className="flex flex-col gap-6">
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Create Team Form */}
          <div>
            <CreateTeamForm />
          </div>

          {/* Invite user Form */}
          <div>
            <InviteUserForm />
          </div>
        </div>

        {/* Teams Table */}
        {/* <div>
          <TeamMembersTable />
        </div> */}
      </div>
    </main>
  );
}