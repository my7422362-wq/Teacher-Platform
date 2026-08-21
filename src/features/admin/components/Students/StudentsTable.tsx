import { useState } from 'react';
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
  Avatar,
  Button,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { Users, BookOpen } from 'lucide-react';
import { useAdminStudents } from './queries';
import { StudentCoursesModal } from './StudentCoursesModal';
import type { AdminStudent } from '@/services';

export function StudentsTable() {
  const { t, i18n } = useTranslation();
  const { data: students = [], isLoading, isError, refetch } = useAdminStudents();
  const [viewingStudent, setViewingStudent] = useState<AdminStudent | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('adminPages.students.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  if (students.length === 0) {
    return <EmptyState icon={<Users className="h-12 w-12" />} description={t('adminPages.students.empty')} />;
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('adminPages.students.table.name')}</TableHead>
                <TableHead>{t('adminPages.students.table.email')}</TableHead>
                <TableHead>{t('adminPages.students.table.phone')}</TableHead>
                <TableHead>{t('adminPages.students.table.status')}</TableHead>
                <TableHead>{t('adminPages.students.table.joined')}</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" src={student.avatar ?? undefined} fallback={student.name} />
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell dir="ltr">{student.email}</TableCell>
                  <TableCell dir="ltr">{student.phone ?? '—'}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'success' : 'outline'}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {student.createdAt ? new Date(student.createdAt).toLocaleDateString(i18n.language) : '—'}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setViewingStudent(student)}>
                      <BookOpen className="h-3.5 w-3.5" />
                      {t('adminPages.students.table.viewCourses')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <StudentCoursesModal student={viewingStudent} onClose={() => setViewingStudent(null)} />
    </>
  );
}
