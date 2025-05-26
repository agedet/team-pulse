'use client';

import { CreateTeamForm } from '@/components/CreateTeamForm';
import { InviteUserForm } from '@/components/InviteUsersForm';
import Spinner from '@/components/Spinner';
import { TeamMembersTable } from '@/components/TeamMemberstable';
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
    <div>
      <div className="bg-white shadow p-4 rounded space-y-4">
        <div>
          <CreateTeamForm />
        </div>

        <div>
          <InviteUserForm />
        </div>
        <div>
          <TeamMembersTable />
        </div>
      </div>
    </div>
  );
}