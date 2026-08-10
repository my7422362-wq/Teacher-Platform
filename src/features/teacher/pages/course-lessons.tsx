import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/shared/page-header';
import { ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui';
import { useTeacherCourses } from '@/features/teacher/components/Courses/queries';
import { LessonsList } from '@/features/teacher/components/Lessons';

export function TeacherCourseLessonsPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { data: courses = [], isLoading } = useTeacherCourses();
  const course = courses.find((c) => c.slug === slug);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/teacher/courses"
        className="inline-flex items-center gap-1.5 text-sm text-[#D4B59E] hover:underline"
      >
        <ArrowRight className="h-4 w-4" />
        {t('teacherPages.lessons.backToCourses')}
      </Link>

      <PageHeader title={course.title} description={t('teacherPages.lessons.manageLessons')} />

      <LessonsList courseSlug={course.slug} />
    </div>
  );
}
