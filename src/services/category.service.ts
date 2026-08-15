import axios from 'axios';
import api from '@/services/api';
import i18n from '@/i18n/config';

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  isActive: boolean;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

function mapCategory(dto: CategoryDto): Category {
  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    icon: dto.icon,
    description: dto.description,
    isActive: dto.is_active,
  };
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const firstValidationError = data?.errors && Object.values(data.errors)[0]?.[0];
    if (firstValidationError) return firstValidationError;
    if (data?.message) return data.message;
  }
  return fallback;
}

/** Real API — course category management (/categories). List is public;
 *  create/update/delete require an authenticated teacher. */
export const categoryService = {
  async list(): Promise<Category[]> {
    try {
      const { data } = await api.get<{ data: CategoryDto[] }>('/categories');
      return data.data.map(mapCategory);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.categories.toast.loadFailed')));
    }
  },

  async create(values: CategoryFormValues): Promise<Category> {
    try {
      const { data } = await api.post<{ data: CategoryDto }>('/categories', {
        name: values.name,
        description: values.description || null,
        icon: values.icon || null,
        is_active: values.isActive,
      });
      return mapCategory(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.categories.toast.saveFailed')));
    }
  },

  async update(categoryId: number, values: CategoryFormValues): Promise<Category> {
    try {
      const { data } = await api.put<{ data: CategoryDto }>(`/categories/${categoryId}`, {
        name: values.name,
        description: values.description || null,
        icon: values.icon || null,
        is_active: values.isActive,
      });
      return mapCategory(data.data);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.categories.toast.saveFailed')));
    }
  },

  async remove(categoryId: number): Promise<void> {
    try {
      await api.delete(`/categories/${categoryId}`);
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.categories.toast.deleteFailed')));
    }
  },
};
