import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, Badge } from '@/components/ui';
import { ListVideo } from 'lucide-react';
import { getCourses } from '@/features/teacher/components/Courses/course-store';
import { getLessonsForCourse } from '@/features/teacher/components/Lessons/lesson-store';

export function TeacherLessonsOverviewPage() {
  const { t } = useTranslation();
  const courses = getCourses();

  return (
    <div className="space-y-6">
      <PageHeader title={t('teacherPages.lessons.title')} description={t('teacherPages.lessons.description')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const lessonsCount = getLessonsForCourse(course.id).length;
          return (
            <Link key={course.id} to={`/teacher/courses/${course.id}/lessons`}>
              <Card>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4B59E]/15 text-[#D4B59E]">
                    <ListVideo className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#F9F6F0]">{course.title}</p>
                    <Badge variant="outline" className="mt-1">
                      {t('teacherPages.lessons.lessonsCount', { count: lessonsCount })}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
