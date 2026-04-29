import { motion } from 'motion/react';
import { FormEvent, useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCategory, BlogStatus } from '../data';
import { trackEvent } from '../lib/analytics';
import { useAppStore } from '../store';

export const Blog = () => {
  const { blogPosts } = useAppStore();
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [category, setCategory] = useState<BlogCategory | 'Tous'>('Tous');
  const [status, setStatus] = useState<BlogStatus | 'Tous'>('Tous');

  const categories: Array<BlogCategory | 'Tous'> = ['Tous', 'Événements', 'Campagnes', 'Histoires'];
  const statuses: Array<BlogStatus | 'Tous'> = ['Tous', 'à venir', 'passé'];

  const posts = blogPosts.filter((p) => {
    const categoryOk = category === 'Tous' ? true : p.category === category;
    const statusOk = status === 'Tous' ? true : p.status === status;
    return categoryOk && statusOk;
  });

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus('idle');
    setNewsletterMessage('');
    setNewsletterSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get('email') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
    };

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "Inscription indisponible pour l'instant.");
      }
      event.currentTarget.reset();
      setNewsletterStatus('success');
      setNewsletterMessage('Merci. Votre demande est bien enregistree.');
      trackEvent('newsletter_submit_success');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(
        error instanceof Error ? error.message : "Une erreur est survenue, merci de reessayer."
      );
      trackEvent('newsletter_submit_error');
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-overline mx-auto">ACTUALITÉS</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-brand-brown">Le Blog</h1>
          <p className="text-brand-brown/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Événements, campagnes et histoires d’impact : suivez nos aventures et nos victoires sur le terrain.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
                  category === c
                    ? 'bg-brand-brown text-white border-brand-brown'
                    : 'bg-white text-brand-brown/70 border-brand-terracotta/10 hover:border-brand-terracotta/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
                  status === s
                    ? 'bg-brand-terracotta text-white border-brand-terracotta'
                    : 'bg-white text-brand-brown/70 border-brand-terracotta/10 hover:border-brand-terracotta/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-terracotta/5 hover:border-brand-terracotta/10 hover:shadow-2xl transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-terracotta">
                    {post.category}
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${post.status === 'à venir' ? 'text-brand-ochre' : 'text-brand-brown/40'}`}>
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-brand-brown/40 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.dateLabel}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4 group-hover:text-brand-terracotta transition-colors">
                  {post.title}
                </h2>
                <p className="text-brand-brown/70 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  onClick={() => trackEvent('blog_open_post', { slug: post.slug })}
                  className="flex items-center gap-2 text-brand-terracotta font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                >
                  Lire la suite <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter shortcut */}
        <div className="mt-32 bg-brand-cream/50 rounded-[3rem] p-12 md:p-20 text-center">
          <h2 className="text-3xl font-serif mb-6">Ne manquez aucune nouvelle</h2>
          <p className="text-brand-brown/60 mb-10 max-w-md mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos rapports d'impact directement dans votre boîte mail.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              name="email"
              required
              placeholder="votre@email.com" 
              className="flex-1 bg-white border border-brand-terracotta/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta transition-colors"
            />
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <button type="submit" disabled={newsletterSubmitting} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
              {newsletterSubmitting ? 'Envoi...' : "S'inscrire"}
            </button>
          </form>
          {newsletterStatus !== 'idle' && (
            <p className={`mt-4 text-sm ${newsletterStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {newsletterMessage}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
