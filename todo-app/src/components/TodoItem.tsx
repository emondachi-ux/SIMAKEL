import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import { Todo } from '@/types';
import { getPriorityColor, getDueDateColor, getDueDateLabel } from '@/lib/utils';
import { formatDate } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ x: 4 }}
      className={`card group cursor-pointer ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className="mt-1 flex-shrink-0 focus:outline-none"
          aria-label="Toggle task completion"
        >
          {todo.completed ? (
            <CheckCircle2 size={24} className="text-success" />
          ) : (
            <Circle size={24} className="text-slate-300 dark:text-slate-600 hover:text-primary-500" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 justify-between mb-2">
            <h3
              className={`font-semibold ${
                todo.completed
                  ? 'line-through text-slate-500'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={onEdit}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                aria-label="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={onDelete}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-danger"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Priority Badge */}
            <span className={`badge ${getPriorityColor(todo.priority)} text-xs`}>
              {todo.priority}
            </span>

            {/* Category Badge */}
            {todo.category && (
              <span className="badge bg-slate-200 dark:bg-slate-700 text-xs">
                {todo.category}
              </span>
            )}

            {/* Due Date */}
            {todo.dueDate && (
              <span className={`text-xs ${getDueDateColor(new Date(todo.dueDate), todo.completed)}`}>
                {getDueDateLabel(new Date(todo.dueDate))}
              </span>
            )}

            {/* Tags */}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex gap-1">
                {todo.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {todo.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
              {todo.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
