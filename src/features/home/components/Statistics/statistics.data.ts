/**
 * Statistics section data
 *
 * Premium statistics data for the landing page.
 */

import { Users, GraduationCap, Award, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StatisticsItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  title: string;
  description: string;
}

export const STATISTICS_DATA: StatisticsItem[] = [
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    title: 'طالب وطالبة',
    description: 'انضموا إلى منصتنا',
  },
  {
    icon: GraduationCap,
    value: 100,
    suffix: '+',
    title: 'دورة تعليمية',
    description: 'في مختلف المراحل',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    title: 'سنوات خبرة',
    description: 'في مجال التدريس',
  },
  {
    icon: TrendingUp,
    value: 95,
    suffix: '%',
    title: 'نسبة النجاح',
    description: 'في الاختبارات',
  },
];

