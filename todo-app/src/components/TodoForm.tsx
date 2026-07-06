import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Todo } from '@/types';

interface TodoFormProps {
  onAdd: (title: string, priority: string, category?: string) => void;
  isLoading?: boolean;
  categories?: string[];
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onAdd,
  isLoading = false,
  categories = [],
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, priority, category || undefined);
      setTitle('');
      setPriority('medium');
      setCategory('');
      setShowAdvanced(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="input flex-1"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="btn-primary"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Priority and Category Selection */}
        <div className="flex gap-4 pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="input text-sm"
              disabled={isLoading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {categories.length > 0 && (
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input text-sm"
                disabled={isLoading}
              >
                <option value="">None</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};
