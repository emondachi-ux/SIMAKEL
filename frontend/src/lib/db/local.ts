// Local database service using IndexedDB
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { v4 as uuidv4 } from 'uuid';

interface SIMAKELSchema extends DBSchema {
  users: {
    key: string;
    value: any;
  };
  classes: {
    key: string;
    value: any;
    indexes: { 'by-status': string };
  };
  students: {
    key: string;
    value: any;
    indexes: { 'by-class': string };
  };
  attendance: {
    key: string;
    value: any;
    indexes: { 'by-date': string };
  };
  grades: {
    key: string;
    value: any;
    indexes: { 'by-student': string };
  };
  sync_queue: {
    key: string;
    value: any;
  };
}

let db: IDBPDatabase<SIMAKELSchema> | null = null;

export const initDB = async (): Promise<void> => {
  db = await openDB<SIMAKELSchema>('simakel_db', 1, {
    upgrade(db) {
      // Create object stores
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('classes')) {
        const classStore = db.createObjectStore('classes', { keyPath: 'id' });
        classStore.createIndex('by-status', 'status');
      }
      if (!db.objectStoreNames.contains('students')) {
        const studentStore = db.createObjectStore('students', { keyPath: 'id' });
        studentStore.createIndex('by-class', 'class_id');
      }
      if (!db.objectStoreNames.contains('attendance')) {
        const attendanceStore = db.createObjectStore('attendance', { keyPath: 'id' });
        attendanceStore.createIndex('by-date', 'date');
      }
      if (!db.objectStoreNames.contains('grades')) {
        const gradeStore = db.createObjectStore('grades', { keyPath: 'id' });
        gradeStore.createIndex('by-student', 'student_id');
      }
      if (!db.objectStoreNames.contains('sync_queue')) {
        db.createObjectStore('sync_queue', { keyPath: 'id' });
      }
    },
  });
};

export const getDB = (): IDBPDatabase<SIMAKELSchema> => {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  return db;
};

// Generic CRUD operations
export const saveData = async <K extends keyof SIMAKELSchema>(
  store: K,
  data: SIMAKELSchema[K]['value']
): Promise<string> => {
  const database = getDB();
  const id = data.id || uuidv4();
  const now = new Date().toISOString();
  
  const record = {
    ...data,
    id,
    sync_status: 'pending',
    updated_at: now,
  };

  await database.put(store, record);
  return id;
};

export const getData = async <K extends keyof SIMAKELSchema>(
  store: K,
  id: string
): Promise<SIMAKELSchema[K]['value'] | undefined> => {
  const database = getDB();
  return await database.get(store, id);
};

export const getAllData = async <K extends keyof SIMAKELSchema>(
  store: K
): Promise<SIMAKELSchema[K]['value'][]> => {
  const database = getDB();
  return await database.getAll(store);
};

export const deleteData = async <K extends keyof SIMAKELSchema>(
  store: K,
  id: string
): Promise<void> => {
  const database = getDB();
  await database.delete(store, id);
};

export const clearStore = async <K extends keyof SIMAKELSchema>(
  store: K
): Promise<void> => {
  const database = getDB();
  await database.clear(store);
};
