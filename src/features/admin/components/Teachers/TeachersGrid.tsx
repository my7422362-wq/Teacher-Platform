import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
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
  Modal,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { Plus, Trash2, UsersRound } from 'lucide-react';
import { useAdminTeachers, useDeleteTeacher } from './queries';
import { useAdminCourses } from '@/features/admin/components/Courses';
import { TeacherFormModal } from './TeacherFormModal';
import type { AdminTeacher } from '@/services';

export function TeachersGrid() {
  const { t, i18n } = useTranslation();
  const { data: teachers = [], isLoading, isError, refetch } = useAdminTeachers();
  const { data: courses = [] } = useAdminCourses();
  const deleteTeacher = useDeleteTeacher();
  const [formOpen, setFormOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState<AdminTeacher | null>(null);

  async function handleConfirmDelete() {
    if (!deletingTeacher) return;
    try {
      await deleteTeacher.mutateAsync(deletingTeacher.id);
      toast.success(t('adminPages.teachers.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('adminPages.teachers.toast.deleteFailed'));
    } finally {
      setDeletingTeacher(null);
    }
  }

  // Derived from the real courses list (course -> category) rather than a
  // dedicated "subjects" field on the teacher record, which doesn't exist.
  const subjectsByTeacher = new Map<number, string[]>();
  for (const course of courses) {
    if (!course.categoryName) continue;
    const existing = subjectsByTeacher.get(course.teacherId) ?? [];
    if (!existing.includes(course.categoryName)) {
      subjectsByTeacher.set(course.teacherId, [...existing, course.categoryName]);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorState description={t('adminPages.teachers.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setFormOpen(true)} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <Plus className="h-4 w-4" />
          {t('adminPages.teachers.addTeacher')}
        </Button>
      </div>

      {teachers.length === 0 ? (
        <EmptyState icon={<UsersRound className="h-12 w-12" />} description={t('adminPages.teachers.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('adminPages.teachers.table.name')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.email')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.subjects')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.courses')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.students')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.status')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.joined')}</TableHead>
                  <TableHead>{t('adminPages.teachers.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" src={teacher.avatar ?? undefined} fallback={teacher.name} />
                        {teacher.name}
                      </div>
                    </TableCell>
                    <TableCell dir="ltr">{teacher.email}</TableCell>
                    <TableCell>
                      {(() => {
                        const subjects = subjectsByTeacher.get(teacher.id) ?? [];
                        return subjects.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {subjects.map((subject) => (
                              <Badge key={subject} variant="outline">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[rgba(249,246,240,0.45)]">—</span>
                        );
                      })()}
                    </TableCell>
                    <TableCell>{teacher.coursesCount}</TableCell>
                    <TableCell>{teacher.studentsCount}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === 'active' ? 'success' : 'outline'}>{teacher.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString(i18n.language) : '—'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeletingTeacher(teacher)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <TeacherFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      <Modal
        isOpen={deletingTeacher !== null}
        onClose={() => setDeletingTeacher(null)}
        title={t('adminPages.teachers.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('adminPages.teachers.deleteConfirmMessage', { name: deletingTeacher?.name })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingTeacher(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            loading={deleteTeacher.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
