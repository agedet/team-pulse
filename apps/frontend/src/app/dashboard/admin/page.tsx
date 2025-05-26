'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.teamRole !== 'admin') {
    router.push('/unauthorized');
    return
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded space-y-4">
        <div>
          <h3 className="text-lg font-medium">Create Team</h3>
          <p>Form to create a team goes here.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Invite Members</h3>
          <p>Form to invite members by email and assign roles.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p>List of team members and statuses.</p>
        </div>
      </div>
    </div>
  );
}