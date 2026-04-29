import { motion } from 'motion/react';
import { HandHeart, Target, Eye, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-overline">NOTRE HISTOIRE</span>
            <h1 className="text-4xl md:text-7xl font-serif mb-8 text-brand-brown leading-tight">
              Un engagement <br/> <span className="text-brand-terracotta italic">profond</span> pour l'Afrique.
            </h1>
            <div className="space-y-6 text-brand-brown/80 text-lg leading-relaxed">
              <p>
                <strong>Cœur and Care</strong> est une association à but non lucratif qui agit en faveur des enfants et des mamans vulnérables en Afrique, plus précisément en Côte d’Ivoire.
              </p>
              <p>
                Fondée en août 2025, notre initiative est le fruit de réflexions et d’actions individuelles menées depuis 2024. Nous croyons fermement que chaque enfant et chaque femme mérite un accompagnement digne, quel que soit son point de départ.
              </p>
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-square bg-brand-cream rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=1000&auto=format&fit=crop" 
                alt="Enfants souriants" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-ochre/20 rounded-full blur-[80px]" />
          </div>
        </div>

        {/* Values / Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <div className="p-12 bg-white rounded-[2.5rem] border border-brand-terracotta/5 shadow-sm">
            <Target className="text-brand-terracotta mb-6" size={40} />
            <h3 className="text-2xl font-serif font-bold mb-4">Notre Mission</h3>
            <p className="text-brand-brown/70 leading-relaxed">
              Défendre les droits des enfants à l'éducation, à la santé et au bien-être, tout en soutenant l'autonomisation des mères.
            </p>
          </div>
          <div className="p-12 bg-brand-brown text-brand-cream rounded-[2.5rem] shadow-xl">
            <Eye className="text-brand-ochre mb-6" size={40} />
            <h3 className="text-2xl font-serif font-bold mb-4">Notre Vision</h3>
            <p className="text-brand-cream/70 leading-relaxed">
              Devenir un acteur clé de la solidarité entre la diaspora et les communautés locales pour un impact durable et mesurable.
            </p>
          </div>
          <div className="p-12 bg-white rounded-[2.5rem] border border-brand-terracotta/5 shadow-sm">
            <Heart className="text-brand-terracotta mb-6" size={40} />
            <h3 className="text-2xl font-serif font-bold mb-4">Nos Valeurs</h3>
            <p className="text-brand-brown/70 leading-relaxed">
              Transparence, dignité, inclusion et amour. Nous agissons avec le cœur, mais avec une rigueur professionnelle.
            </p>
          </div>
        </div>

        {/* Quote / Founders */}
        <div className="bg-brand-cream/30 rounded-[3rem] p-12 md:p-24 text-center">
          <HandHeart size={60} className="mx-auto text-brand-terracotta/40 mb-8" />
          <p className="text-2xl md:text-4xl font-serif text-brand-brown italic leading-tight mb-12 max-w-4xl mx-auto">
            "Nous ne pouvons pas changer le monde entier, mais nous pouvons changer le monde entier d'un enfant."
          </p>
          <div className="h-px w-20 bg-brand-terracotta mx-auto mb-8" />
          <p className="text-xs uppercase font-bold tracking-[3px] text-brand-brown/60">L'équipe Cœur and Care</p>
        </div>
      </section>
    </div>
  );
};
