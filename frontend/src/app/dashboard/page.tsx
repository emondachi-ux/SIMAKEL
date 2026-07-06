'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useSyncStore } from '@/lib/store/syncStore';
import { useSync } from '@/lib/hooks/useSync';
import { useOffline } from '@/lib/hooks/useOffline';

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isSyncing, lastSyncTime, syncStats } = useSyncStore();
  const { isOnline } = useOffline();
  
  // Initialize sync
  useSync();

  if (!user) {
    router.push('/login');
    return <></;
  }

  const handleLogout = (): void => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SIMAKEL</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Online Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            {/* Sync Status */}
            {isSyncing && (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Syncing...</span>
              </div>
            )}
            {lastSyncTime && (
              <span className="text-xs text-slate-500 dark:text-slate-500">
                Last sync: {lastSyncTime.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Cards */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Classes</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Students</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Today Attendance</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total Tasks</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">0</div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow">
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</div>
          <p className="text-slate-600 dark:text-slate-400">Coming soon...</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-600 dark:text-slate-400">
        Dirancang oleh Fidelis Aprianus Dachi, S.Pd
      </footer>
    </div>
  );
}
