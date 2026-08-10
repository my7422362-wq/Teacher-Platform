import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type {
  TeacherStudent,
  StudentCourseProgress,
  StudentAttendanceRecord,
  StudentNoteItem,
} from '@/features/teacher/components/Students/types';

interface UserResourceDto {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  photo_url: string | null;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  governorate: string | null;
  grade_level: string | null;
}

interface CourseResourceDto {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  price: string;
  currency: string;
  lessons_count: string;
  teacher: { id: number; name: string };
}

interface ProgressDto {
  course_id: number;
  status: string;
  progress_percent: number;
}

interface AttendanceResourceDto {
  id: number;
  group_id: number;
  date: string;
  status: string;
}

interface StudentNoteDto {
  id: number;
  student_id: number;
  teacher_id: number;
  note: string;
  created_at: string | null;
}

function mapStudent(dto: UserResourceDto): TeacherStudent {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    avatar: dto.photo_url,
    status: dto.status,
    gradeLevel: dto.grade_level,
    governorate: dto.governorate,
  };
}

function mapNote(dto: StudentNoteDto): StudentNoteItem {
  return { id: dto.id, studentId: dto.student_id, teacherId: dto.teacher_id, note: dto.note, createdAt: dto.created_at };
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const firstValidationError = data?.errors && Object.values(data.errors)[0]?.[0];
    if (firstValidationError) return firstValidationError;
    if (data?.message) return data.message;
  }
  return fallback;
}

export const studentService = {
  async list(): Promise<TeacherStudent[]> {
    try {
      const { data } = await api.get<{ data: UserResourceDto[] }>('/students');
      return data.data.map(mapStudent);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.students.toast.loadFailed')));
    }
  },

  async getById(studentId: number): Promise<TeacherStudent> {
    try {
      const { data } = await api.get<{ data: UserResourceDto }>(`/students/${studentId}`);
      return mapStudent(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.students.toast.loadFailed')));
    }
  },

  /** Enrolled courses + per-course progress (one request per course — the
   *  API has no combined endpoint, but a student's course count is small). */
  async getCoursesWithProgress(studentId: number): Promise<StudentCourseProgress[]> {
    try {
      const { data } = await api.get<{ data: CourseResourceDto[] }>(`/students/${studentId}/courses`);
      const courses = data.data;
      const progresses = await Promise.all(
        courses.map((course) =>
          api
            .get<{ data: ProgressDto }>(`/students/${studentId}/courses/${course.id}/progress`)
            .then((res) => res.data.data)
            .catch(() => null)
        )
      );
      return courses.map((course, i) => {
        const progress = progresses[i];
        return {
          courseId: course.id,
          courseTitle: course.title,
          status: progress?.status ?? 'unknown',
          progressPercent: progress?.progress_percent ?? 0,
          slug: course.slug,
          teacherName: course.teacher?.name ?? '',
          thumbnail: course.thumbnail,
          lessonsCount: Number(course.lessons_count),
          price: Number(course.price),
          currency: course.currency,
        };
      });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.students.toast.loadFailed')));
    }
  },

  async enroll(studentId: number, courseId: number): Promise<void> {
    try {
      await api.post(`/students/${studentId}/enroll`, { course_id: courseId });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('studentPages.courses.toast.enrollFailed')));
    }
  },

  async getAttendance(studentId: number): Promise<StudentAttendanceRecord[]> {
    try {
      const { data } = await api.get<{ data: AttendanceResourceDto[] }>(`/students/${studentId}/attendance`);
      return data.data.map((r) => ({
        date: r.date,
        status: r.status as StudentAttendanceRecord['status'],
        groupId: r.group_id,
      }));
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.students.toast.loadFailed')));
    }
  },

  async listNotes(studentId: number): Promise<StudentNoteItem[]> {
    try {
      const { data } = await api.get<{ data: StudentNoteDto[] }>(`/students/${studentId}/notes`);
      return data.data.map(mapNote);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.students.toast.loadFailed')));
    }
  },

  async addNote(studentId: number, note: string): Promise<StudentNoteItem> {
    try {
      const { data } = await api.post<{ message: string; note: StudentNoteDto }>(`/students/${studentId}/notes`, {
        note,
      });
      return mapNote(data.note);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.studentDetail.toast.noteSaveFailed')));
    }
  },

  async removeNote(noteId: number): Promise<void> {
    try {
      await api.delete(`/student-notes/${noteId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.studentDetail.toast.noteDeleteFailed')));
    }
  },
};
