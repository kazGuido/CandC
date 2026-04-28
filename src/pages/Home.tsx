import { motion } from 'motion/react';
import { 
  ArrowRight, 
  GraduationCap, 
  Apple, 
  Users, 
  HeartHandshake, 
  HandHeart, 
  Globe, 
  MapPin,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from '../components/Typewriter';
import { ACTIONS, HELLOASSO_URL, PROJECTS } from '../data';
import { trackEvent } from '../lib/analytics';

const IconMap: Record<string, any> = {
  GraduationCap,
  Apple,
  Users,
  HeartHandshake,
};

export const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/50 via-brand-cream to-brand-cream" />
        </div>

        <div className="section-container relative z-10 text-center px-4 md:px-12 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-overline">
              CÔTE D’IVOIRE • ADJAMÉ • BONOUA • YAMOUSSOUKRO
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-brand-brown mb-8 leading-[1] md:leading-[0.95] text-balance tracking-[-0.02em]">
              Une main <span className="text-brand-terracotta">tendue</span>, <br className="hidden md:block" /> 
              un cœur ouvert, <br className="hidden md:block" /> 
              un avenir changé.
            </h1>
            <p className="max-w-xl mx-auto text-base md:text-xl text-brand-brown/70 mb-12 leading-relaxed italic border-l-4 border-brand-terracotta/20 pl-6 md:text-left h-[1.5em]">
              <Typewriter text='"Pour elle, pour eux, pour demain"' />
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/soutenir" className="btn-primary w-full sm:w-auto gap-2">
                Nous soutenir <ArrowRight size={18} />
              </Link>
              <Link to="/a-propos" className="btn-outline w-full sm:w-auto">
                En savoir plus
              </Link>
            </div>
            <a
              href={HELLOASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('donate_click', {source: 'home_hero'})}
              className="inline-flex mt-5 text-xs uppercase tracking-wider font-bold text-brand-terracotta hover:text-brand-brown"
            >
              Faire un don direct via HelloAsso
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mission Highlights */}
      <section className="bg-white py-20">
        <div className="section-container grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-overline">NOTRE IMPACT</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Agir ensemble pour demain</h2>
            <div className="space-y-6 text-brand-brown/80 leading-relaxed">
              <p>
                <strong>Cœur and Care</strong> mobilise la solidarité pour offrir un accompagnement digne aux enfants et aux mamans vulnérables.
              </p>
              <Link to="/a-propos" className="inline-flex items-center gap-2 text-brand-terracotta font-bold uppercase tracking-wider text-xs">
                Découvrir notre histoire <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-video bg-brand-cream rounded-3xl overflow-hidden shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop" 
                alt="Action" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Axis Section Preview */}
      <section className="section-container">
        <div className="text-center mb-16">
          <span className="text-overline mx-auto">NOS DOMAINES</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Nos axes d’action</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIONS.slice(0, 4).map((action, index) => {
            const Icon = IconMap[action.icon];
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-brand-terracotta/5 hover:border-brand-terracotta/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-terracotta mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-serif font-bold mb-3">{action.title}</h3>
                <p className="text-brand-brown/70 text-sm leading-relaxed">
                  {action.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Projects CTA */}
      <section className="bg-brand-brown text-brand-cream py-24 overflow-hidden">
        <div className="section-container text-center">
          <span className="text-overline text-brand-ochre mx-auto">NOS PROJETS</span>
          <h2 className="text-3xl md:text-6xl font-serif mb-8 leading-tight">Découvrez nos actions <br/> sur le terrain</h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto mb-12">
            De l'école Les Mésanges à l'orphelinat Padre Pio, découvrez comment vos dons transforment des vies.
          </p>
          <Link to="/projets" className="btn-primary bg-brand-ochre hover:bg-white hover:text-brand-brown">
            Voir tous les projets
          </Link>
        </div>
      </section>

      {/* Quick stats / Transparency */}
      <section className="section-container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-terracotta mb-2">100%</p>
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">Transparence financière</p>
          </div>
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <Globe size={40} className="mx-auto text-brand-terracotta mb-4" />
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">Impact à Adjamé, Bonoua & Yamoussoukro</p>
          </div>
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <HandHeart size={40} className="mx-auto text-brand-terracotta mb-4" />
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">Plus de 20 bénévoles engagés</p>
          </div>
        </div>
      </section>
    </>
  );
};
