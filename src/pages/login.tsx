import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>تسجيل الدخول</CardTitle>
        <CardDescription>أدخل بيانات حسابك للدخول إلى المنصة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">البريد الإلكتروني</label>
          <Input type="email" placeholder="example@email.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">كلمة المرور</label>
          <Input type="password" placeholder="********" />
        </div>
        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            نسيت كلمة المرور؟
          </Link>
        </div>
        <Button className="w-full">تسجيل الدخول</Button>
        <p className="text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="text-primary hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

