import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Button, Textarea, EmptyState } from '@/components/ui';
import { MessageSquare } from 'lucide-react';
import { saveStudentNote } from './notes-store';
import { CURRENT_TEACHER_ID } from './data';
import type { StudentNote } from '@/types';

interface StudentNotesProps {
  studentId: number;
  notes: StudentNote[];
}

export function StudentNotes({ studentId, notes: initialNotes }: StudentNotesProps) {
  const { t, i18n } = useTranslation();
  const [notes, setNotes] = useState(initialNotes);
  const [text, setText] = useState('');

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const note: StudentNote = {
      id: Date.now(),
      studentId,
      teacherId: CURRENT_TEACHER_ID,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    saveStudentNote(note);
    setNotes((prev) => [note, ...prev]);
    setText('');
    toast.success(t('teacherPages.studentDetail.noteAdded'));
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
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('teacherPages.studentDetail.addNote')}
          </Button>
        </CardContent>
      </Card>

      {notes.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-12 w-12" />}
          description={t('teacherPages.studentDetail.notesEmpty')}
        />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {notes.map((note) => (
              <div key={note.id} className="p-4">
                <p className="text-sm text-[#F9F6F0]">{note.text}</p>
                <p className="mt-1 text-xs text-[rgba(249,246,240,0.45)]">
                  {new Date(note.createdAt).toLocaleString(i18n.language)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
