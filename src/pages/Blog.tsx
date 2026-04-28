import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_POSTS = [
  {
    id: 1,
    title: "Le lancement officiel de l'association",
    excerpt: "Retour sur la création de Cœur and Care en août 2025 et nos premières ambitions.",
    date: "15 Octobre 2025",
    author: "Bureau National",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Campagne de rentrée scolaire à Adjamé",
    excerpt: "Grâce à vos dons, 50 enfants ont pu reprendre le chemin de l'école avec des fournitures complètes.",
    date: "02 Septembre 2025",
    author: "Équipe Terrain",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Soutenir l'autisme en Côte d'Ivoire",
    excerpt: "Comprendre les enjeux de l'inclusion sociale pour les enfants souffrant de handicap.",
    date: "20 Août 2025",
    author: "Dr. Koné",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
  }
];

export const Blog = () => {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-overline mx-auto">ACTUALITÉS</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-brand-brown">Le Blog</h1>
          <p className="text-brand-brown/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Suivez nos aventures, nos défis et nos victoires sur le terrain. 
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-terracotta/5 hover:border-brand-terracotta/10 hover:shadow-2xl transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-brand-brown/40 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-brand-brown mb-4 group-hover:text-brand-terracotta transition-colors">
                  {post.title}
                </h2>
                <p className="text-brand-brown/70 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-brand-terracotta font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                  Lire la suite <ArrowRight size={14} />
                </button>
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
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="flex-1 bg-white border border-brand-terracotta/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta transition-colors"
            />
            <button className="btn-primary">S'inscrire</button>
          </form>
        </div>
      </section>
    </div>
  );
};
