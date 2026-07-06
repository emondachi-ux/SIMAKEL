import Dexie, { Table } from 'dexie';
import { Todo } from '@/types';

export interface TodoDB extends Dexie {
  todos: Table<Todo>;
}

export const db = new Dexie('TodoAppDB') as TodoDB;

db.version(1).stores({
  todos: '++id, completed, priority, category, createdAt',
});

// Helper functions
export const addTodo = async (todo: Todo): Promise<string> => {
  return await db.todos.add(todo);
};

export const getTodos = async (): Promise<Todo[]> => {
  return await db.todos.toArray();
};

export const getTodo = async (id: string): Promise<Todo | undefined> => {
  return await db.todos.get(id);
};

export const updateTodo = async (id: string, todo: Partial<Todo>): Promise<void> => {
  await db.todos.update(id, {
    ...todo,
    updatedAt: new Date(),
  });
};

export const deleteTodo = async (id: string): Promise<void> => {
  await db.todos.delete(id);
};

export const deleteAllTodos = async (): Promise<void> => {
  await db.todos.clear();
};

export const getTodosByFilter = async (filter: string): Promise<Todo[]> => {
  return await db.todos
    .filter((todo) => todo.title.toLowerCase().includes(filter.toLowerCase()))
    .toArray();
};
