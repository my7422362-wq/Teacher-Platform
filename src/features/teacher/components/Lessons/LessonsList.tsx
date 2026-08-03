import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState } from '@/components/ui';
import { ChevronUp, ChevronDown, Pencil, Trash2, Eye, Plus, PlayCircle, ListVideo } from 'lucide-react';
import { getLessonsForCourse, deleteLesson, moveLesson } from './lesson-store';
import { LessonFormModal } from './LessonFormModal';
import { LessonPreviewModal } from './LessonPreviewModal';
import type { Lesson } from '@/types';

export function LessonsList({ courseId }: { courseId: number }) {
  const { t } = useTranslation();
  const [lessons, setLessons] = useState<Lesson[]>(() => getLessonsForCourse(courseId));
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);
  const [deletingLesson, setDeletingLesson] = useState<Lesson | null>(null);

  function refresh() {
    setLessons(getLessonsForCourse(courseId));
  }

  function handleAdd() {
    setEditingLesson(null);
    setFormOpen(true);
  }

  function handleEdit(lesson: Lesson) {
    setEditingLesson(lesson);
    setFormOpen(true);
  }

  function handleMove(id: number, direction: 'up' | 'down') {
    moveLesson(id, direction);
    refresh();
  }

  function handleConfirmDelete() {
    if (!deletingLesson) return;
    deleteLesson(deletingLesson.id);
    toast.success(t('teacherPages.lessons.toast.deleted'));
    setDeletingLesson(null);
    refresh();
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <Plus className="h-4 w-4" />
          {t('teacherPages.lessons.addLesson')}
        </Button>
      </div>

      {lessons.length === 0 ? (
        <EmptyState icon={<ListVideo className="h-12 w-12" />} description={t('teacherPages.lessons.empty')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex items-center gap-4 p-4">
                <div className="flex shrink-0 flex-col">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(lesson.id, 'up')}
                    className="text-[rgba(249,246,240,0.45)] hover:text-[#D4B59E] disabled:opacity-25"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === lessons.length - 1}
                    onClick={() => handleMove(lesson.id, 'down')}
                    className="text-[rgba(249,246,240,0.45)] hover:text-[#D4B59E] disabled:opacity-25"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                  <PlayCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-[#F9F6F0]">{lesson.title}</p>
                    <Badge variant="outline" className="shrink-0">
                      {t(`teacherPages.lessons.types.${lesson.type}`)}
                    </Badge>
                    {!lesson.isPublished && (
                      <Badge variant="outline" className="shrink-0">
                        {t('teacherPages.courses.statusDraft')}
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">{lesson.duration}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setPreviewLesson(lesson)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(lesson)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDeletingLesson(lesson)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <LessonFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        courseId={courseId}
        lesson={editingLesson}
        onSaved={refresh}
      />

      <LessonPreviewModal
        isOpen={previewLesson !== null}
        onClose={() => setPreviewLesson(null)}
        lesson={previewLesson}
      />

      <Modal
        isOpen={deletingLesson !== null}
        onClose={() => setDeletingLesson(null)}
        title={t('teacherPages.lessons.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.lessons.deleteConfirmMessage', { title: deletingLesson?.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingLesson(null)}>
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
