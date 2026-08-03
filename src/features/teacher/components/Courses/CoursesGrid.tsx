import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState } from '@/components/ui';
import { Pencil, Trash2, Plus, Users, BookOpen, ListVideo } from 'lucide-react';
import { getCourses, deleteCourse } from './course-store';
import { CourseFormModal } from './CourseFormModal';
import type { Course } from '@/types';

export function CoursesGrid() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>(getCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);

  function refresh() {
    setCourses(getCourses());
  }

  function handleAdd() {
    setEditingCourse(null);
    setFormOpen(true);
  }

  function handleEdit(course: Course) {
    setEditingCourse(course);
    setFormOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingCourse) return;
    deleteCourse(deletingCourse.id);
    toast.success(t('teacherPages.courses.toast.deleted'));
    setDeletingCourse(null);
    refresh();
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <Plus className="h-4 w-4" />
          {t('teacherPages.courses.addCourse')}
        </Button>
      </div>

      {courses.length === 0 ? (
        <EmptyState description={t('teacherPages.courses.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#F9F6F0]">{course.title}</h3>
                  <Badge variant={course.isPublished ? 'success' : 'outline'} className="shrink-0">
                    {course.isPublished
                      ? t('teacherPages.courses.statusPublished')
                      : t('teacherPages.courses.statusDraft')}
                  </Badge>
                </div>

                <p className="line-clamp-2 text-sm text-[rgba(249,246,240,0.65)]">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-[rgba(249,246,240,0.55)]">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.studentsCount} {t('teacherPages.courses.students')}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.lessonsCount} {t('teacherPages.courses.lessons')}
                  </span>
                </div>

                <p className="text-lg font-bold text-[#D4B59E]">
                  {course.price} {course.currency}
                </p>

                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(course)}>
                    <Pencil className="h-3.5 w-3.5" />
                    {t('teacherPages.courses.editCourse')}
                  </Button>
                  <Link to={`/teacher/courses/${course.id}/lessons`}>
                    <Button variant="outline" size="sm">
                      <ListVideo className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDeletingCourse(course)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CourseFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        course={editingCourse}
        onSaved={refresh}
      />

      <Modal
        isOpen={deletingCourse !== null}
        onClose={() => setDeletingCourse(null)}
        title={t('teacherPages.courses.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.courses.deleteConfirmMessage', { title: deletingCourse?.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingCourse(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
