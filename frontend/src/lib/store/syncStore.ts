import { create } from 'zustand';

interface SyncState {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  syncStats: {
    itemsSent: number;
    itemsReceived: number;
    conflictsResolved: number;
  } | null;
  setIsSyncing: (isSyncing: boolean) => void;
  setSyncStats: (stats: any) => void;
  setLastSyncTime: (time: Date) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  isSyncing: false,
  lastSyncTime: null,
  syncStats: null,

  setIsSyncing: (isSyncing: boolean) => set({ isSyncing }),
  setSyncStats: (stats: any) => set({ syncStats: stats }),
  setLastSyncTime: (time: Date) => set({ lastSyncTime: time }),
}));
