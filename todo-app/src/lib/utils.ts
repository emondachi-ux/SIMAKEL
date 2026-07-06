import { Todo, TodoFilter } from '@/types';
import { isToday, isTomorrow, isThisWeek, isPast, isAfter } from 'date-fns';

export const filterTodos = (todos: Todo[], filters: TodoFilter): Todo[] => {
  return todos.filter((todo) => {
    // Search filter
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchesSearch =
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description?.toLowerCase().includes(searchLower) ||
        todo.tags?.some((tag) => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status === 'active' && todo.completed) return false;
    if (filters.status === 'completed' && !todo.completed) return false;

    // Priority filter
    if (filters.priority && todo.priority !== filters.priority) return false;

    // Category filter
    if (filters.category && todo.category !== filters.category) return false;

    // Due date filter
    if (filters.dueDateRange && filters.dueDateRange !== 'all' && todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      switch (filters.dueDateRange) {
        case 'today':
          if (!isToday(dueDate)) return false;
          break;
        case 'tomorrow':
          if (!isTomorrow(dueDate)) return false;
          break;
        case 'week':
          if (!isThisWeek(dueDate)) return false;
          break;
        case 'overdue':
          if (!isPast(dueDate) || isToday(dueDate)) return false;
          break;
      }
    }

    return true;
  });
};

export const sortTodos = (
  todos: Todo[],
  sortBy: 'date' | 'priority' | 'manual' = 'manual'
): Todo[] => {
  const sorted = [...todos];

  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dateA - dateB;
      });

    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

    default:
      return sorted;
  }
};

export const calculateStats = (todos: Todo[]) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const overdue = todos.filter((t) => !t.completed && t.dueDate && isPast(new Date(t.dueDate))).length;
  const dueToday = todos.filter((t) => !t.completed && t.dueDate && isToday(new Date(t.dueDate))).length;

  const byPriority = {
    high: todos.filter((t) => t.priority === 'high').length,
    medium: todos.filter((t) => t.priority === 'medium').length,
    low: todos.filter((t) => t.priority === 'low').length,
  };

  const byCategory: Record<string, number> = {};
  todos.forEach((todo) => {
    if (todo.category) {
      byCategory[todo.category] = (byCategory[todo.category] || 0) + 1;
    }
  });

  return {
    total,
    completed,
    active,
    completionPercentage,
    overdue,
    dueToday,
    byPriority,
    byCategory,
  };
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-danger text-white';
    case 'medium':
      return 'bg-warning text-white';
    case 'low':
      return 'bg-success text-white';
    default:
      return 'bg-slate-200 text-slate-900';
  }
};

export const getDueDateColor = (dueDate: Date, completed: boolean): string => {
  if (completed) return 'text-success';
  const now = new Date();
  if (isPast(dueDate) && !isToday(dueDate)) return 'text-danger';
  if (isToday(dueDate)) return 'text-warning';
  if (isTomorrow(dueDate)) return 'text-orange-500';
  return 'text-slate-500';
};

export const getDueDateLabel = (dueDate: Date): string => {
  if (isToday(dueDate)) return 'Today';
  if (isTomorrow(dueDate)) return 'Tomorrow';
  if (isThisWeek(dueDate)) return 'This Week';
  if (isPast(dueDate)) return 'Overdue';
  return dueDate.toLocaleDateString();
};
