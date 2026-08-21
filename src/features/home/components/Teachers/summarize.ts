import type { PublicCourse } from '@/services';

export interface TeacherSummary {
  teacherId: number;
  teacherName: string;
  subjects: string[];
  coursesCount: number;
  studentsCount: number;
}

/** Real per-teacher facts derived from the public course catalog — no bio,
 *  photo, or achievements are shown since the backend has no such fields. */
export function summarizeTeachers(courses: PublicCourse[]): TeacherSummary[] {
  const map = new Map<number, TeacherSummary>();
  for (const course of courses) {
    const existing = map.get(course.teacherId);
    if (existing) {
      existing.coursesCount += 1;
      existing.studentsCount += course.studentsCount;
      if (!existing.subjects.includes(course.categoryName)) existing.subjects.push(course.categoryName);
    } else {
      map.set(course.teacherId, {
        teacherId: course.teacherId,
        teacherName: course.teacherName,
        subjects: [course.categoryName],
        coursesCount: 1,
        studentsCount: course.studentsCount,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.studentsCount - a.studentsCount);
}
