import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>إنشاء حساب جديد</CardTitle>
        <CardDescription>أدخل بياناتك لإنشاء حساب جديد على المنصة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">الاسم الكامل</label>
          <Input placeholder="الاسم الكامل" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">البريد الإلكتروني</label>
          <Input type="email" placeholder="example@email.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">كلمة المرور</label>
          <Input type="password" placeholder="********" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">تأكيد كلمة المرور</label>
          <Input type="password" placeholder="********" />
        </div>
        <Button className="w-full">إنشاء حساب</Button>
        <p className="text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

