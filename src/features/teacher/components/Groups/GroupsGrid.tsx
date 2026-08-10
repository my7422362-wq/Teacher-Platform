import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Button, Modal, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { Pencil, Trash2, Plus, Users } from 'lucide-react';
import { useTeacherGroups, useDeleteGroup } from './queries';
import { GroupFormModal } from './GroupFormModal';
import type { TeacherGroup } from './types';

export function GroupsGrid() {
  const { t } = useTranslation();
  const { data: groups = [], isLoading, isError, refetch } = useTeacherGroups();
  const deleteGroup = useDeleteGroup();

  const [editingGroup, setEditingGroup] = useState<TeacherGroup | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState<TeacherGroup | null>(null);

  async function handleConfirmDelete() {
    if (!deletingGroup) return;
    try {
      await deleteGroup.mutateAsync(deletingGroup.id);
      toast.success(t('teacherPages.groups.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.groups.toast.deleteFailed'));
    } finally {
      setDeletingGroup(null);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingGroup(null);
            setFormOpen(true);
          }}
          className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
        >
          <Plus className="h-4 w-4" />
          {t('teacherPages.groups.addGroup')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState description={t('teacherPages.groups.toast.loadFailed')} onRetry={() => refetch()} />
      ) : groups.length === 0 ? (
        <EmptyState description={t('teacherPages.groups.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardContent className="space-y-3 p-5">
                <h3 className="font-semibold text-[#F9F6F0]">{group.name}</h3>
                {group.description && (
                  <p className="line-clamp-2 text-sm text-[rgba(249,246,240,0.65)]">{group.description}</p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-[rgba(249,246,240,0.55)]">
                  <Users className="h-3.5 w-3.5" />
                  {t('teacherPages.groups.studentsCount', { count: group.students.length })}
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setEditingGroup(group);
                      setFormOpen(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {t('teacherPages.groups.editGroup')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDeletingGroup(group)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <GroupFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} group={editingGroup} />

      <Modal
        isOpen={deletingGroup !== null}
        onClose={() => setDeletingGroup(null)}
        title={t('teacherPages.groups.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.groups.deleteConfirmMessage', { name: deletingGroup?.name })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingGroup(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            loading={deleteGroup.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
