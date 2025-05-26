'use client'
import { useEffect, useState } from "react";
import axios from "axios";

interface TeamMember {
  email: string;
  teamRole: string;
  statuses: {
    status: string;
    project: string;
    updated_at: string;
  }[];
}

export function TeamMembersTable({ teamId }: { teamId: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await axios.get(`http://localhost:5000/admin/team/${teamId}/members`);
      setMembers(res.data);
    };

    fetchMembers();
  }, [teamId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Team Members & Status</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.email}</td>
              <td className="border p-2">{m.teamRole}</td>
              <td className="border p-2">{m.statuses?.[0]?.status || '-'}</td>
              <td className="border p-2">{m.statuses?.[0]?.project || '-'}</td>
              <td className="border p-2">{m.statuses?.[0]?.updated_at || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
