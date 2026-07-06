export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly' | null;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFilter {
  searchText: string;
  priority?: string;
  category?: string;
  status?: 'all' | 'active' | 'completed';
  dueDateRange?: 'all' | 'today' | 'tomorrow' | 'week' | 'overdue';
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionPercentage: number;
  overdue: number;
  dueToday: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<string, number>;
}
