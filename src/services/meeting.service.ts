import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import { generateRoomName } from '@/features/meetings/lib/room';

interface MeetingCourseDto {
  id: number;
  title: string;
  slug: string;
}

interface MeetingTeacherDto {
  id: number;
  name: string;
}

interface MeetingDto {
  id: number;
  title: string;
  room_name: string;
  scheduled_at: string;
  course: MeetingCourseDto;
  teacher: MeetingTeacherDto | null;
  created_at: string | null;
}

export interface Meeting {
  id: number;
  title: string;
  roomName: string;
  scheduledAt: string;
  courseId: number;
  courseTitle: string;
  courseSlug: string;
  teacherName: string | null;
  createdAt: string | null;
}

export interface MeetingFormValues {
  title: string;
  scheduledAt: string;
}

function mapMeeting(dto: MeetingDto): Meeting {
  return {
    id: dto.id,
    title: dto.title,
    roomName: dto.room_name,
    scheduledAt: dto.scheduled_at,
    courseId: dto.course.id,
    courseTitle: dto.course.title,
    courseSlug: dto.course.slug,
    teacherName: dto.teacher?.name ?? null,
    createdAt: dto.created_at,
  };
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

/** Real API — meetings are scoped to a course (teacher creates, both
 *  roles list/join). The video room itself is Jitsi Meet's free public
 *  server; the backend only stores scheduling metadata + the room name
 *  so teacher and students land in the same room. */
export const meetingService = {
  async listByCourse(courseSlug: string): Promise<Meeting[]> {
    try {
      const { data } = await api.get<{ data: MeetingDto[] }>(`/courses/${courseSlug}/meetings`);
      return data.data.map(mapMeeting);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('meetings.toast.loadFailed')));
    }
  },

  async listForStudent(studentId: number): Promise<Meeting[]> {
    try {
      const { data } = await api.get<{ data: MeetingDto[] }>(`/students/${studentId}/meetings`);
      return data.data.map(mapMeeting);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('meetings.toast.loadFailed')));
    }
  },

  async create(courseSlug: string, values: MeetingFormValues): Promise<Meeting> {
    try {
      const { data } = await api.post<{ data: MeetingDto }>(`/courses/${courseSlug}/meetings`, {
        title: values.title,
        scheduled_at: values.scheduledAt,
        room_name: generateRoomName(courseSlug),
      });
      return mapMeeting(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('meetings.toast.saveFailed')));
    }
  },

  async remove(meetingId: number): Promise<void> {
    try {
      await api.delete(`/meetings/${meetingId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('meetings.toast.deleteFailed')));
    }
  },
};
