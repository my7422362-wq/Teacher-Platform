import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse, PaginatedResponse } from '@/types';

/**
 * Laravel REST API client.
 *
 * - Base URL from VITE_API_BASE_URL env variable.
 * - Request interceptor attaches Bearer token from localStorage.
 * - Response interceptor normalizes errors and handles 401 globally.
 */

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30_000,
});

/* ─── Request interceptor ─────────────────────────────────────────────── */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      localStorage.removeItem('auth_token');
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

