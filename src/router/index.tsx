import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { StudentLayout } from '@/layouts/student-layout';
import { TeacherLayout } from '@/layouts/teacher-layout';
import { AdminLayout } from '@/layouts/admin-layout';
import { ProtectedRoute, GuestRoute } from '@/features/auth';
import { HomePage } from '@/features/home/pages/home';
import { AboutPage } from '@/features/home/pages/about';
import { CoursesPage } from '@/features/courses/pages/courses';
import { CourseDetailsPage } from '@/features/course-details/pages/course-details';
import { LoginPage } from '@/features/auth/pages/login';
import { RegisterPage } from '@/features/auth/pages/register';
import { ForgotPasswordPage } from '@/features/auth/pages/forgot-password';
import { FaqPage } from '@/features/home/pages/faq';
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
  StudentAttendancePage,
  StudentMeetingsPage,
  StudentMeetingRoomPage,
} from '@/features/student/pages';
import {
  TeacherDashboardPage,
  TeacherCoursesPage,
  TeacherCategoriesPage,
  TeacherStudentsPage,
  TeacherStudentDetailPage,
  TeacherParentsPage,
  TeacherParentDetailPage,
  TeacherCourseLessonsPage,
  TeacherLessonsOverviewPage,
  TeacherQuizzesExamsPage,
  TeacherQuizQuestionsPage,
  TeacherExamQuestionsPage,
  TeacherQuizResultsPage,
  TeacherExamResultsPage,
  TeacherGradesPage,
  TeacherAttendancePage,
  TeacherPaymentsPage,
  TeacherNotificationsPage,
  TeacherGroupsPage,
  TeacherAnalyticsPage,
  TeacherSettingsPage,
  TeacherMeetingsPage,
  TeacherMeetingRoomPage,
} from '@/features/teacher/pages';
import {
  AdminDashboardPage,
  AdminTeachersPage,
  AdminStudentsPage,
  AdminCoursesPage,
  AdminPaymentsPage,
  AdminSettingsPage,
} from '@/features/admin/pages';

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
        <Route path="faq" element={<FaqPage />} />
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
          <Route path="settings" element={<StudentProfilePage />} />
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
          <Route path="attendance" element={<StudentAttendancePage />} />
          <Route path="meetings" element={<StudentMeetingsPage />} />
          <Route path="meetings/room" element={<StudentMeetingRoomPage />} />
        </Route>
      </Route>

      {/* Teacher routes — require an authenticated teacher */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="categories" element={<TeacherCategoriesPage />} />
          <Route path="courses/:slug/lessons" element={<TeacherCourseLessonsPage />} />
          <Route path="lessons" element={<TeacherLessonsOverviewPage />} />
          <Route path="quizzes-exams" element={<TeacherQuizzesExamsPage />} />
          <Route path="quizzes/:id/questions" element={<TeacherQuizQuestionsPage />} />
          <Route path="exams/:id/questions" element={<TeacherExamQuestionsPage />} />
          <Route path="quizzes/:id/results" element={<TeacherQuizResultsPage />} />
          <Route path="exams/:id/results" element={<TeacherExamResultsPage />} />
          <Route path="grades" element={<TeacherGradesPage />} />
          <Route path="attendance" element={<TeacherAttendancePage />} />
          <Route path="payments" element={<TeacherPaymentsPage />} />
          <Route path="notifications" element={<TeacherNotificationsPage />} />
          <Route path="groups" element={<TeacherGroupsPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/:id" element={<TeacherStudentDetailPage />} />
          <Route path="parents" element={<TeacherParentsPage />} />
          <Route path="parents/:id" element={<TeacherParentDetailPage />} />
          <Route path="analytics" element={<TeacherAnalyticsPage />} />
          <Route path="settings" element={<TeacherSettingsPage />} />
          <Route path="profile" element={<TeacherSettingsPage />} />
          <Route path="meetings" element={<TeacherMeetingsPage />} />
          <Route path="meetings/room" element={<TeacherMeetingRoomPage />} />
        </Route>
      </Route>

      {/* Admin routes — require an authenticated admin */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}



