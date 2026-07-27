/**
 * FeaturedCourses - Featured courses grid section
 *
 * Displays featured courses in a responsive grid.
 * Each course uses Card with Badge, and the component accepts courses via props.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import type { Course } from '@/types';

interface FeaturedCoursesProps {
  courses: Course[];
  isLoading?: boolean;
  className?: string;
}

const levelColors: Record<Course['level'], string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

const levelLabels: Record<Course['level'], string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

export function FeaturedCourses({ courses, isLoading, className }: FeaturedCoursesProps) {
  if (isLoading) {
    return (
      <section className={cn('py-16 sm:py-20 lg:py-24', className)} dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-5 w-72 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!courses.length) {
    return (
      <section className={cn('py-16 sm:py-20 lg:py-24', className)} dir="rtl">
        <div className="container mx-auto px-4">
          <EmptyState
            title="لا توجد دورات حالياً"
            description="سيتم إضافة دورات جديدة قريباً. تابعنا لتصلك أحدث التحديثات."
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-courses"
      className={cn('py-16 sm:py-20 lg:py-24 bg-muted/30', className)}
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="inline-flex">
            الدورات المميزة
          </Badge>
          <h2 className="text-heading font-bold text-foreground">
            اختر الدورة المناسبة لك
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            دورات مصممة بعناية لتأخذك من المبتدئ إلى الاحتراف
          </p>
        </motion.div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/courses/${course.id}`} className="group block h-full">
                <Card className="h-full transition-shadow duration-200 group-hover:shadow-md">
                  {/* Thumbnail placeholder */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge className={levelColors[course.level]}>
                        {levelLabels[course.level]}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {course.studentsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-500" />
                        {course.rating}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <p className="font-bold text-primary">
                      {course.price === 0
                        ? 'مجاناً'
                        : `${course.price} ${course.currency}`}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link to="/courses">
            <Button variant="outline" size="lg">
              عرض جميع الدورات
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

