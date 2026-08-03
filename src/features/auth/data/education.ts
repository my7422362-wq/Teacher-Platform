/**
 * `value` is the stable, stored identifier (used for registered accounts and
 * unaffected by language changes). `labelKey` is the translation key shown
 * in the UI. Both must stay in sync between locale files.
 */
export interface EducationOption {
  value: string;
  labelKey: string;
}

export const GRADE_OPTIONS = [
  { value: 'prep_1', labelKey: 'auth.grades.prep1' },
  { value: 'prep_2', labelKey: 'auth.grades.prep2' },
  { value: 'prep_3', labelKey: 'auth.grades.prep3' },
  { value: 'secondary_1', labelKey: 'auth.grades.secondary1' },
  { value: 'secondary_2', labelKey: 'auth.grades.secondary2' },
  { value: 'secondary_3', labelKey: 'auth.grades.secondary3' },
];

const GOVERNORATE_NAMES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'الشرقية',
  'المنوفية',
  'القليوبية',
  'البحيرة',
  'الغربية',
  'بورسعيد',
  'دمياط',
  'الإسماعيلية',
  'السويس',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
];

export const GOVERNORATE_OPTIONS: EducationOption[] = GOVERNORATE_NAMES.map((name) => ({
  value: name,
  labelKey: `auth.governorates.${name}`,
}));
