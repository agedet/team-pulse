'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  teamName: string;
  teamRole: string;
  status: string;
}

export default function TeamList() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get(`${API_URL}/team/`);
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to load team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-lg font-medium mb-4">Team Members</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b font-medium">{member.fullName}</td>
                <td className="px-4 py-2 border-b">{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}