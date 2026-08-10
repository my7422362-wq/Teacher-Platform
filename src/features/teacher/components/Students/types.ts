export interface TeacherStudent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  gradeLevel: string | null;
  governorate: string | null;
}

export interface StudentCourseProgress {
  courseId: number;
  courseTitle: string;
  status: string;
  progressPercent: number;
  slug: string;
  teacherName: string;
  thumbnail: string | null;
  lessonsCount: number;
  price: number;
  currency: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'late';

export interface StudentAttendanceRecord {
  date: string;
  status: AttendanceStatus;
  groupId: number;
}

export interface StudentNoteItem {
  id: number;
  studentId: number;
  teacherId: number;
  note: string;
  createdAt: string | null;
}
