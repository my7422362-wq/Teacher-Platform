/**
 * BlogSection - Landing page preview of the real blog articles
 *
 * Reuses the same BLOG_POSTS data and card styling as the standalone
 * /blog page — no separate/fake content just for the home page.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { BLOG_POSTS } from '@/features/blog/data/blog-posts';
import { BlogCover } from '@/features/blog/components/blog-cover';

interface BlogSectionProps {
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

export function BlogSection({ className }: BlogSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="blog" className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="inline-flex">
            {t('blogSection.badge')}
          </Badge>
          <h2 className="text-heading font-bold text-foreground">{t('blogSection.title')}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t('blogSection.description')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              custom={0.1 * index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:border-[rgba(212,181,158,0.35)] hover:-translate-y-1"
              >
                <BlogCover id={post.id} className="aspect-video rounded-t-3xl" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="inline-flex w-fit items-center rounded-full bg-[rgba(212,181,158,0.12)] px-3 py-1 text-xs font-medium text-[#D4B59E]">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#F9F6F0] leading-snug group-hover:text-[#D4B59E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[rgba(249,246,240,0.55)] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-[rgba(249,246,240,0.45)]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {post.readMinutes} {t('blogPage.readMinutes')}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            {t('blogSection.viewAll')}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
