import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/main-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { StudentLayout } from '@/app/layouts/student-layout';
import { TeacherLayout } from '@/app/layouts/teacher-layout';
import { ProtectedRoute, GuestRoute } from '@/features/auth';
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
  QuizTakePage,
  ExamTakePage,
  StudentQuizzesPage,
  StudentExamsPage,
  StudentGradesPage,
  StudentSchedulePage,
  StudentRevisionPage,
  StudentCertificatesPage,
  StudentPaymentsPage,
  StudentNotificationsPage,
} from '@/pages/student';
import {
  TeacherDashboardPage,
  TeacherCoursesPage,
  TeacherStudentsPage,
  TeacherStudentDetailPage,
  TeacherParentsPage,
  TeacherParentDetailPage,
  TeacherCourseLessonsPage,
  TeacherLessonsOverviewPage,
  TeacherAnalyticsPage,
} from '@/pages/teacher';

export function AppRouter() {
  return (
    <Routes>
      {/* Home route - standalone (uses its own Navbar/Footer) */}
      <Route index element={<HomePage />} />

      {/* Public routes with shared layout */}
      <Route element={<MainLayout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:slug" element={<CourseDetailsPage />} />
      </Route>

      {/* Auth routes — only reachable when signed out */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      {/* Student routes — require an authenticated student */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="courses" element={<StudentCoursesPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="schedule" element={<StudentSchedulePage />} />
          <Route path="quizzes" element={<StudentQuizzesPage />} />
          <Route path="quizzes/:id" element={<QuizTakePage />} />
          <Route path="exams" element={<StudentExamsPage />} />
          <Route path="exams/:id" element={<ExamTakePage />} />
          <Route path="grades" element={<StudentGradesPage />} />
          <Route path="revision" element={<StudentRevisionPage />} />
          <Route path="certificates" element={<StudentCertificatesPage />} />
          <Route path="payments" element={<StudentPaymentsPage />} />
          <Route path="notifications" element={<StudentNotificationsPage />} />
        </Route>
      </Route>

      {/* Teacher routes — require an authenticated teacher */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="courses/:id/lessons" element={<TeacherCourseLessonsPage />} />
          <Route path="lessons" element={<TeacherLessonsOverviewPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/:id" element={<TeacherStudentDetailPage />} />
          <Route path="parents" element={<TeacherParentsPage />} />
          <Route path="parents/:id" element={<TeacherParentDetailPage />} />
          <Route path="analytics" element={<TeacherAnalyticsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

