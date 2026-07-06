import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            ✓ TODO
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Simple & Powerful Task Management</p>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun size={24} className="text-yellow-500" />
          ) : (
            <Moon size={24} className="text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
};
