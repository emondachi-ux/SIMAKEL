import { useCallback, useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/lib/db';
import { Todo } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from database
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();
        setTodos(loadedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Add todo
  const add = useCallback(
    async (title: string, priority = 'medium', category?: string) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        completed: false,
        priority: priority as 'low' | 'medium' | 'high',
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        await addTodo(newTodo);
        setTodos((prev) => [...prev, newTodo]);
        return newTodo;
      } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
      }
    },
    []
  );

  // Update todo
  const update = useCallback(async (id: string, updates: Partial<Todo>) => {
    try {
      await updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }, []);

  // Toggle completion
  const toggle = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        return update(id, { completed: !todo.completed });
      }
    },
    [todos, update]
  );

  // Delete todo
  const remove = useCallback(async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }, []);

  return {
    todos,
    isLoading,
    add,
    update,
    toggle,
    remove,
  };
};
