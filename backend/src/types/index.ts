export interface User {
  id: string;
  nip: string;
  email: string;
  name: string;
  gender?: 'M' | 'F';
  date_of_birth?: Date;
  phone?: string;
  address?: string;
  photo_url?: string;
  status: 'active' | 'inactive' | 'suspended';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
  sync_status: 'pending' | 'synced' | 'conflict';
}

export interface Class {
  id: string;
  code: string;
  name: string;
  description?: string;
  grade: number;
  section: string;
  academic_year: string;
  semester: '1' | '2';
  teacher_id: string;
  status: 'active' | 'archived';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
  sync_status: 'pending' | 'synced' | 'conflict';
}

export interface Student {
  id: string;
  nis: string;
  nisn?: string;
  name: string;
  gender: 'M' | 'F';
  date_of_birth?: Date;
  place_of_birth?: string;
  address?: string;
  phone?: string;
  parent_name?: string;
  parent_phone?: string;
  photo_url?: string;
  status: 'active' | 'graduated' | 'transferred' | 'dropped';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
  sync_status: 'pending' | 'synced' | 'conflict';
}

export interface Attendance {
  id: string;
  class_id: string;
  student_id: string;
  date: Date;
  time_in?: string;
  time_out?: string;
  status: 'present' | 'absent' | 'sick' | 'permit' | 'late';
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
  sync_status: 'pending' | 'synced' | 'conflict';
}

export interface Grade {
  id: string;
  class_id: string;
  student_id: string;
  grade_type: 'knowledge' | 'skill' | 'project' | 'midterm' | 'final' | 'remedial';
  score?: number;
  max_score: number;
  weight: number;
  description?: string;
  notes?: string;
  date?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  version: number;
  sync_status: 'pending' | 'synced' | 'conflict';
}

export interface JWTPayload {
  id: string;
  nip: string;
  email: string;
  name: string;
}

export interface SyncRequest {
  timestamp: Date;
  collections: Array<{
    name: string;
    lastSync: Date;
    version: number;
  }>;
}

export interface SyncResponse {
  success: boolean;
  timestamp: Date;
  changes: Record<string, any>;
  conflicts: Array<any>;
}
