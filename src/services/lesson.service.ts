import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';
import type {
  TeacherSection,
  TeacherSectionFormValues,
  TeacherLesson,
  TeacherLessonFormValues,
  LessonResourceItem,
} from '@/features/teacher/components/Lessons/types';

interface LessonResourceDto {
  id: number;
  course_section_id: number;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: number | null;
  order: number;
  is_preview: boolean;
}

interface CourseSectionResourceDto {
  id: number;
  course_id: number;
  title: string;
  description: string | null;
  order: number;
  is_published: boolean;
  lessons: LessonResourceDto[];
  created_at: string | null;
}

interface ResourceDto {
  id: number;
  lesson_id: number;
  title: string;
  file_path: string;
  file_type: string;
  file_size: number;
}

function mapLesson(dto: LessonResourceDto): TeacherLesson {
  return {
    id: dto.id,
    courseSectionId: dto.course_section_id,
    title: dto.title,
    description: dto.description,
    videoUrl: dto.video_url,
    duration: dto.duration,
    order: dto.order,
    isPreview: dto.is_preview,
  };
}

function mapSection(dto: CourseSectionResourceDto): TeacherSection {
  return {
    id: dto.id,
    courseId: dto.course_id,
    title: dto.title,
    description: dto.description,
    order: dto.order,
    isPublished: dto.is_published,
    lessons: (dto.lessons ?? []).map(mapLesson).sort((a, b) => a.order - b.order),
  };
}

function mapResource(dto: ResourceDto): LessonResourceItem {
  return {
    id: dto.id,
    lessonId: dto.lesson_id,
    title: dto.title,
    filePath: dto.file_path,
    fileType: dto.file_type,
    fileSize: dto.file_size,
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

/** Real API — course content (sections + nested lessons), addressed by course slug. */
export async function getCourseSections(courseSlug: string): Promise<TeacherSection[]> {
  try {
    const { data } = await api.get<{ data: { sections?: CourseSectionResourceDto[] } }>(
      `/teacher/courses/${courseSlug}`
    );
    return (data.data.sections ?? []).map(mapSection).sort((a, b) => a.order - b.order);
  } catch (error) {
    throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.loadFailed')));
  }
}

export const sectionService = {
  async create(courseSlug: string, values: TeacherSectionFormValues): Promise<void> {
    try {
      await api.post(`/teacher/courses/${courseSlug}/sections`, {
        title: values.title,
        description: values.description || null,
        is_published: values.isPublished,
      });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.sectionSaveFailed')));
    }
  },

  async update(sectionId: number, values: TeacherSectionFormValues): Promise<void> {
    try {
      await api.put(`/sections/${sectionId}`, {
        title: values.title,
        description: values.description || null,
        is_published: values.isPublished,
      });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.sectionSaveFailed')));
    }
  },

  async remove(sectionId: number): Promise<void> {
    try {
      await api.delete(`/sections/${sectionId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.sectionDeleteFailed')));
    }
  },

  async reorder(sections: { id: number; order: number }[]): Promise<void> {
    try {
      await api.put('/sections/reorder', { sections });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.reorderFailed')));
    }
  },
};

export const lessonService = {
  async create(courseSectionId: number, values: TeacherLessonFormValues): Promise<TeacherLesson> {
    try {
      const { data } = await api.post<{ data: LessonResourceDto }>('/lessons', {
        course_section_id: courseSectionId,
        title: values.title,
        description: values.description || null,
        duration: values.duration || null,
        is_preview: values.isPreview,
      });
      return mapLesson(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.saveFailed')));
    }
  },

  async update(lessonId: number, values: TeacherLessonFormValues): Promise<TeacherLesson> {
    try {
      const { data } = await api.put<{ data: LessonResourceDto }>(`/lessons/${lessonId}`, {
        title: values.title,
        description: values.description || null,
        duration: values.duration || null,
        is_preview: values.isPreview,
      });
      return mapLesson(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.saveFailed')));
    }
  },

  async remove(lessonId: number): Promise<void> {
    try {
      await api.delete(`/lessons/${lessonId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.deleteFailed')));
    }
  },

  async reorder(lessons: { id: number; order: number }[]): Promise<void> {
    try {
      await api.put('/lessons/reorder', { lessons });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.reorderFailed')));
    }
  },

  async uploadVideo(lessonId: number, video: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('video', video);
      const { data } = await api.post<{ message: string; video_url: string }>(
        `/lessons/${lessonId}/video`,
        formData
      );
      return data.video_url;
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.videoUploadFailed')));
    }
  },

  async listResources(lessonId: number): Promise<LessonResourceItem[]> {
    try {
      const { data } = await api.get<{ data: ResourceDto[] }>(`/lessons/${lessonId}/resources`);
      return data.data.map(mapResource);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.loadFailed')));
    }
  },

  async addResource(lessonId: number, title: string, file: File): Promise<LessonResourceItem> {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      const { data } = await api.post<{ message: string; resource: ResourceDto }>(
        `/lessons/${lessonId}/resources`,
        formData
      );
      return mapResource(data.resource);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.saveFailed')));
    }
  },

  async removeResource(resourceId: number): Promise<void> {
    try {
      await api.delete(`/resources/${resourceId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.lessons.toast.deleteFailed')));
    }
  },
};
