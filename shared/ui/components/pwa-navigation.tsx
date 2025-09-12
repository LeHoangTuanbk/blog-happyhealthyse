'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PWANavigation() {
  const router = useRouter();
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator.standalone as boolean)) ||
      document.referrer.includes('android-app://');

    setIsPWA(isStandalone);
  }, []);

  if (!isPWA) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex h-20 items-center justify-center bg-white dark:bg-gray-900">
      <button
        onClick={() => router.back()}
        className="flex h-full flex-1 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Go back"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => router.push('/')}
        className="flex h-full flex-1 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Go home"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </button>

      <button
        onClick={() => router.forward()}
        className="flex h-full flex-1 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Go forward"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
