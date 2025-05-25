'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') 
    return <p className="text-center mt-20">Access Denied</p>;

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