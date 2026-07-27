import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          منصة التعلم الذكية
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          منصة تعليمية متكاملة تساعد المعلم والطالب على تحقيق أقصى استفادة من العملية التعليمية
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">تصفح الدورات</Button>
          <Button size="lg" variant="outline">
            معرفة المزيد
          </Button>
        </div>
      </section>
    </div>
  );
}

