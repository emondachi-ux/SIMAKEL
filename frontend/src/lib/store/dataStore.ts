import { create } from 'zustand';

interface DataState {
  classes: any[];
  students: any[];
  setClasses: (classes: any[]) => void;
  setStudents: (students: any[]) => void;
  addClass: (cls: any) => void;
  updateClass: (id: string, cls: any) => void;
  deleteClass: (id: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  classes: [],
  students: [],

  setClasses: (classes: any[]) => set({ classes }),
  setStudents: (students: any[]) => set({ students }),

  addClass: (cls: any) =>
    set((state) => ({
      classes: [...state.classes, cls],
    })),

  updateClass: (id: string, cls: any) =>
    set((state) => ({
      classes: state.classes.map((c) => (c.id === id ? cls : c)),
    })),

  deleteClass: (id: string) =>
    set((state) => ({
      classes: state.classes.filter((c) => c.id !== id),
    })),
}));
