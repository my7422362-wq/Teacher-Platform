import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12" dir="rtl">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md space-y-6"
      >
        <div className="text-center flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2">نظام إدارة التعلم</h1>
          <p className="text-sm text-muted-foreground">
            منصة تعليمية متكاملة للمعلم والطالب
          </p>
        </div>

        {/* Glassmorphic card */}
        <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-xl backdrop-blur-md">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}


