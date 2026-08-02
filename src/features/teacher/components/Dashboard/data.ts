import {
  mockUsers,
  mockCourses,
  mockQuizzes,
  mockExams,
  mockEnrollmentTrend,
  mockNotifications,
} from '@/mock';
import { getAttendanceRecords } from '@/features/teacher/components/Attendance/attendance-store';
import { getGroups } from '@/features/teacher/components/Groups/group-store';
import { getLocalNotifications } from '@/features/notifications';

/**
 * This platform has a single teacher account; "admin" and "teacher" are the
 * same login. The dashboard renders against this fixed demo teacher until a
 * real backend/auth bridge exists (mirrors CURRENT_STUDENT_ID on the student side).
 */
export const CURRENT_TEACHER_ID = 1;

export const currentTeacher = mockUsers.find((u) => u.id === CURRENT_TEACHER_ID)!;

const teacherCourses = mockCourses.filter((c) => c.teacherId === CURRENT_TEACHER_ID);

export interface TeacherStats {
  totalStudents: number;
  totalCourses: number;
  totalTeachers: number;
  totalGroups: number;
  totalExamsAndQuizzes: number;
  totalRevenue: number;
}

export function getTeacherStats(): TeacherStats {
  const teacherGroups = getGroups().filter((g) => g.teacherId === CURRENT_TEACHER_ID);
  const uniqueStudentIds = new Set(teacherGroups.flatMap((g) => g.studentIds));

  return {
    totalStudents: uniqueStudentIds.size,
    totalCourses: teacherCourses.length,
    totalTeachers: mockUsers.filter((u) => u.role === 'teacher').length,
    totalGroups: teacherGroups.length,
    totalExamsAndQuizzes: mockQuizzes.length + mockExams.length,
    totalRevenue: teacherCourses.reduce((sum, c) => sum + c.price * c.studentsCount, 0),
  };
}

export interface AttendancePoint {
  date: string;
  presentRate: number;
}

/** Daily attendance rate (% present or late) over the last 14 days. */
export function getAttendanceTrend(): AttendancePoint[] {
  const byDate = new Map<string, { total: number; present: number }>();

  for (const record of getAttendanceRecords()) {
    const key = record.date.slice(0, 10);
    const bucket = byDate.get(key) ?? { total: 0, present: 0 };
    bucket.total += 1;
    if (record.status !== 'absent') bucket.present += 1;
    byDate.set(key, bucket);
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { total, present }]) => ({
      date,
      presentRate: total ? Math.round((present / total) * 100) : 0,
    }));
}

export interface EnrollmentPoint {
  month: string;
  count: number;
}

export function getEnrollmentTrend(): EnrollmentPoint[] {
  return mockEnrollmentTrend;
}

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

export interface ScheduleEntry {
  groupId: number;
  groupName: string;
  courseName?: string;
  startTime: string;
  endTime: string;
  studentsCount: number;
}

export function getTodaySchedule(): ScheduleEntry[] {
  const today = DAY_KEYS[new Date().getDay()];
  const teacherGroups = getGroups().filter((g) => g.teacherId === CURRENT_TEACHER_ID);

  return teacherGroups
    .flatMap((group) =>
      group.schedule
        .filter((slot) => slot.day === today)
        .map((slot) => ({
          groupId: group.id,
          groupName: group.name,
          courseName: mockCourses.find((c) => c.id === group.courseId)?.title,
          startTime: slot.startTime,
          endTime: slot.endTime,
          studentsCount: group.studentIds.length,
        }))
    )
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export const teacherNotifications = [...mockNotifications, ...getLocalNotifications()]
  .filter((n) => n.userId === CURRENT_TEACHER_ID)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
