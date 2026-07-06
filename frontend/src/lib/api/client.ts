import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

let apiClient: AxiosInstance | null = null;

export const initApiClient = (): AxiosInstance => {
  apiClient = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - add auth token
  apiClient.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor - handle errors
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const getApiClient = (): AxiosInstance => {
  if (!apiClient) {
    initApiClient();
  }
  return apiClient!;
};

// API endpoints
export const api = {
  // Auth
  login: (email: string, password: string) =>
    getApiClient().post('/v1/auth/login', { email, password }),
  logout: () => getApiClient().post('/v1/auth/logout'),
  refresh: (refreshToken: string) =>
    getApiClient().post('/v1/auth/refresh', { refresh_token: refreshToken }),

  // Classes
  getClasses: (page = 1, limit = 10) =>
    getApiClient().get(`/v1/classes?page=${page}&limit=${limit}`),
  getClass: (id: string) => getApiClient().get(`/v1/classes/${id}`),
  createClass: (data: any) => getApiClient().post('/v1/classes', data),
  updateClass: (id: string, data: any) =>
    getApiClient().put(`/v1/classes/${id}`, data),
  deleteClass: (id: string) => getApiClient().delete(`/v1/classes/${id}`),

  // Students
  getStudents: (page = 1, limit = 20) =>
    getApiClient().get(`/v1/students?page=${page}&limit=${limit}`),
  getStudent: (id: string) => getApiClient().get(`/v1/students/${id}`),
  createStudent: (data: any) => getApiClient().post('/v1/students', data),
  updateStudent: (id: string, data: any) =>
    getApiClient().put(`/v1/students/${id}`, data),
  deleteStudent: (id: string) => getApiClient().delete(`/v1/students/${id}`),

  // Attendance
  getAttendance: (classId: string, date?: string) =>
    getApiClient().get(`/v1/attendance?class_id=${classId}${date ? `&date=${date}` : ''}`),
  markAttendance: (data: any) => getApiClient().post('/v1/attendance', data),
  bulkMarkAttendance: (data: any) =>
    getApiClient().post('/v1/attendance/bulk', data),

  // Grades
  getGrades: (classId: string, studentId?: string) =>
    getApiClient().get(`/v1/grades?class_id=${classId}${studentId ? `&student_id=${studentId}` : ''}`),
  inputGrade: (data: any) => getApiClient().post('/v1/grades', data),
  bulkInputGrades: (data: any) =>
    getApiClient().post('/v1/grades/bulk', data),

  // Sync
  pullChanges: (data: any) => getApiClient().post('/v1/sync/pull', data),
  pushChanges: (data: any) => getApiClient().post('/v1/sync/push', data),

  // Dashboard
  getDashboard: () => getApiClient().get('/v1/dashboard'),
};
