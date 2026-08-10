import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { ChevronUp, ChevronDown, Pencil, Trash2, Eye, Plus, PlayCircle, ListVideo, FolderPlus } from 'lucide-react';
import { useCourseSections, useDeleteLesson, useMoveLesson, useDeleteSection } from './queries';
import { LessonFormModal } from './LessonFormModal';
import { SectionFormModal } from './SectionFormModal';
import { LessonPreviewModal } from './LessonPreviewModal';
import type { TeacherSection, TeacherLesson } from './types';

export function LessonsList({ courseSlug }: { courseSlug: string }) {
  const { t } = useTranslation();
  const { data: sections = [], isLoading, isError, refetch } = useCourseSections(courseSlug);
  const deleteLesson = useDeleteLesson(courseSlug);
  const deleteSection = useDeleteSection(courseSlug);
  const moveLesson = useMoveLesson(courseSlug);

  const [sectionFormOpen, setSectionFormOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<TeacherSection | null>(null);
  const [deletingSection, setDeletingSection] = useState<TeacherSection | null>(null);

  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [editingLesson, setEditingLesson] = useState<TeacherLesson | null>(null);
  const [previewLesson, setPreviewLesson] = useState<TeacherLesson | null>(null);
  const [deletingLesson, setDeletingLesson] = useState<TeacherLesson | null>(null);

  function handleAddSection() {
    setEditingSection(null);
    setSectionFormOpen(true);
  }

  function handleAddLesson(sectionId: number) {
    setActiveSectionId(sectionId);
    setEditingLesson(null);
    setLessonFormOpen(true);
  }

  function handleEditLesson(sectionId: number, lesson: TeacherLesson) {
    setActiveSectionId(sectionId);
    setEditingLesson(lesson);
    setLessonFormOpen(true);
  }

  async function handleMoveLesson(section: TeacherSection, lesson: TeacherLesson, direction: 'up' | 'down') {
    const index = section.lessons.findIndex((l) => l.id === lesson.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= section.lessons.length) return;
    const sibling = section.lessons[swapIndex];
    try {
      await moveLesson.mutateAsync([
        { id: lesson.id, order: sibling.order },
        { id: sibling.id, order: lesson.order },
      ]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.lessons.toast.reorderFailed'));
    }
  }

  async function handleConfirmDeleteLesson() {
    if (!deletingLesson) return;
    try {
      await deleteLesson.mutateAsync(deletingLesson.id);
      toast.success(t('teacherPages.lessons.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.lessons.toast.deleteFailed'));
    } finally {
      setDeletingLesson(null);
    }
  }

  async function handleConfirmDeleteSection() {
    if (!deletingSection) return;
    try {
      await deleteSection.mutateAsync(deletingSection.id);
      toast.success(t('teacherPages.lessons.toast.sectionDeleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.lessons.toast.sectionDeleteFailed'));
    } finally {
      setDeletingSection(null);
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
    return <ErrorState description={t('teacherPages.lessons.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAddSection} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <FolderPlus className="h-4 w-4" />
          {t('teacherPages.lessons.addSection')}
        </Button>
      </div>

      {sections.length === 0 ? (
        <EmptyState icon={<ListVideo className="h-12 w-12" />} description={t('teacherPages.lessons.empty')} />
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#F9F6F0]">{section.title}</h3>
                    {!section.isPublished && (
                      <Badge variant="outline">{t('teacherPages.courses.statusDraft')}</Badge>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleAddLesson(section.id)}>
                      <Plus className="h-3.5 w-3.5" />
                      {t('teacherPages.lessons.addLesson')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingSection(section);
                        setSectionFormOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingSection(section)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {section.lessons.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-[rgba(212,181,158,0.18)] p-4 text-center text-sm text-[rgba(249,246,240,0.45)]">
                    {t('teacherPages.lessons.empty')}
                  </p>
                ) : (
                  <div className="divide-y divide-[rgba(212,181,158,0.12)] rounded-lg border border-[rgba(212,181,158,0.12)]">
                    {section.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center gap-4 p-3">
                        <div className="flex shrink-0 flex-col">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveLesson(section, lesson, 'up')}
                            className="text-[rgba(249,246,240,0.45)] hover:text-[#D4B59E] disabled:opacity-25"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled={index === section.lessons.length - 1}
                            onClick={() => handleMoveLesson(section, lesson, 'down')}
                            className="text-[rgba(249,246,240,0.45)] hover:text-[#D4B59E] disabled:opacity-25"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-[#D4B59E]">
                          <PlayCircle className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-medium text-[#F9F6F0]">{lesson.title}</p>
                            {lesson.isPreview && (
                              <Badge variant="outline" className="shrink-0">
                                {t('teacherPages.lessons.fields.isFree')}
                              </Badge>
                            )}
                          </div>
                          {lesson.duration ? (
                            <p className="truncate text-sm text-[rgba(249,246,240,0.55)]">
                              {lesson.duration} {t('teacherPages.lessons.minutesUnit')}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setPreviewLesson(lesson)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditLesson(section.id, lesson)}>
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
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <SectionFormModal
        isOpen={sectionFormOpen}
        onClose={() => setSectionFormOpen(false)}
        courseSlug={courseSlug}
        section={editingSection}
      />

      {activeSectionId !== null && (
        <LessonFormModal
          isOpen={lessonFormOpen}
          onClose={() => setLessonFormOpen(false)}
          courseSlug={courseSlug}
          courseSectionId={activeSectionId}
          lesson={editingLesson}
        />
      )}

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
            onClick={handleConfirmDeleteLesson}
            loading={deleteLesson.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={deletingSection !== null}
        onClose={() => setDeletingSection(null)}
        title={t('teacherPages.lessons.sectionDeleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.lessons.sectionDeleteConfirmMessage', { title: deletingSection?.title })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingSection(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDeleteSection}
            loading={deleteSection.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
