import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-6 shadow-md bg-white">
      <Link href='/'>
        <h1 className="text-2xl font-bold text-blue-600">TeamPulse</h1>
      </Link>
       
      <div className="space-x-4">
        <Link href="/login">
          <Button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Login
          </Button>
        </Link>

        <Link href="/register" className='hidden sm:inline-flex'>
          <Button className="px-4 py-2 text-sm font-medium bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
            Create Account
          </Button>
        </Link>
      </div>
    </header>
  );
}
