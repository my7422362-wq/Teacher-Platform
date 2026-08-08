import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BLOG_POSTS } from '@/features/blog/data/blog-posts';
import { BlogCover } from '@/features/blog/components/blog-cover';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
};

export function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F9F6F0]">{t('blogPage.title')}</h1>
        <p className="mt-4 text-[rgba(249,246,240,0.55)] leading-relaxed">{t('blogPage.description')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {BLOG_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            custom={0.08 * index}
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
                <h2 className="text-lg font-semibold text-[#F9F6F0] leading-snug group-hover:text-[#D4B59E] transition-colors">
                  {post.title}
                </h2>
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
    </div>
  );
}
