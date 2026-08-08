import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getBlogPostBySlug } from '@/features/blog/data/blog-posts';
import { BlogCover } from '@/features/blog/components/blog-cover';

export function BlogPostPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 mb-6 rounded-3xl bg-[rgba(212,181,158,0.12)] flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-[#D4B59E]" />
        </div>
        <h1 className="text-3xl font-bold text-[#F9F6F0] mb-3">{t('blogPage.notFoundTitle')}</h1>
        <p className="text-[rgba(249,246,240,0.55)] mb-8 max-w-md">{t('blogPage.notFoundDescription')}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4B59E] text-[#0F2520] font-semibold hover:bg-[#C7A187] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('blogPage.backToBlog')}
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-16 sm:pb-20">
      <BlogCover id={post.id} className="h-56 sm:h-72" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto -mt-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#16342D] border border-[rgba(212,181,158,0.15)] p-6 sm:p-10 shadow-lg"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[rgba(249,246,240,0.55)] hover:text-[#D4B59E] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blogPage.backToBlog')}
            </Link>

            <span className="inline-flex items-center rounded-full bg-[rgba(212,181,158,0.12)] px-3 py-1 text-xs font-medium text-[#D4B59E] mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#F9F6F0] leading-tight mb-4">{post.title}</h1>

            <div className="flex items-center gap-1.5 text-sm text-[rgba(249,246,240,0.45)] mb-8">
              <Clock className="h-4 w-4" />
              <span>
                {post.readMinutes} {t('blogPage.readMinutes')}
              </span>
            </div>

            <div className="space-y-6">
              {post.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-xl font-semibold text-[#D4B59E] mb-2">{section.heading}</h2>
                  )}
                  <p className="text-[rgba(249,246,240,0.75)] leading-loose">{section.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
