export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: number | null;
  coursesCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  categoryId?: number;
  categoryName?: string;
  tags: string[];
  teacherId: number;
  teacherName: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  isFree: boolean;
  isPublished: boolean;
  videoFileName?: string;
  pdfFileName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: number;
  lessonId: number;
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
  size: number;
  format: string;
  createdAt: string;
}

export interface Resource {
  id: number;
  lessonId: number;
  title: string;
  type: 'pdf' | 'doc' | 'link' | 'archive' | 'other';
  url: string;
  size?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: number;
  courseId: number;
  lessonId: number;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  questionsCount: number;
  questions: Question[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  quizId: number;
  text: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options: string[];
  correctAnswer: string | string[];
  points: number;
  order: number;
}

export interface Answer {
  id: number;
  questionId: number;
  userId: number;
  quizSubmissionId: number;
  selectedOption?: string;
  selectedOptions?: string[];
  textResponse?: string;
  isCorrect?: boolean;
  pointsEarned?: number;
  createdAt: string;
}

export interface QuizSubmission {
  id: number;
  quizId: number;
  userId: number;
  attemptNumber: number;
  score: number;
  totalScore: number;
  status: 'graded';
  submittedAt: string;
}

export interface ExamQuestion {
  id: number;
  examId: number;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options: string[];
  correctAnswer: string;
  points: number;
  order: number;
}

/**
 * Exams are a distinct entity from Quiz: a single attempt only, only
 * takeable within a fixed [startDate, endDate] window.
 */
export interface Exam {
  id: number;
  courseId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  totalScore: number;
  passingScore: number;
  questionsCount: number;
  questions: ExamQuestion[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExamAttempt {
  id: number;
  examId: number;
  userId: number;
  score: number;
  totalScore: number;
  status: 'graded';
  submittedAt: string;
}

export interface RevisionMaterial {
  id: number;
  courseId: number;
  title: string;
  description: string;
  type: 'summary' | 'video' | 'flashcards';
  url: string;
  createdAt: string;
}

export interface Assignment {
  id: number;
  courseId: number;
  lessonId: number;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  passingScore: number;
  attachments: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Submission {
  id: number;
  assignmentId: number;
  userId: number;
  studentName?: string;
  assignmentTitle?: string;
  submissionText?: string;
  attachments: string[];
  score?: number;
  feedback?: string;
  gradedBy?: number;
  status: 'pending' | 'graded' | 'late';
  submittedAt: string;
  gradedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  studentName: string;
  completionDate: string;
  grade: string;
  certificateUrl: string;
  certificateCode: string;
  issuedAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface Progress {
  id: number;
  userId: number;
  courseId: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  percentComplete: number;
  lastAccessedAt: string;
  isCompleted: boolean;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
  status: 'pending' | 'approved' | 'rejected';
  transactionReference?: string;
  receiptUrl?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Installment {
  id: number;
  studentId: number;
  courseId: number;
  installmentNumber: number;
  totalInstallments: number;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'paid' | 'pending';
  paidAt?: string;
  paymentMethod?: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
}

export interface GroupScheduleSlot {
  day: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  startTime: string;
  endTime: string;
}

export interface Group {
  id: number;
  name: string;
  courseId: number;
  teacherId: number;
  studentIds: number[];
  schedule: GroupScheduleSlot[];
  createdAt: string;
}

export interface AttendanceRecord {
  id: number;
  groupId: number;
  studentId: number;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Parent {
  id: number;
  name: string;
  relationship: 'father' | 'mother' | 'guardian';
  email: string;
  phone: string;
  studentId: number;
  createdAt: string;
}

export interface CommunicationLogEntry {
  id: number;
  parentId: number;
  teacherId: number;
  channel: 'call' | 'whatsapp' | 'email' | 'meeting';
  summary: string;
  date: string;
}

export interface StudentNote {
  id: number;
  studentId: number;
  teacherId: number;
  text: string;
  createdAt: string;
}

/** Matches Laravel's real paginator envelope — {data, links, meta}, snake_case meta. */
export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string | null;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}


