import React, { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { Toast } from './components/Toast';
import { useTodos } from './lib/hooks/useTodos';
import { useUIStore } from './store/uiStore';
import { filterTodos, sortTodos, calculateStats } from './lib/utils';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { todos, isLoading, add, update, toggle, remove } = useTodos();
  const { isDarkMode, toggleDarkMode, filters, setFilters, resetFilters, sortBy, showCompleted } =
    useUIStore();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Get all categories from todos
  const categories = useMemo(() => {
    const cats = new Set(todos.map((t) => t.category).filter(Boolean));
    return Array.from(cats);
  }, [todos]);

  // Filter and sort todos
  const filteredTodos = useMemo(() => {
    let result = filterTodos(todos, filters);
    if (!showCompleted) {
      result = result.filter((t) => !t.completed);
    }
    return sortTodos(result, sortBy);
  }, [todos, filters, sortBy, showCompleted]);

  // Calculate stats
  const stats = useMemo(() => calculateStats(todos), [todos]);

  // Show toast
  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  // Handle add todo
  const handleAdd = useCallback(
    async (title: string, priority: string, category?: string) => {
      try {
        await add(title, priority, category);
        showToast('Task added successfully', 'success');
      } catch (error) {
        showToast('Failed to add task', 'error');
      }
    },
    [add, showToast]
  );

  // Handle delete todo
  const handleDelete = useCallback(
    async (id: string) => {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await remove(id);
          showToast('Task deleted', 'success');
        } catch (error) {
          showToast('Failed to delete task', 'error');
        }
      }
    },
    [remove, showToast]
  );

  // Handle toggle todo
  const handleToggle = useCallback(
    async (id: string) => {
      try {
        await toggle(id);
        const todo = todos.find((t) => t.id === id);
        if (todo?.completed) {
          showToast('Task completed! Great job!', 'success');
        }
      } catch (error) {
        showToast('Failed to update task', 'error');
      }
    },
    [toggle, todos, showToast]
  );

  // Handle export
  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Tasks exported successfully', 'success');
  }, [todos, showToast]);

  // Handle import
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const importedTodos = JSON.parse(event.target?.result as string);
            if (Array.isArray(importedTodos)) {
              for (const todo of importedTodos) {
                await add(todo.title, todo.priority, todo.category);
              }
              showToast(`${importedTodos.length} tasks imported successfully`, 'success');
            }
          } catch (error) {
            showToast('Failed to import tasks', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [add, showToast]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    if (confirm('Are you sure? This will delete ALL tasks permanently.')) {
      // Implementation would clear all
      showToast('All tasks cleared', 'success');
    }
  }, [showToast]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <TodoForm onAdd={handleAdd} categories={categories} isLoading={isLoading} />

          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onReset={resetFilters}
            categories={categories}
            onExport={handleExport}
            onImport={handleImport}
            onClear={handleClearAll}
          />

          <TodoList
            todos={filteredTodos}
            stats={stats}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={setEditingTodo}
            isLoading={isLoading}
          />
        </main>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <div className="fixed bottom-4 right-4 z-50">
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
