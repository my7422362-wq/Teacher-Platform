export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  level: string;
  language: string;
  price: number;
  oldPrice?: number;
  currency: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  hoursCount: number;
  lastUpdated: string;
  badge?: string;
  bannerGradient: string;
  teacher: TeacherInfo;
  previewVideo: PreviewVideo;
  learningObjectives: LearningObjective[];
  curriculum: CurriculumUnit[];
  features: FeatureItem[];
  reviews: ReviewItem[];
  faq: FAQItem[];
  statistics: CourseStatistics;
}

export interface TeacherInfo {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  yearsOfExperience: number;
  studentsCount: number;
  coursesCount: number;
  rating: number;
  achievements: string[];
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PreviewVideo {
  url: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface LearningObjective {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface CurriculumUnit {
  id: number;
  title: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumLesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  isFree: boolean;
  isLocked: boolean;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ReviewItem {
  id: number;
  studentName: string;
  studentAvatar: string;
  grade: string;
  rating: number;
  content: string;
  date: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface CourseStatistics {
  totalStudents: number;
  totalLessons: number;
  totalHours: number;
  totalQuizzes: number;
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileSupport: boolean;
  desktopSupport: boolean;
  freeUpdates: boolean;
}

