import axios from 'axios';
import type { ApiResponse, User } from '@/types';
import type { AuthRole, AuthUser, LoginInput, RegisterInput } from '@/features/auth/types';
import { sessionService } from '@/services/session.service';
import api, { post } from '@/services/api';
import i18n from '@/i18n/config';

/** Converts a `data:` URL (from FileReader.readAsDataURL, used for the
 *  photo preview) into a File so it can be sent as multipart form data. */
function dataUrlToFile(dataUrl: string, filename: string): File {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/data:(.*?);base64/)?.[1] ?? 'image/jpeg';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}

/**
 * Shape of the `user` object as returned by the real backend (UserResource).
 * NOTE: the backend field is `grade_level`, not `grade` — mapped below in
 * toAuthUserFromBackend to keep the rest of the app using `grade`.
 */
interface BackendUser {
  id: number | string;
  name: string;
  email: string;
  phone?: string;
  role: AuthRole;
  grade_level?: string | null;
  governorate?: string | null;
  photo_path?: string | null;
}

/** Laravel Sanctum payload shape — confirmed: `token` (plain text token). */
interface AuthPayload {
  user: BackendUser;
  token?: string;
}

function toAuthUserFromBackend(user: BackendUser): AuthUser {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    grade: user.grade_level ?? undefined,
    governorate: user.governorate ?? undefined,
    avatar: user.photo_path ?? undefined,
    role: user.role,
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

export const authService = {
  /**
   * Log in with email and password.
   *
   * REAL API — POST /auth/login (JSON body). The backend's LoginRequest
   * validates `email`, `password`, and an optional `device_name` from the
   * request body — this must be a normal JSON POST, not query params.
   *
   * NOTE: unlike most endpoints wrapped in the generic `ApiResponse`
   * envelope, this one returns the payload flat — `{ message, user, token }`
   * at the top level, no nested `data` key (confirmed against the live
   * API). Using the `post()` helper here would silently destructure
   * `undefined` and misreport every successful login as invalid
   * credentials, so this calls the axios instance directly instead.
   */
  async login({ email, password }: LoginInput): Promise<{ user: AuthUser; token: string }> {
    try {
      const { data } = await api.post<AuthPayload>('/auth/login', {
        email,
        password,
        device_name: 'web',
      });
      if (!data.token) throw new Error('missing-token');
      return { user: toAuthUserFromBackend(data.user), token: data.token };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.loginInvalid')));
    }
  },

  /**
   * Register a new account. Does NOT log the user in for the purposes of
   * the app flow — the account still needs email verification via
   * sendOtp/verifyOtp below (even though the backend does return a token
   * immediately, so it can be used to call send-otp without a separate login).
   *
   * REAL API — POST /auth/register (JSON body).
   * Self-registration is limited to `student` and `teacher` roles.
   * `grade_level` / `governorate` are only required when role === 'student'.
   *
   * NOTE: `passwordConfirmation` below assumes that's the field name on
   * RegisterInput — rename to match your actual type if it differs
   * (e.g. `confirmPassword`).
   */
  async register(input: RegisterInput): Promise<{ token: string } | void> {
    try {
      const { data } = await api.post<AuthPayload>('/auth/register', {
        name: input.name,
        email: input.email,
        password: input.password,
        password_confirmation: input.passwordConfirmation,
        role: input.role,
        phone: input.phone,
        grades: input.role === 'student' ? input.grade : undefined,
        governorate: input.role === 'student' ? input.governorate : undefined,
      });
      // Keep the token around if the caller needs it to immediately call
      // sendOtp/verifyOtp without asking the user to log in again.
      if (data?.token) return { token: data.token };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.registerFailed')));
    }
  },

  /**
   * Sends (or resends) the email-verification OTP code.
   *
   * REAL API — POST /auth/email/send-otp (JSON body: { email }).
   */
  async sendOtp(email: string): Promise<void> {
    try {
      await post('/auth/email/send-otp', { email });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.genericError')));
    }
  },

  /**
   * Verifies the email OTP code.
   *
   * REAL API — POST /auth/email/verify-otp (JSON body: { email, otp }).
   * CONFIRMED: this endpoint does NOT return a user/token — it only
   * activates the account (`{ message }`). The caller must follow up with
   * login() using the credentials still held from the register step.
   */
  async verifyOtp(email: string, otp: string): Promise<void> {
    try {
      await post('/auth/email/verify-otp', { email, otp });
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.otp.incomplete')));
    }
  },

  /**
   * Log out the current user (revokes ALL sessions server-side via
   * logout-all, then clears the local one regardless of whether the
   * request succeeds).
   *
   * REAL API — POST /auth/logout-all (Bearer token attached automatically).
   */
  async logout(): Promise<void> {
    try {
      await post('/auth/logout-all');
    } catch {
      // Best-effort: still clear the local session below even if the
      // network call fails (e.g. token already expired server-side).
    } finally {
      sessionService.clearSession();
    }
  },

  /**
   * Send password reset OTP.
   *
   * REAL API — POST /auth/forgot-password (JSON body: { email }).
   * Always returns 200 regardless of whether the email exists
   * (anti-enumeration), so treat the response as always "success" from the UI.
   */
  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    try {
      await post('/auth/forgot-password', { email });
      return {
        success: true,
        message: i18n.t('auth.messages.forgotPasswordSent'),
        data: null,
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.genericError')));
    }
  },

  /**
   * Reset password with the OTP code sent to the user's email.
   *
   * REAL API — POST /auth/reset-password
   * (JSON body: { email, otp, password, password_confirmation }).
   * NOTE: the backend has no separate reset "token" — it's OTP-based, so
   * the unused `_token` param below stays unused; consider dropping it
   * from the call sites and this signature.
   */
  async resetPassword(
    _token: string,
    email: string,
    otp: string,
    password: string,
    passwordConfirmation: string
  ): Promise<ApiResponse<null>> {
    try {
      await post('/auth/reset-password', {
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      return {
        success: true,
        message: i18n.t('auth.messages.passwordResetSuccess'),
        data: null,
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.genericError')));
    }
  },

  /**
   * Get the currently authenticated user profile.
   *
   * REAL API — GET /auth/me (Bearer token attached automatically).
   */
  async me(): Promise<ApiResponse<User>> {
    try {
      const { data } = await api.get<{ data: BackendUser }>('/auth/me');
      return {
        success: true,
        message: '',
        data: toAuthUserFromBackend(data.data) as unknown as User,
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.toast.genericError')));
    }
  },

  /**
   * Update the authenticated user's profile (name/avatar/grade/phone).
   *
   * REAL API — PUT /profile for name/phone/grade_level (JSON), plus
   * POST /profile/photo (multipart) when a new avatar was picked — the
   * backend exposes these as two separate endpoints. Since neither
   * mutation's response shape is confirmed, this refetches GET /auth/me
   * afterward rather than guessing how to parse them.
   */
  async updateProfile(
    _userId: string,
    data: Partial<Pick<AuthUser, 'name' | 'avatar' | 'grade' | 'phone'>>
  ): Promise<ApiResponse<AuthUser>> {
    try {
      if (data.name !== undefined || data.phone !== undefined || data.grade !== undefined) {
        await api.put('/profile', {
          name: data.name,
          phone: data.phone,
          grade_level: data.grade,
        });
      }

      if (data.avatar && data.avatar.startsWith('data:')) {
        const form = new FormData();
        form.append('photo', dataUrlToFile(data.avatar, 'avatar.jpg'));
        await api.post('/profile/photo', form);
      }

      const { data: me } = await api.get<{ data: BackendUser }>('/auth/me');
      return {
        success: true,
        message: i18n.t('auth.messages.profileUpdateSuccess'),
        data: toAuthUserFromBackend(me.data),
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('teacherPages.settings.toast.accountUpdateFailed')));
    }
  },

  /**
   * Change the authenticated user's password after verifying the current one.
   *
   * REAL API — PUT /profile/password (JSON body:
   * { current_password, password, password_confirmation }).
   */
  async changePassword(
    _userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> {
    try {
      await api.put('/profile/password', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: newPassword,
      });
      return {
        success: true,
        message: i18n.t('auth.messages.passwordChangeSuccess'),
        data: null,
      };
    } catch (error) {
      throw new Error(extractErrorMessage(error, i18n.t('auth.errors.currentPasswordIncorrect')));
    }
  },
};