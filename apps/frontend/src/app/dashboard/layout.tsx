import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <header className="mb-6 p-6 bg-white">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <section className='p-4'>
          {children}
        </section>
      </main>
    </div>
  );
}
