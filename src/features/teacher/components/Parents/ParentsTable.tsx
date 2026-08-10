import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
  Input,
  Button,
  Modal,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/components/ui';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { useTeacherParents, useDeleteParent } from './queries';
import { ParentFormModal } from './ParentFormModal';
import type { TeacherParent } from './types';

export function ParentsTable() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data: parents = [], isLoading, isError, refetch } = useTeacherParents();
  const deleteParent = useDeleteParent();

  const [editingParent, setEditingParent] = useState<TeacherParent | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingParent, setDeletingParent] = useState<TeacherParent | null>(null);

  const filtered = parents.filter((p) => {
    const q = search.trim().toLowerCase();
    return p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
  });

  async function handleConfirmDelete() {
    if (!deletingParent) return;
    try {
      await deleteParent.mutateAsync(deletingParent.id);
      toast.success(t('teacherPages.parents.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.parents.toast.deleteFailed'));
    } finally {
      setDeletingParent(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder={t('teacherPages.parents.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={<Search className="h-4 w-4 text-[rgba(249,246,240,0.45)]" />}
          />
        </div>
        <Button
          onClick={() => {
            setEditingParent(null);
            setFormOpen(true);
          }}
          className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
        >
          <Plus className="h-4 w-4" />
          {t('teacherPages.parents.addParent')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.parents.toast.loadFailed')} onRetry={() => refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState description={t('teacherPages.parents.empty')} />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('teacherPages.parents.tableName')}</TableHead>
                  <TableHead>{t('teacherPages.parents.tableStudent')}</TableHead>
                  <TableHead>{t('teacherPages.parents.tableContact')}</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell>
                      <span className="font-medium text-[#F9F6F0]">{parent.name}</span>
                    </TableCell>
                    <TableCell>{parent.students.map((s) => s.name).join('، ') || '—'}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-[rgba(249,246,240,0.85)]">{parent.email}</p>
                        {parent.phone && <p className="text-[rgba(249,246,240,0.55)]">{parent.phone}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Link to={`/teacher/parents/${parent.id}`} className="text-sm text-[#D4B59E] hover:underline">
                          {t('teacherPages.parents.viewProfile')}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingParent(parent);
                            setFormOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeletingParent(parent)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ParentFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} parent={editingParent} />

      <Modal
        isOpen={deletingParent !== null}
        onClose={() => setDeletingParent(null)}
        title={t('teacherPages.parents.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.parents.deleteConfirmMessage', { name: deletingParent?.name })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingParent(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            loading={deleteParent.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
