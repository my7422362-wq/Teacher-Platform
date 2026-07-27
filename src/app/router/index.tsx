import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/main-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { StudentLayout } from '@/app/layouts/student-layout';
import { TeacherLayout } from '@/app/layouts/teacher-layout';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { CoursesPage } from '@/pages/courses';
import { CourseDetailsPage } from '@/pages/course-details';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { ForgotPasswordPage } from '@/pages/forgot-password';
import { NotFoundPage } from '@/pages/not-found';
import {
  StudentDashboardPage,
  StudentCoursesPage,
  StudentProfilePage,
} from '@/pages/student';
import {
  TeacherDashboardPage,
  TeacherCoursesPage,
  TeacherStudentsPage,
  TeacherAnalyticsPage,
} from '@/pages/teacher';

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Student routes */}
      <Route path="student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="courses" element={<StudentCoursesPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
      </Route>

      {/* Teacher routes */}
      <Route path="teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="courses" element={<TeacherCoursesPage />} />
        <Route path="students" element={<TeacherStudentsPage />} />
        <Route path="analytics" element={<TeacherAnalyticsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

