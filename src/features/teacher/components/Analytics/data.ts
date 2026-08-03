import { getCourses } from '@/features/teacher/components/Courses/course-store';

export interface TopCourseItem {
  id: number;
  title: string;
  studentsCount: number;
  rating: number;
  revenue: number;
  currency: string;
}

export function getTopCourses(limit = 5): TopCourseItem[] {
  return getCourses()
    .filter((c) => c.isPublished)
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, limit)
    .map((c) => ({
      id: c.id,
      title: c.title,
      studentsCount: c.studentsCount,
      rating: c.rating,
      revenue: c.price * c.studentsCount,
      currency: c.currency,
    }));
}
