import { useMemo } from 'react';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import type { TopCourseItem } from './types';

/** Real course list, ranked by real enrollment (no mock/analytics endpoint involved).
 *  No rating field exists on the real CourseResource, so it's not shown. */
export function useTopCourses(limit = 5) {
  const { data: courses = [], isLoading, isError, refetch } = useTeacherCourses();

  const topCourses: TopCourseItem[] = useMemo(
    () =>
      courses
        .filter((c) => c.isPublished)
        .sort((a, b) => b.studentsCount - a.studentsCount)
        .slice(0, limit)
        .map((c) => ({
          id: c.id,
          title: c.title,
          studentsCount: c.studentsCount,
          revenue: c.price * c.studentsCount,
          currency: c.currency,
        })),
    [courses, limit]
  );

  return { data: topCourses, isLoading, isError, refetch };
}
