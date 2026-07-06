import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TodoFilter } from '@/types';

interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  filters: TodoFilter;
  setFilters: (filters: Partial<TodoFilter>) => void;
  resetFilters: () => void;
  sortBy: 'date' | 'priority' | 'manual';
  setSortBy: (sortBy: 'date' | 'priority' | 'manual') => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

const initialFilters: TodoFilter = {
  searchText: '',
  status: 'all',
  priority: undefined,
  category: undefined,
  dueDateRange: 'all',
};

export const useUIStore = create<UIState>(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      filters: initialFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () => set({ filters: initialFilters }),

      sortBy: 'manual',
      setSortBy: (sortBy) => set({ sortBy }),

      showCompleted: true,
      setShowCompleted: (show) => set({ showCompleted: show }),
    }),
    {
      name: 'todo-ui-storage',
    }
  )
);
