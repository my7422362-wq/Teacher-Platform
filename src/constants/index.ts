export const APP_NAME = import.meta.env.VITE_APP_NAME || 'نظام إدارة التعلم';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const APP_LOCALE = import.meta.env.VITE_APP_LOCALE || 'ar';
export const APP_DIRECTION = import.meta.env.VITE_APP_DIRECTION || 'rtl';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_COURSES: '/student/courses',
  STUDENT_PROFILE: '/student/profile',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_COURSES: '/teacher/courses',
  TEACHER_STUDENTS: '/teacher/students',
  TEACHER_ANALYTICS: '/teacher/analytics',
} as const;

export const QUERY_KEYS = {
  USERS: 'users',
  USER: 'user',
  COURSES: 'courses',
  COURSE: 'course',
  LESSONS: 'lessons',
  LESSON: 'lesson',
  QUIZZES: 'quizzes',
  QUIZ: 'quiz',
  ASSIGNMENTS: 'assignments',
  ASSIGNMENT: 'assignment',
  CERTIFICATES: 'certificates',
  NOTIFICATIONS: 'notifications',
  STUDENTS: 'students',
  DASHBOARD: 'dashboard',
  ANALYTICS: 'analytics',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  THEME: 'theme',
  LOCALE: 'locale',
  USER: 'user',
} as const;

