import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Stay in Sync with Your Team
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          TeamPulse helps remote and hybrid teams stay connected, track progress, and collaborate seamlessly.
        </p>
       
        <Link href="/register">
          <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold">
            Get Started Free
          </button>
        </Link>
      </div>
    </main>
  );
}
