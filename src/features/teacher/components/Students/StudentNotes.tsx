import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Button, Textarea, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useStudentNotes, useAddStudentNote, useDeleteStudentNote } from './queries';

export function StudentNotes({ studentId }: { studentId: number }) {
  const { t, i18n } = useTranslation();
  const { data: notes = [], isLoading, isError, refetch } = useStudentNotes(studentId);
  const addNote = useAddStudentNote(studentId);
  const deleteNote = useDeleteStudentNote(studentId);
  const [text, setText] = useState('');

  async function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    try {
      await addNote.mutateAsync(trimmed);
      setText('');
      toast.success(t('teacherPages.studentDetail.noteAdded'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.studentDetail.toast.noteSaveFailed'));
    }
  }

  async function handleDelete(noteId: number) {
    try {
      await deleteNote.mutateAsync(noteId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.studentDetail.toast.noteDeleteFailed'));
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#F9F6F0]">
        {t('teacherPages.studentDetail.notesTitle')}
      </h2>

      <Card>
        <CardContent className="space-y-3 p-5">
          <Textarea
            placeholder={t('teacherPages.studentDetail.notesPlaceholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleAdd}
            disabled={!text.trim()}
            loading={addNote.isPending}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('teacherPages.studentDetail.addNote')}
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="sm" />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.students.toast.loadFailed')} onRetry={() => refetch()} />
      ) : notes.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-12 w-12" />}
          description={t('teacherPages.studentDetail.notesEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {notes.map((note) => (
              <div key={note.id} className="flex items-start justify-between gap-3 p-4">
                <div>
                  <p className="text-sm text-[#F9F6F0]">{note.note}</p>
                  {note.createdAt && (
                    <p className="mt-1 text-xs text-[rgba(249,246,240,0.45)]">
                      {new Date(note.createdAt).toLocaleString(i18n.language)}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
