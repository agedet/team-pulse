'use client';
import { useEffect, useState } from 'react';

interface TeamMember {
  id: string;
  fullName: string;
  status: string;
}

export default function TeamList() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch('/api/team/statuses');
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error('Failed to load team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-lg font-medium mb-4">Team Members</h3>
      <ul className="space-y-2">
        {members.map(member => (
          <li key={member.id} className="border-b pb-2">
            <span className="font-semibold">{member.fullName}</span>: {member.status}
          </li>
        ))}
      </ul>
    </div>
  );
}