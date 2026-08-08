/**
 * TrialBookingSection - Free trial lesson request
 *
 * There's no backend endpoint to receive bookings yet, so submitting opens
 * a pre-filled WhatsApp chat to the real contact number instead of
 * pretending to submit somewhere that doesn't exist.
 */

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { TFunction } from 'i18next';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, Button, Input, Select } from '@/components/ui';
import { GRADE_OPTIONS } from '@/features/auth/data/education';
import { CONTACT_CONTENT } from '@/features/home/data';

interface TrialBookingSectionProps {
  className?: string;
}

const EGYPT_PHONE_REGEX = /^01[0125][0-9]{8}$/;

function createTrialBookingSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(3, t('auth.validation.nameRequired')),
    phone: z
      .string()
      .trim()
      .min(1, t('auth.validation.phoneRequired'))
      .regex(EGYPT_PHONE_REGEX, t('auth.validation.phoneInvalid')),
    grade: z.string().min(1, t('auth.validation.gradeRequired')),
  });
}

type TrialBookingValues = z.infer<ReturnType<typeof createTrialBookingSchema>>;

export function TrialBookingSection({ className }: TrialBookingSectionProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createTrialBookingSchema(t), [t]);
  const gradeOptions = useMemo(
    () => GRADE_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) })),
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TrialBookingValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', grade: '' },
  });

  const onSubmit = (values: TrialBookingValues) => {
    const gradeLabel = gradeOptions.find((g) => g.value === values.grade)?.label ?? values.grade;
    const message = t('trialBooking.whatsappMessage', {
      name: values.name,
      phone: values.phone,
      grade: gradeLabel,
    });
    const url = `${CONTACT_CONTENT.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(t('trialBooking.toastSuccess'));
    reset();
  };

  return (
    <section className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="inline-flex">
              {t('trialBooking.badge')}
            </Badge>
            <h2 className="text-heading font-bold text-foreground">{t('trialBooking.title')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{t('trialBooking.description')}</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 rounded-2xl border bg-card p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('trialBooking.nameLabel')}</label>
                <Input
                  placeholder={t('trialBooking.namePlaceholder')}
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('trialBooking.phoneLabel')}</label>
                <Input
                  type="tel"
                  placeholder="01012345678"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
            </div>

            <Controller
              control={control}
              name="grade"
              render={({ field }) => (
                <Select
                  label={t('trialBooking.gradeLabel')}
                  placeholder={t('auth.register.gradePlaceholder')}
                  options={gradeOptions}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.grade?.message}
                />
              )}
            />

            <Button type="submit" size="lg" className="w-full gap-2">
              <CalendarCheck className="h-4 w-4" />
              {t('trialBooking.submit')}
            </Button>

            <p className="text-center text-xs text-muted-foreground">{t('trialBooking.disclaimer')}</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
