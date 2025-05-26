'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl text-blue-600 font-semibold mb-6">TeamPulse</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="block hover:text-blue-600">
            Dashboard
          </Link>

          <Link href="/dashboard/team" className="block hover:text-blue-600">
            Team
          </Link>

          {user?.teamRole === 'admin' && (
            <Link href="/dashboard/admin" className="block hover:text-blue-600">
              Admin Panel
            </Link>
          )}
        </nav>
      </div>

      <Button
        onClick={logout}
        className="mt-6 text-sm text-red-600 hover:underline"
      >
        Logout
      </Button>
    </aside>
  );
}