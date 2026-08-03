import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Avatar } from '@/components/ui';
import { Camera } from 'lucide-react';
import { useAuth } from '@/providers';
import { createAccountSchema, type AccountFormValues } from './schemas';

export function TeacherAccountForm() {
  const { t } = useTranslation();
  const { currentUser, updateProfile } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => createAccountSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentUser?.name ?? '',
      phone: currentUser?.phone ?? '',
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

  const onSubmit = async (values: AccountFormValues) => {
    setSubmitting(true);
    try {
      await updateProfile({ ...values, avatar });
      toast.success(t('teacherPages.settings.toast.accountUpdated'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('teacherPages.settings.toast.accountUpdateFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('teacherPages.settings.accountTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
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
                {t('teacherPages.settings.changePhoto')}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.settings.fields.name')}</label>
            <Input error={errors.name?.message} {...register('name')} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#F9F6F0]">{t('teacherPages.settings.fields.phone')}</label>
            <Input type="tel" error={errors.phone?.message} {...register('phone')} />
          </div>

          <Button type="submit" loading={submitting} className="bg-[#D4B59E] text-[#0F2520] hover:bg-[#C7A187]">
            {t('teacherPages.settings.saveChanges')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
