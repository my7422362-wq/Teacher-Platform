# Backend Requirements Document

## 1. Platform Overview

The Learning Management System (LMS) is designed to support teaching, learning, and administrative operations in an educational environment. Its primary goal is to provide a centralized platform for managing courses, student progress, assessments, attendance, payments, communications, and reporting.

The backend should provide secure, performant, and scalable services to power the platform’s web-based user interface while respecting access controls, data privacy, and multi-role workflows.

### System Roles

- **Admin / Teacher**
  - Responsible for creating and managing courses, lessons, quizzes, exams, schedules, attendance, and student records.
  - Can create and manage teachers, students, parents, and groups.
  - Can publish notifications, generate reports, and manage payments.
  - Has access to administrative dashboards and analytics.

- **Student**
  - Enrolls in courses, consumes lesson content, completes quizzes and exams, and tracks progress.
  - Views grades, attendance records, schedules, notifications, and payment status.
  - Manages personal profile and account settings.

- **Parent**
  - Linked to one or more student accounts.
  - Can view student performance, attendance, grades, progress, and payments.
  - Receives relevant notifications related to the associated student.

## 2. Authentication Requirements

The backend must fully manage authentication, authorization, and user account lifecycle operations.

### Register

- Support user registration for students, teachers, and parents depending on role.
- Validate required information such as name, email, password, role, and optional metadata.
- Optionally support admin-created accounts with invitation or approval flow.
- Ensure duplicate email/username prevention and strong password policy enforcement.

### Login

- Authenticate users using email/username and password.
- Issue secure session tokens or JWTs for frontend access.
- Support role-based authentication so users only see applicable functionality.
- Log login activity to support audit and security monitoring.

### Logout

- Invalidate active sessions or tokens.
- Support logout detection from the frontend and revoke authentication state.
- Optionally record logout timestamps for security auditing.

### Forgot Password

- Accept requests to initiate password recovery using email.
- Generate time-limited password reset tokens and send them securely.
- Prevent account enumeration by avoiding distinct responses for non-existent email addresses.

### Reset Password

- Validate reset tokens and allow setting a new password.
- Enforce password strength rules and confirm password validation.
- Invalidate tokens once used or expired.
- Notify users when password resets occur.

### User Roles and Permissions

- Store user roles centrally and enforce role-based access control.
- Provide at least the following permissions sets:
  - Admin / Teacher: full content and user management, reporting, system configuration.
  - Student: course access, progress tracking, assessment completion, profile management.
  - Parent: child monitoring, payment view, attendance and academic visibility.
- Support permission checks on each backend endpoint.
- Allow role updates and hierarchical or scope-based restrictions as needed.

### Account Management

- Allow users to update profile details, email, and password.
- Provide account activation and deactivation workflows.
- Support email verification and optional multi-factor authentication if required.
- Enable safe deletion or archival of accounts while preserving referential integrity.

## 3. Student Management

The backend must support comprehensive student lifecycle and record management.

### Student Accounts

- Create and manage student user accounts.
- Maintain authentication credentials, personal details, photos, and enrollment metadata.
- Track account status (active, inactive, suspended).

### Student Profiles

- Store student profile fields such as full name, contact information, date of birth, gender, address, parent contacts, and profile picture.
- Support editing and retrieving profile data via secure endpoints.

### Student Information

- Maintain academic details such as grade level, courses enrolled, sections, groups, and student identifiers.
- Store emergency contact details and parent relationships.

### Course Enrollment

- Record course enrollment status for each student.
- Support enrollment creation, status updates, and course withdrawal.
- Capture enrollment date, expiration, and access limits per course.

### Student Progress Tracking

- Track completion status for courses, lessons, quizzes, and exams.
- Maintain current progress percentage, lesson completion timestamps, and module status.
- Support resume points for video or lesson content where applicable.

### Student Activity History

- Record student interactions such as course access, lesson views, quiz attempts, exam submissions, and notifications read.
- Include timestamps to support auditing and progress analysis.

## 4. Admin Dashboard Requirements

The backend must provide data and actions to support an admin dashboard with full system management capabilities.

### Students Management

- CRUD operations for student records.
- Search and filter students by name, course, status, or enrollment data.
- View student details, progress, attendance, grades, and payment status.
- Bulk import and update student information where applicable.

### Courses Management

