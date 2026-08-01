import { useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Button, Input, Select, Avatar, type SelectOption } from '@/components/ui';
import { Camera } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { GRADE_OPTIONS } from '@/features/auth/data/education';
import { createProfileInfoSchema, type ProfileInfoFormValues } from './schemas';

export function ProfileInfoForm() {
  const { t } = useTranslation();
  const { currentUser, updateProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => createProfileInfoSchema(t), [t]);
  const gradeOptions: SelectOption[] = useMemo(
    () => GRADE_OPTIONS.map((opt) => ({ value: opt.value, label: t(opt.labelKey) })),
    [t]
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInfoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentUser?.name ?? '',
      grade: currentUser?.grade ?? '',
    },
  });

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  const onSubmit = async (values: ProfileInfoFormValues) => {
    setSubmitting(true);
    try {
      await updateProfile({ ...values, avatar });
      toast.success(t('studentPages.profile.toast.updateSuccess'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('studentPages.profile.toast.updateFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="flex items-center gap-4">
            <Avatar src={avatar} alt={currentUser?.name} size="xl" />
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <Button type="button" variant="outline" size="sm" onClick={handlePhotoClick}>
                <Camera className="h-4 w-4" />
                {t('studentPages.profile.changePhoto')}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">
              {t('studentPages.profile.nameLabel')}
            </label>
            <Input error={errors.name?.message} {...register('name')} />
          </div>

          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <Select
                label={t('auth.register.grade')}
                placeholder={t('auth.register.gradePlaceholder')}
                options={gradeOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.grade?.message}
              />
            )}
          />

          <Button
            type="submit"
            loading={submitting}
            className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]"
          >
            {t('studentPages.profile.saveChanges')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
