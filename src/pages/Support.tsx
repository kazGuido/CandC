import { motion } from 'motion/react';
import { Heart, CreditCard, Users, Handshake, Gift, Package } from 'lucide-react';

const SUPPORT_METHODS = [
  {
    title: "Dons Financiers",
    description: "Financez directement nos actions sur le terrain. 100% de votre don est réinvesti.",
    icon: CreditCard,
    cta: "Faire un don via HelloAsso"
  },
  {
    title: "Bénévolat",
    description: "Donnez de votre temps et de vos compétences pour nous aider à grandir.",
    icon: Users,
    cta: "Devenir bénévole"
  },
  {
    title: "Collecte de matériel",
    description: "Fournitures scolaires, vêtements, jouets : vos objets ont une seconde vie utile.",
    icon: Package,
    cta: "Organiser une collecte"
  },
  {
    title: "Parrainage",
    description: "Accompagnez personnellement un enfant dans sa scolarité sur le long terme.",
    icon: Handshake,
    cta: "En savoir plus"
  }
];

export const Support = () => {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-overline mx-auto">S'ENGAGER</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-brand-brown">Nous Soutenir</h1>
          <p className="text-brand-brown/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Votre générosité est le moteur de notre action. Découvrez les différentes façons de contribuer à notre mission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {SUPPORT_METHODS.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 md:p-12 bg-white rounded-[3rem] border border-brand-terracotta/5 hover:border-brand-terracotta/20 transition-all shadow-sm hover:shadow-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-terracotta mb-8 group-hover:scale-110 transition-transform">
                <method.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{method.title}</h3>
              <p className="text-brand-brown/70 leading-relaxed mb-8">
                {method.description}
              </p>
              <button className="text-sm font-bold uppercase tracking-widest text-brand-terracotta flex items-center gap-2 hover:gap-4 transition-all">
                {method.cta} <Gift size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* HelloAsso Integration Placeholder */}
        <div className="bg-brand-brown text-white p-12 md:p-24 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <Heart size={60} className="mx-auto text-brand-ochre mb-8 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-serif mb-8">Espace Donateur Sécurisé</h2>
            <p className="text-white/60 mb-12 max-w-xl mx-auto">
              Utilisez notre plateforme partenaire HelloAsso pour effectuer vos dons en toute sécurité. Un reçu fiscal vous sera envoyé par mail.
            </p>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-brand-terracotta hover:bg-brand-ochre text-white font-bold px-12 py-5 rounded-2xl transition-all text-sm uppercase tracking-widest"
            >
              Accéder au formulaire de don
            </a>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-terracotta/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-ochre/10 rounded-full blur-[100px] -ml-32 -mb-32" />
        </div>
      </section>
    </div>
  );
};
