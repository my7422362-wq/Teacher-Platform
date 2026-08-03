import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, PaginatedResponse } from '@/types';
import { STORAGE_KEYS } from '@/constants';
import type { AuthSession } from '@/services/session.service';

/**
 * Laravel REST API client.
 *
 * - Base URL from VITE_API_BASE_URL env variable.
 * - Request interceptor attaches the Bearer token from the stored session.
 * - Response interceptor normalizes errors and handles 401 globally.
 */

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30_000,
});

function readSessionToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!raw) return null;
    return (JSON.parse(raw) as AuthSession).token;
  } catch {
    return null;
  }
}

/* ─── Request interceptor ─────────────────────────────────────────────── */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = readSessionToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Let the browser set the multipart boundary itself for FormData bodies —
    // the instance-level 'Content-Type: application/json' default would
    // otherwise override it and the backend can't parse the form fields.
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/* ─── Response interceptor ────────────────────────────────────────────── */

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
      // Redirect to login – using window.location to avoid circular deps
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

/* ─── Typed request helpers ───────────────────────────────────────────── */

/**
 * GET request returning a standard ApiResponse payload.
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.get<ApiResponse<T>>(url, config);
  return response.data;
}

/**
 * GET request returning a paginated response (Laravel-style).
 */
export async function getPaginated<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<T>> {
  const response = await api.get<PaginatedResponse<T>>(url, config);
  return response.data;
}

/**
 * POST request.
 */
export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.post<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * POST request sent as multipart/form-data — for endpoints that expect
 * `formdata` bodies (e.g. the Auth endpoints in the Taalom Postman collection).
 * Fields with a `undefined` value are skipped.
 */
export async function postForm<T>(
  url: string,
  fields: Record<string, string | undefined>,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) formData.append(key, value);
  }
  const response = await api.post<ApiResponse<T>>(url, formData, config);
  return response.data;
}

/**
 * PUT request.
 */
export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.put<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * PATCH request.
 */
export async function patch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.patch<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * DELETE request.
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return response.data;
}

export default api;
