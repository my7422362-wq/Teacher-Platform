import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { BookOpen } from 'lucide-react';
import { useAdminCourses } from './queries';

export function CoursesTable() {
  const { t } = useTranslation();
  const { data: courses = [], isLoading, isError, refetch } = useAdminCourses();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('adminPages.courses.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  if (courses.length === 0) {
    return <EmptyState icon={<BookOpen className="h-12 w-12" />} description={t('adminPages.courses.empty')} />;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('adminPages.courses.table.title')}</TableHead>
              <TableHead>{t('adminPages.courses.table.teacher')}</TableHead>
              <TableHead>{t('adminPages.courses.table.category')}</TableHead>
              <TableHead>{t('adminPages.courses.table.price')}</TableHead>
              <TableHead>{t('adminPages.courses.table.students')}</TableHead>
              <TableHead>{t('adminPages.courses.table.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.teacherName}</TableCell>
                <TableCell>{course.categoryName}</TableCell>
                <TableCell>
                  {course.price} {course.currency}
                </TableCell>
                <TableCell>{course.studentsCount}</TableCell>
                <TableCell>
                  <Badge variant={course.isPublished ? 'success' : 'outline'}>
                    {course.isPublished
                      ? t('teacherPages.courses.statusPublished')
                      : t('teacherPages.courses.statusDraft')}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
