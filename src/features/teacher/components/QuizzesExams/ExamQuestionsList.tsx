import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState } from '@/components/ui';
import { Pencil, Trash2, Plus, HelpCircle } from 'lucide-react';
import { getExam, deleteExamQuestion } from './exam-store';
import { ExamQuestionFormModal } from './ExamQuestionFormModal';
import type { ExamQuestion } from '@/types';

export function ExamQuestionsList({ examId }: { examId: number }) {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => getExam(examId)?.questions ?? []);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState<ExamQuestion | null>(null);

  function refresh() {
    setQuestions(getExam(examId)?.questions ?? []);
  }

  function handleConfirmDelete() {
    if (!deletingQuestion) return;
    deleteExamQuestion(examId, deletingQuestion.id);
    toast.success(t('teacherPages.quizzesExams.toast.questionDeleted'));
    setDeletingQuestion(null);
    refresh();
  }

  const totalScore = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[rgba(249,246,240,0.65)]">
          {t('teacherPages.quizzesExams.totalScore', { score: totalScore })}
        </p>
        <Button
          onClick={() => { setEditingQuestion(null); setFormOpen(true); }}
          className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
        >
          <Plus className="h-4 w-4" />
          {t('teacherPages.quizzesExams.addQuestion')}
        </Button>
      </div>

      {questions.length === 0 ? (
        <EmptyState icon={<HelpCircle className="h-12 w-12" />} description={t('teacherPages.quizzesExams.noQuestions')} />
      ) : (
        <Card>
          <CardContent className="divide-y divide-[rgba(212,181,158,0.12)] p-0">
            {questions.map((question, index) => (
              <div key={question.id} className="flex items-center gap-4 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4B59E]/15 text-sm font-semibold text-[#D4B59E]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#F9F6F0]">{question.text}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{t(`teacherPages.quizzesExams.questionTypes.${question.type}`)}</Badge>
                    <span className="text-xs text-[rgba(249,246,240,0.45)]">{question.points} pts</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditingQuestion(question); setFormOpen(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDeletingQuestion(question)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <ExamQuestionFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        examId={examId}
        question={editingQuestion}
        onSaved={refresh}
      />

      <Modal isOpen={deletingQuestion !== null} onClose={() => setDeletingQuestion(null)} title={t('teacherPages.quizzesExams.deleteConfirmTitle')} size="sm">
        <p className="text-sm text-[rgba(249,246,240,0.75)]">{t('teacherPages.quizzesExams.deleteQuestionConfirm')}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingQuestion(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
