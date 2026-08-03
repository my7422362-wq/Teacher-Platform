import { useTranslation } from 'react-i18next';

export function CoursesPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{t('coursesPage.title')}</h1>
      <p className="mt-4 text-muted-foreground">
        {t('coursesPage.description')}
      </p>
    </div>
  );
}
