/** Real backend shapes — a course's content is Sections containing Lessons. */

export interface TeacherLesson {
  id: number;
  courseSectionId: number;
  title: string;
  description: string | null;
  videoUrl: string | null;
  duration: number | null;
  order: number;
  isPreview: boolean;
}

export interface TeacherLessonFormValues {
  title: string;
  description: string;
  duration: number;
  isPreview: boolean;
}

export interface TeacherSection {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  order: number;
  isPublished: boolean;
  lessons: TeacherLesson[];
}

export interface TeacherSectionFormValues {
  title: string;
  description: string;
  isPublished: boolean;
}

export interface LessonResourceItem {
  id: number;
  lessonId: number;
  title: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}
