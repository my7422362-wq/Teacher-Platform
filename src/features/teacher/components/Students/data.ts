import {
  mockStudents,
  mockCourses,
  mockProgress,
  mockSubmissions,
  mockAssignments,
  mockQuizSubmissions,
  mockQuizzes,
  mockExamAttempts,
  mockExams,
  mockStudentNotes,
} from '@/mock';
import { getLocalStudentNotes } from './notes-store';
import { getLocalQuizSubmissions, getLocalExamAttempts } from '@/features/student/components/Dashboard/submissions-store';
import { getAttendanceRecords } from '@/features/teacher/components/Attendance/attendance-store';
import { getGroups } from '@/features/teacher/components/Groups/group-store';
import type { Course, Progress, StudentNote } from '@/types';

export const CURRENT_TEACHER_ID = 1;

export interface StudentListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: number;
  completedCourses: number;
  groupNames: string[];
}

export function getTeacherStudents(): StudentListItem[] {
  const groups = getGroups();
  return mockStudents.map((student) => ({
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    avatar: student.avatar,
    status: student.status,
    enrolledCourses: student.enrolledCourses,
    completedCourses: student.completedCourses,
    groupNames: groups.filter((g) => g.studentIds.includes(student.id)).map((g) => g.name),
  }));
}

export interface StudentCourseEntry {
  course: Course;
  progress: Progress;
}

export interface AttendanceSummary {
  rate: number;
  totalSessions: number;
  recent: { date: string; status: 'present' | 'absent' | 'late'; groupName?: string }[];
}

export interface StudentGradeItem {
  id: string;
  kind: 'assignment' | 'quiz' | 'exam';
  title: string;
  courseName?: string;
  score: number;
  maxScore: number;
  passingScore: number;
  gradedAt: string;
}

export interface StudentDetail {
  student: StudentListItem;
  courses: StudentCourseEntry[];
  attendance: AttendanceSummary;
  grades: StudentGradeItem[];
  notes: StudentNote[];
}

export function getStudentDetail(studentId: number): StudentDetail | undefined {
  const student = getTeacherStudents().find((s) => s.id === studentId);
  if (!student) return undefined;

  const courses: StudentCourseEntry[] = mockProgress
    .filter((p) => p.userId === studentId)
    .map((progress) => ({
      course: mockCourses.find((c) => c.id === progress.courseId)!,
      progress,
    }));

  const groups = getGroups();
  const records = getAttendanceRecords()
    .filter((r) => r.studentId === studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const presentCount = records.filter((r) => r.status !== 'absent').length;

  const attendance: AttendanceSummary = {
    rate: records.length ? Math.round((presentCount / records.length) * 100) : 0,
    totalSessions: records.length,
    recent: records.slice(0, 8).map((r) => ({
      date: r.date,
      status: r.status,
      groupName: groups.find((g) => g.id === r.groupId)?.name,
    })),
  };

  const assignmentGrades: StudentGradeItem[] = mockSubmissions
    .filter((s) => s.userId === studentId && s.status === 'graded' && s.score !== undefined)
    .map((s) => {
      const assignment = mockAssignments.find((a) => a.id === s.assignmentId);
      return {
        id: `assignment-${s.id}`,
        kind: 'assignment' as const,
        title: s.assignmentTitle ?? assignment?.title ?? '',
        courseName: assignment ? mockCourses.find((c) => c.id === assignment.courseId)?.title : undefined,
        score: s.score!,
        maxScore: assignment?.maxScore ?? 100,
        passingScore: assignment?.passingScore ?? 0,
        gradedAt: s.gradedAt ?? s.submittedAt,
      };
    });

  const quizGrades: StudentGradeItem[] = [...mockQuizSubmissions, ...getLocalQuizSubmissions()]
    .filter((s) => s.userId === studentId)
    .map((s) => {
      const quiz = mockQuizzes.find((q) => q.id === s.quizId);
      return {
        id: `quiz-${s.id}`,
        kind: 'quiz' as const,
        title: quiz?.title ?? '',
        courseName: quiz ? mockCourses.find((c) => c.id === quiz.courseId)?.title : undefined,
        score: s.score,
        maxScore: s.totalScore,
        passingScore: quiz ? Math.round((quiz.passingScore / 100) * s.totalScore) : 0,
        gradedAt: s.submittedAt,
      };
    });

  const examGrades: StudentGradeItem[] = [...mockExamAttempts, ...getLocalExamAttempts()]
    .filter((a) => a.userId === studentId)
    .map((a) => {
      const exam = mockExams.find((e) => e.id === a.examId);
      return {
        id: `exam-${a.id}`,
        kind: 'exam' as const,
        title: exam?.title ?? '',
        courseName: exam ? mockCourses.find((c) => c.id === exam.courseId)?.title : undefined,
        score: a.score,
        maxScore: a.totalScore,
        passingScore: exam?.passingScore ?? 0,
        gradedAt: a.submittedAt,
      };
    });

  const grades = [...assignmentGrades, ...quizGrades, ...examGrades].sort(
    (a, b) => new Date(b.gradedAt).getTime() - new Date(a.gradedAt).getTime()
  );

  const notes = [...mockStudentNotes, ...getLocalStudentNotes()]
    .filter((n) => n.studentId === studentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { student, courses, attendance, grades, notes };
}
