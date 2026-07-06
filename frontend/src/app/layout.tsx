'use client';

import { useEffect, useState } from 'react';
import { initDB } from '@/lib/db/local';
import { initApiClient } from '@/lib/api/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        // Initialize local database
        await initDB();
        // Initialize API client
        initApiClient();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  if (!isInitialized) {
    return (
      <html>
        <body>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p>Initializing SIMAKEL...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={isDark ? 'dark' : ''}>
      <head>
        <title>SIMAKEL - Sistem Manajemen Kelas Digital</title>
        <meta name="description" content="Sistem Manajemen Kelas Digital dengan sinkronisasi offline-online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
