import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Instagram } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useAppStore } from '../store';

export const BlogPost = () => {
  const { slug } = useParams();
  const { blogPosts } = useAppStore();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-24 min-h-screen">
        <section className="section-container">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-brown mb-6">Article introuvable</h1>
            <p className="text-brand-brown/60 mb-10">Cet article n’existe pas (ou a été déplacé).</p>
            <Link to="/blog" className="btn-primary inline-flex gap-2 items-center">
              <ArrowLeft size={18} /> Retour au blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const contactHref =
    post.contactCta
      ? `/contact?subject=${encodeURIComponent(post.contactCta.subject)}&message=${encodeURIComponent(post.contactCta.message)}`
      : null;

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            onClick={() => trackEvent('blog_back_to_list', { slug: post.slug })}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-brown/60 hover:text-brand-terracotta transition-colors"
          >
            <ArrowLeft size={14} /> Retour au blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-terracotta">{post.category}</span>
              <span className={`text-[10px] uppercase tracking-widest font-bold ${post.status === 'à venir' ? 'text-brand-ochre' : 'text-brand-brown/40'}`}>
                {post.status}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif text-brand-brown leading-tight mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-brand-brown/40 mb-10">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {post.dateLabel}
              </span>
              <span className="flex items-center gap-2">
                <User size={14} /> {post.author}
              </span>
              {post.instagramUrl ? (
                <a
                  href={post.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('blog_open_instagram', { slug: post.slug })}
                  className="inline-flex items-center gap-2 text-brand-terracotta hover:text-brand-brown transition-colors"
                >
                  <Instagram size={14} /> Voir sur Instagram
                </a>
              ) : null}
            </div>

            <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-brown mb-12">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-95" />
            </div>

            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-brown prose-p:text-brand-brown/80 prose-li:text-brand-brown/80">
              {post.content.map((block, idx) => {
                if (block.type === 'h2') return <h2 key={idx}>{block.text}</h2>;
                if (block.type === 'p') return <p key={idx}>{block.text}</p>;
                if (block.type === 'ul')
                  return (
                    <ul key={idx}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  );
                if (block.type === 'quote')
                  return (
                    <blockquote key={idx}>
                      <p>{block.text}</p>
                    </blockquote>
                  );
                return null;
              })}
            </article>

            {contactHref ? (
              <div className="mt-16 bg-brand-brown text-white p-10 md:p-14 rounded-[3rem] text-center shadow-2xl">
                <h2 className="text-2xl md:text-4xl font-serif mb-4">Envie de participer ?</h2>
                <p className="text-white/60 mb-10 max-w-2xl mx-auto">
                  Écrivez-nous en deux clics. Le message est pré-rempli, vous pouvez bien sûr le modifier.
                </p>
                <Link
                  to={contactHref}
                  onClick={() => trackEvent('blog_contact_cta', { slug: post.slug })}
                  className="inline-flex btn-primary bg-brand-terracotta hover:bg-brand-ochre"
                >
                  {post.contactCta?.label}
                </Link>
              </div>
            ) : null}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

