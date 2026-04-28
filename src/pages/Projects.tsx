import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Link } from 'react-router-dom';

export const Projects = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-cream/20">
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-overline mx-auto">SUR LE TERRAIN</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-brand-brown">Nos Projets</h1>
          <p className="text-brand-brown/60 max-w-2xl mx-auto text-lg leading-relaxed italic">
            "Chaque enfant mérite une chance, chaque maman mérite un socle. Voici comment nous bâtissons cet avenir aujourd'hui."
          </p>
        </div>

        <div className="grid gap-16 md:gap-32">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-12 gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[16/10] bg-brand-brown rounded-3xl overflow-hidden shadow-2xl relative group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-brown shadow-lg">
                    <MapPin size={12} className="text-brand-terracotta" /> {project.location}
                  </div>
                </div>
              </div>
              
              <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-brand-brown leading-tight">{project.title}</h2>
                <p className="text-lg text-brand-brown/70 mb-8 italic leading-relaxed">
                  "{project.description}"
                </p>
                
                <div className="space-y-4 mb-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-terracotta">Impact & Objectifs :</p>
                  <ul className="space-y-3">
                    {project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-brand-brown/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0 mt-2" />
                        <span className="text-sm font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/soutenir" className="btn-primary w-full sm:w-auto inline-flex justify-center">
                  Soutenir ce projet
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-brand-brown text-brand-cream py-20 mt-32">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Vous avez un projet en tête ?</h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto mb-10">
            Nous sommes toujours à l'écoute de nouvelles idées pour avoir un impact encore plus grand.
          </p>
          <Link to="/contact" className="btn-outline border-brand-ochre text-brand-ochre hover:bg-brand-ochre hover:text-brand-brown">
            Parlons-en <ArrowRight size={18} className="ml-2 inline" />
          </Link>
        </div>
      </section>
    </div>
  );
};
