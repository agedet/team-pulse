'use client'

import { useEffect, useState } from "react";
import axios from "axios";

interface TeamMember {
  email: string;
  team: string;
  teamRole: string;
  statuses: {
    status: string;
    project: string;
    updatedAt: string;
  }[];
}

export function TeamMembersTable({ teamId }: { teamId: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await axios.get(`${API_URL}/admin/team/${teamId}`);
      setMembers(res.data);
    };

    fetchMembers();
  }, [API_URL, teamId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Team Members & Status</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Team</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="border p-2">{member.email}</td>
              <td className="border p-2">{member.team}</td>
              <td className="border p-2">{member.teamRole}</td>
              <td className="border p-2">{member.statuses?.[0]?.status || '-'}</td>
              <td className="border p-2">{member.statuses?.[0]?.project || '-'}</td>
              <td className="border p-2">{member.statuses?.[0]?.updatedAt || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
