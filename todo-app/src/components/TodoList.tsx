import React from 'react';
import { motion } from 'framer-motion';
import { Todo, TodoStats } from '@/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  stats: TodoStats;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  isLoading?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  stats,
  onToggle,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading tasks...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 card"
      >
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
        <p className="text-slate-600 dark:text-slate-400">No tasks yet. Create one to get started.</p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
          <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400">Completed</div>
          <div className="text-2xl font-bold text-success">{stats.completed}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400">Active</div>
          <div className="text-2xl font-bold text-warning">{stats.active}</div>
        </div>
        <div className="card text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400">Progress</div>
          <div className="text-2xl font-bold text-primary-600">{stats.completionPercentage}%</div>
        </div>
      </div>

      {/* Task List */}
      <motion.div
        layout
        className="space-y-3"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => onToggle(todo.id)}
            onDelete={() => onDelete(todo.id)}
            onEdit={() => onEdit(todo)}
          />
        ))}
      </motion.div>
    </div>
  );
};