- CRUD operations for courses.
- Manage course metadata, pricing, subscription options, categories, and visibility.
- Assign teachers or instructors to courses.

### Lessons Management

- CRUD operations for lessons within courses.
- Support lesson ordering, content types, duration, and release scheduling.
- Manage lesson resources such as video links, documents, and attachments.

### Teachers Management

- CRUD operations for teacher accounts and profiles.
- Assign teachers to courses, groups, and schedules.
- Track teacher activity, course assignments, and performance support.

### Parents Management

- CRUD operations for parent accounts.
- Link parent accounts to one or more students.
- Enable parent permission and notification preferences.

### Attendance Management

- Record attendance for class sessions, courses, or scheduled events.
- Manage attendance entries for present, absent, late statuses.
- Provide attendance views, updates, corrections, and bulk recording.

### Payments Management

- Manage payment plans, course subscription invoices, and installments.
- Track payment status, due dates, amounts paid, outstanding balances, and payment history.
- Support manual payment records and refund notes.

### Exams and Quizzes Management

- Create and manage quizzes and exams.
- Add questions, configure scoring, set time limits, and specify attempt rules.
- Publish assessments to courses or groups and manage availability windows.

### Notifications Management

- Create notifications for all students, groups, specific students, or parents.
- Store notification content, delivery metadata, and recipient targeting.
- Support scheduling, status, and tracking read/unread counts.

### Groups and Schedules Management

- Manage groups such as classes, cohorts, or sections.
- Assign students and teachers to groups.
- Create schedules and session times for classes, exams, and events.

### Reports and Analytics

- Provide endpoints for generating reports on student progress, attendance, course engagement, grades, finances, and activity trends.
- Support filtering, grouping, and exporting of report data.
- Expose analytics data for dashboard visualizations.

## 5. Student Dashboard Requirements

The backend must deliver personalized student dashboard data and actions for learners.

### My Courses

- Return enrolled courses, course status, and quick access links.
- Provide course metadata, instructor information, and progress indicators.

### Continue Learning

- Identify the next pending lesson or course module.
- Provide resume state, recent activity, and suggested next steps.

### Course Progress

- Calculate and return current completion percentage for each enrolled course.
- Include counts of completed lessons, quizzes, and pending items.

### Completed Lessons

- Show a list of completed lessons and completion dates.
- Provide access to review material or replay lesson content when allowed.

### Quizzes

- Show upcoming, in-progress, and past quizzes.
- Provide attempt status, results, and feedback when available.

### Exams

- Show scheduled exams, availability windows, and past attempt records.
- Expose exam details, instructions, and status.

### Grades

- Display grade summaries for courses, assessments, and overall performance.
- Support drill-down into individual quiz and exam scores.

### Notifications

- Return notifications relevant to the student.
- Support read/unread status and delivery timestamps.

### Schedule

- Provide student schedule items such as class sessions, exam times, and events.
- Include upcoming dates and session details.

### Profile

- Expose editable profile data and account preferences.
- Allow the student to update contact details, password, and notification settings.

## 6. Course System Requirements

The backend must support full course lifecycle management.

### Creating Courses

- Accept course metadata, descriptions, pricing, categories, duration, prerequisites, and instructor assignment.
- Support course draft and publish workflows.

### Editing Courses

- Allow modification of course details, schedule, pricing, and visibility.
- Maintain version-safe updates without breaking enrolled student access.

### Deleting Courses

- Enable safe course deletion or archival.
- Preserve related data or cascade deletes only with explicit intent.
- Maintain referential integrity for enrollments, progress records, and assessment history.

### Course Details

- Provide course detail endpoints with syllabus, lesson structure, instructor info, pricing, enrollment terms, and resource summaries.

### Lessons

- Support adding lessons to courses, including order, title, description, duration, and content type.
- Link lessons to videos, files, quizzes, and other resources.

### Videos

- Support video metadata storage, such as title, duration, source URL, visibility, and access restrictions.
- Do not embed the video file storage provider in the platform design; backend should reference storage location and access controls.

### Files

- Manage attachments or downloadable materials for lessons and courses.
- Store file metadata including file name, type, size, storage path, and access restrictions.

### Course Subscriptions

- Support course enrollment models including free access, paid subscription, and per-course purchase.
- Manage subscription status, expiration, and renewal options.

### Course Progress

