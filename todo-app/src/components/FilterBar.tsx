import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Trash2, Download, Upload } from 'lucide-react';
import { TodoFilter } from '@/types';
import { useUIStore } from '@/store/uiStore';

interface FilterBarProps {
  filters: TodoFilter;
  onFiltersChange: (filters: Partial<TodoFilter>) => void;
  onReset: () => void;
  categories: string[];
  onExport: () => void;
  onImport: () => void;
  onClear: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onReset,
  categories,
  onExport,
  onImport,
  onClear,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-6"
    >
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={filters.searchText}
            onChange={(e) => onFiltersChange({ searchText: e.target.value })}
            placeholder="Search tasks..."
            className="input pl-10"
          />
        </div>
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        {/* Status Filter */}
        <select
          value={filters.status || 'all'}
          onChange={(e) => onFiltersChange({ status: e.target.value as any })}
          className="input text-sm"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority || ''}
          onChange={(e) => onFiltersChange({ priority: e.target.value || undefined })}
          className="input text-sm"
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Category Filter */}
        {categories.length > 0 && (
          <select
            value={filters.category || ''}
            onChange={(e) => onFiltersChange({ category: e.target.value || undefined })}
            className="input text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Due Date Filter */}
        <select
          value={filters.dueDateRange || 'all'}
          onChange={(e) => onFiltersChange({ dueDateRange: e.target.value as any })}
          className="input text-sm"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This Week</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={onReset} className="btn-secondary text-sm">
          <Filter size={16} />
          Reset
        </button>
        <button onClick={onExport} className="btn-secondary text-sm">
          <Download size={16} />
          Export
        </button>
        <button onClick={onImport} className="btn-secondary text-sm">
          <Upload size={16} />
          Import
        </button>
        <button onClick={onClear} className="btn-danger text-sm">
          <Trash2 size={16} />
          Clear All
        </button>
      </div>
    </motion.div>
  );
};
