import type { User, ApiResponse, ApiError } from '@/types';
import { mockUsers } from '@/mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(500);
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' } as ApiError;
    }
    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: { user, token: 'mock_token_' + user.id },
    };
  },

  async register(data: Partial<User>): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(500);
    const newUser: User = {
      id: mockUsers.length + 1,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      avatar: '',
      role: 'student',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return {
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      data: { user: newUser, token: 'mock_token_' + newUser.id },
    };
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('auth_token');
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: true,
      message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
      data: null,
    };
  },

  async resetPassword(token: string, password: string): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      success: true,
      message: 'تم إعادة تعيين كلمة المرور بنجاح',
      data: null,
    };
  },
};