- Track progress at course, module, and lesson levels.
- Record completed milestones and compute aggregate progress accurately.

## 7. Quiz and Exam System

The backend must support robust assessment creation, delivery, scoring, and reporting.

### Creating Quizzes

- Allow creation of quizzes with metadata such as title, description, course association, availability dates, and passing criteria.
- Support quiz grouping and assignment to course modules.

### Creating Exams

- Support exams with configurable duration, availability window, attempt limits, and grading policies.
- Include exam-specific settings for proctoring notes or exam instructions.

### Questions

- Store questions independently and assign them to quizzes or exams.
- Support question metadata such as text, explanation, point value, and tags.

### Answers

- Store answer choices and correct answer definitions.
- Support multiple answer structures and answer-specific scoring weights.

### Different Question Types

- Support at least the following question types:
  - Multiple choice
  - True/False
  - Short answer / open response
  - Matching
  - Fill-in-the-blank
- Ensure the model supports extensibility for additional question formats.

### Timer

- Handle assessment timers at the quiz/exam level.
- Start and stop timers per student attempt and persist elapsed time.
- Enforce time limits automatically on submission.

### Attempts

- Track attempt records for quizzes and exams.
- Store start time, end time, duration, score, and attempt status.
- Support configurable attempt limits and retake rules.

### Auto Grading

- Automatically grade objective question types using stored correct answers.
- Calculate score totals and flag auto-graded results as complete.

### Saving Results

- Persist all attempt results, individual question responses, scores, and feedback.
- Provide endpoints for result retrieval, review, and analytics.

## 8. Attendance System

The backend must provide attendance tracking and reporting features.

### Recording Attendance

- Record attendance events for students at scheduled sessions or class dates.
- Support manual and bulk attendance entry.

### Present/Absent/Late Status

- Allow attendance values for present, absent, late, and optionally excused.
- Maintain reason or note fields for non-present statuses.

### Attendance History

- Store attendance records by date, student, group, and session.
- Provide historical retrieval for student and group attendance.

### Attendance Reports

- Generate attendance summaries and trend reports.
- Support filters by course, class, date range, student, and status.

## 9. Grades System

The backend must manage grade storage, calculation, and student performance reporting.

### Store Grades

- Persist grade records for assessments, courses, and overall student performance.
- Associate grades with students, courses, assessment attempts, and terms.

### Calculate Scores

- Compute assessment scores based on question weights and grading rules.
- Calculate course-level grades and cumulative performance metrics.
- Handle grade adjustments, extra credit, and penalty rules where required.

### Student Performance Reports

- Provide performance summaries showing grades by course, assessment, and date.
- Include additional metrics such as average score, highest score, lowest score, and improvement over time.

### Progress Analytics

- Support analytics that measure completion velocity, pass/fail rates, and grade distribution.
- Return data for dashboard visualizations and teacher insights.

## 10. Payment System

The backend must handle payment data and support future gateway integration.

### Course Subscriptions

- Manage paid course access and subscription status.
- Store subscription start/end dates, pricing plan, and enrolled course reference.

### Installments

- Support installment plans for course fees where required.
- Track scheduled installment amounts, due dates, paid amounts, and remaining balances.

### Payment History

- Persist each payment transaction record with amount, date, payment method, and status.
- Support manual entry of offline payments.

### Payment Status

- Expose current payment state such as pending, paid, overdue, refunded, and canceled.
- Provide clear settlement state for student and admin dashboards.

### Payment Reminders

- Support reminder rules for upcoming or overdue payments.
- Store reminder notifications, scheduling, and delivery target groups.

### Future Integration with Payment Gateways

- Design payment entities to support external gateway transaction IDs, provider names, and webhook reconciliation.
- Keep payment processing logic separate from core LMS functionality.
- Ensure extensibility for Stripe, PayPal, Razorpay, or other future providers.

## 11. Notifications System

The backend must support flexible notification creation, targeting, and tracking.

### Send Notifications To

- All students: broadcast messages to every student user.
- Specific groups: send notifications to a defined group or cohort.
- Specific students: target individual learners.
- Parents: send communication relevant to parent users or student guardians.

### Notification Requirements

- Store notification content, type, created by, target audience, and delivery status.
- Record whether notifications are read, dismissed, or unread by each recipient.
- Support scheduling notifications for future delivery.
- Enable notifications related to assessments, attendance, payment reminders, and announcements.

