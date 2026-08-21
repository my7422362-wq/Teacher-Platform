import { useMemo } from 'react';
import { usePublicCourses } from '@/features/home/components/Courses/queries';

export interface PlatformStats {
  totalStudents: number;
  totalCourses: number;
  totalTeachers: number;
  totalLessons: number;
}

/** Real, derived platform-wide numbers for public marketing sections (Hero
 *  marquee, Results). No success-rate/years-of-experience style stat is
 *  included since the backend exposes nothing to back that up. */
export function usePlatformStats(): PlatformStats {
  const { data: courses = [] } = usePublicCourses();

  return useMemo(() => {
    const teacherIds = new Set(courses.map((c) => c.teacherId));
    return {
      totalStudents: courses.reduce((sum, c) => sum + c.studentsCount, 0),
      totalCourses: courses.length,
      totalTeachers: teacherIds.size,
      totalLessons: courses.reduce((sum, c) => sum + c.lessonsCount, 0),
    };
  }, [courses]);
}
