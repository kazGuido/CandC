import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data';
import { trackEvent } from '../lib/analytics';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  const visibleLinks = NAV_LINKS.slice(0, 4);
  const hiddenLinks = NAV_LINKS.slice(4);

  return (
    <nav className={`glass-nav transition-all duration-300 ${scrolled ? 'py-3 shadow-sm' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-terracotta rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Heart size={18} fill="currentColor" />
          </div>
          <span className="text-lg md:text-xl font-bold font-serif tracking-tight text-brand-brown whitespace-nowrap">
            Cœur <span className="text-brand-terracotta">and</span> Care
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {visibleLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-[13px] font-bold uppercase tracking-[0.5px] transition-colors ${
                location.pathname === link.href ? 'text-brand-terracotta' : 'hover:text-brand-terracotta'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Dropdown Menu */}
          <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className="text-[13px] font-bold uppercase tracking-[0.5px] hover:text-brand-terracotta transition-colors flex items-center gap-1 cursor-pointer">
              Plus <Menu size={14} />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl p-4 border border-brand-terracotta/5 z-50"
                >
                  {hiddenLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block py-3 text-[12px] font-bold uppercase tracking-wider transition-colors border-b border-brand-terracotta/5 last:border-0 ${
                        location.pathname === link.href ? 'text-brand-terracotta' : 'hover:text-brand-terracotta'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/soutenir" onClick={() => trackEvent('donation_page_open', {source: 'nav_desktop'})} className="btn-primary py-2 px-6 ml-4">
            Faire un don
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-brown p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream border-b border-brand-terracotta/10 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-base font-bold uppercase tracking-widest ${
                    location.pathname === link.href ? 'text-brand-terracotta' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/soutenir" onClick={() => trackEvent('donation_page_open', {source: 'nav_mobile'})} className="btn-primary">
                Faire un don
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
