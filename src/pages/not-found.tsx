import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">الصفحة غير موجودة</p>
      <Link to="/" className="mt-8">
        <Button>العودة للرئيسية</Button>
      </Link>
    </div>
  );
}

