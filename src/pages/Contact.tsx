import { motion } from 'motion/react';
import { Mail, Phone, Instagram, MapPin, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export const Contact = () => {
  return (
    <div className="pt-24 min-h-screen">
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-overline mx-auto">NOUS ÉCRIRE</span>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 text-brand-brown leading-tight">Parlons <br/> <span className="text-brand-terracotta italic">ensemble</span>.</h1>
          <p className="text-brand-brown/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Une question, une idée de projet ou simplement l'envie de discuter ? Notre équipe vous répond sous 48h.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <a href={`mailto:${CONTACT_INFO.email}`} className="group p-8 bg-white border border-brand-terracotta/5 rounded-[2.5rem] hover:border-brand-terracotta/20 transition-all shadow-sm flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-terracotta group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-1">E-mail</p>
                  <p className="text-brand-brown font-medium break-all">{CONTACT_INFO.email}</p>
                </div>
              </a>

              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="group p-8 bg-white border border-brand-terracotta/5 rounded-[2.5rem] hover:border-brand-terracotta/20 transition-all shadow-sm flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-terracotta group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-1">Téléphone</p>
                  <p className="text-brand-brown font-medium">{CONTACT_INFO.phone}</p>
                </div>
              </a>

              <div className="p-8 bg-white border border-brand-terracotta/5 rounded-[2.5rem] shadow-sm flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-terracotta">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-1">Siège Social</p>
                  <p className="text-brand-brown font-medium">Côte d'Ivoire & Diaspora</p>
                </div>
              </div>
            </div>

            <a href={`https://instagram.com/${CONTACT_INFO.instagram.substring(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-8 bg-brand-brown text-white rounded-[2.5rem] shadow-xl group overflow-hidden relative">
               <div className="relative z-10 flex items-center gap-4">
                 <Instagram size={32} className="text-brand-ochre" />
                 <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Suivez notre quotidien</p>
                   <p className="text-xl font-serif">Instagram {CONTACT_INFO.instagram}</p>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/20 rounded-full blur-3xl -mr-16 -mt-16" />
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <form className="bg-white p-8 md:p-12 rounded-[3rem] border border-brand-terracotta/5 shadow-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 ml-1">Prénom & Nom</label>
                  <input type="text" className="w-full bg-brand-cream/30 border-transparent border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta focus:bg-white transition-all" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 ml-1">Email</label>
                  <input type="email" className="w-full bg-brand-cream/30 border-transparent border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta focus:bg-white transition-all" placeholder="jean@exemple.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 ml-1">Sujet</label>
                <input type="text" className="w-full bg-brand-cream/30 border-transparent border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta focus:bg-white transition-all" placeholder="Comment pouvons-nous vous aider ?" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 ml-1">Message</label>
                <textarea rows={5} className="w-full bg-brand-cream/30 border-transparent border-2 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-terracotta focus:bg-white transition-all resize-none" placeholder="Votre message détaillé..."></textarea>
              </div>
              <button className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 group">
                Envoyer le message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