## 12. Parent Monitoring System

The backend must allow parent users to view linked student information in a secure and permissioned manner.

### Parent Account

- Manage parent accounts with profile information and authentication credentials.
- Support parent-specific role restrictions and permissions.

### Link Parent with Student

- Associate one or more student accounts with a parent user.
- Support linking through invitation codes, approval workflows, or admin assignment.

### View

Parents should be able to view:
- Attendance: student's attendance history and current status.
- Grades: course grades, assessment scores, and academic summaries.
- Progress: course completion, lesson progress, and overall performance metrics.
- Payments: outstanding payments, payment history, and subscription status.

## 13. Database Planning

The backend data model should include the following main entities. Each entity is described by purpose only.

- **Users**
  - Central authentication and authorization records for all user types.
  - Stores login credentials, role, status, and basic profile metadata.

- **Students**
  - Student-specific profile and academic metadata.
  - Links to user credentials and enrollment-related records.

- **Parents**
  - Parent or guardian account metadata.
  - Stores relationships to linked student records.

- **Courses**
  - Course catalog data including title, description, pricing, instructor assignment, and visibility.
  - Contains enrollment terms and course-level settings.

- **Lessons**
  - Lesson metadata and content structure within a course.
  - Stores lesson order, type, resources, and release scheduling.

- **Quizzes**
  - Quiz definitions and association to course modules.
  - Stores quiz settings, availability windows, and scoring rules.

- **Exams**
  - Exam definitions separate from quizzes, with time, attempt, and grading configuration.
  - Links to course and student attempt data.

- **Grades**
  - Persistent grade entries for assessments and course performance.
  - Stores numeric or letter grades, weighted values, and grade calculation metadata.

- **Attendance**
  - Attendance records for sessions or scheduled events.
  - Stores student attendance status, date, and related notes.

- **Payments**
  - Payment transactions, installments, and subscription invoices.
  - Tracks payment amounts, dates, status, and provider metadata.

- **Notifications**
  - Notification messages, audience targeting, and delivery metadata.
  - Stores per-recipient read/unread status.

- **Groups**
  - Cohort or class grouping data for students and teachers.
  - Supports group membership and group-level scheduling.

- **Schedules**
  - Scheduled sessions, class times, exam windows, and event dates.
  - Stores schedule details and links to courses, teachers, and groups.

- **Enrollments**
  - Student enrollment records linking students to courses.
  - Stores enrollment status, start and end dates, and access rights.

- **Attempts**
  - Assessment attempt records for quizzes and exams.
  - Stores response data, scores, duration, and status.

- **Resources**
  - Files, videos, and other course materials metadata.
  - Stores storage paths, access controls, and resource type.

## 14. Backend Architecture Notes

This section defines architecture considerations for a production-ready backend.

### Scalability Requirements

- Design stateless API services where possible.
- Use database indexing and query optimization to support large numbers of users, courses, and assessments.
- Support horizontal scaling for the API layer and separate stateful services for storage and caching.
- Plan for load peaks around assessment deadlines, course launches, and report generation.

### Security Requirements

- Enforce HTTPS for all frontend-backend communication.
- Store passwords securely using adaptive hashing algorithms such as bcrypt or Argon2.
- Apply strong role-based access control and validate permissions on every request.
- Sanitize and validate all incoming data to prevent injection attacks.
- Protect sensitive student and parent data according to privacy best practices and applicable regulations.
- Use secure token handling, session management, and logout invalidation.

### File / Video Storage Requirements

- Store large assets like videos and lesson files outside the application database.
- Use object storage or CDN-friendly storage such as S3, Azure Blob Storage, or equivalent.
- Store metadata in the backend for file URLs, access restrictions, and delivery controls.
- Support signed URLs or secure access tokens for protected media content.

### Performance Considerations

- Cache frequently requested data such as course catalogs, teacher profiles, and notification lists.
- Use pagination and filtering for large collections to avoid over-fetching.
- Optimize report generation and analytics queries with pre-aggregated views or background jobs.
- Keep assessment submission and grading operations responsive by separating auto-grading from heavy analytical workflows.
- Monitor backend performance and instrument key metrics such as request latency, error rates, and throughput.

---

This document is intended to guide backend development for the LMS platform and should be used by backend architects and engineers when defining data models, APIs, authentication flows, and service responsibilities.
