import { Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export const Footer = () => {
  return (
    <footer className="py-12 md:py-20 bg-brand-cream border-t border-brand-terracotta/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-terracotta rounded-full flex items-center justify-center text-white">
              <Heart size={16} fill="currentColor" />
            </div>
            <span className="text-xl md:text-2xl font-bold font-serif tracking-tight text-brand-brown">
              Cœur <span className="text-brand-terracotta">and</span> Care
            </span>
          </div>
          <div className="hidden md:block w-px h-6 bg-brand-terracotta/20" />
          <p className="text-[9px] md:text-[11px] font-bold text-brand-brown/50 uppercase tracking-[2px]">
            © 2026 Cœur and Care — Association Loi 1901
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-12 gap-y-6 text-[9px] md:text-[11px] font-bold uppercase tracking-[1px] text-brand-brown/40 border-t border-brand-terracotta/5 pt-8">
          <a href="#" className="hover:text-brand-terracotta transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-brand-terracotta transition-colors">Confidentialité</a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-terracotta transition-colors lowercase tracking-normal">{CONTACT_INFO.email}</a>
          <p className="text-brand-brown/60 tracking-normal">{CONTACT_INFO.phone}</p>
        </div>
      </div>
    </footer>
  );
};
