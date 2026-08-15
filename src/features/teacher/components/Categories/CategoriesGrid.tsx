import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, Badge, Button, Modal, EmptyState, ErrorState, Spinner } from '@/components/ui';
import { Pencil, Trash2, Plus, Tag } from 'lucide-react';
import { useTeacherCategories, useDeleteCategory } from './queries';
import { CategoryFormModal } from './CategoryFormModal';
import type { Category } from '@/services';

export function CategoriesGrid() {
  const { t } = useTranslation();
  const { data: categories = [], isLoading, isError, refetch } = useTeacherCategories();
  const deleteCategory = useDeleteCategory();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  function handleAdd() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  async function handleConfirmDelete() {
    if (!deletingCategory) return;
    try {
      await deleteCategory.mutateAsync(deletingCategory.id);
      toast.success(t('teacherPages.categories.toast.deleted'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.categories.toast.deleteFailed'));
    } finally {
      setDeletingCategory(null);
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
    return <ErrorState description={t('teacherPages.categories.toast.loadFailed')} onRetry={() => refetch()} />;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleAdd} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
          <Plus className="h-4 w-4" />
          {t('teacherPages.categories.addCategory')}
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState icon={<Tag className="h-12 w-12" />} description={t('teacherPages.categories.empty')} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[#F9F6F0]">{category.name}</h3>
                  <Badge variant={category.isActive ? 'success' : 'outline'} className="shrink-0">
                    {category.isActive
                      ? t('teacherPages.categories.statusActive')
                      : t('teacherPages.categories.statusInactive')}
                  </Badge>
                </div>

                {category.description && (
                  <p className="line-clamp-2 text-sm text-[rgba(249,246,240,0.65)]">{category.description}</p>
                )}

                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(category)}>
                    <Pencil className="h-3.5 w-3.5" />
                    {t('teacherPages.categories.editCategory')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => setDeletingCategory(category)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CategoryFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} category={editingCategory} />

      <Modal
        isOpen={deletingCategory !== null}
        onClose={() => setDeletingCategory(null)}
        title={t('teacherPages.categories.deleteConfirmTitle')}
        size="sm"
      >
        <p className="text-sm text-[rgba(249,246,240,0.75)]">
          {t('teacherPages.categories.deleteConfirmMessage', { name: deletingCategory?.name })}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeletingCategory(null)}>
            {t('teacherPages.courses.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            loading={deleteCategory.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t('teacherPages.courses.confirm')}
          </Button>
        </div>
      </Modal>
    </section>
  );
}
