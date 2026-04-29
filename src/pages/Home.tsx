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
import { ACTIONS } from '../data';
import { trackEvent } from '../lib/analytics';
import { useTranslation, Trans } from 'react-i18next';
import { useAppStore } from '../store';

const IconMap: Record<string, any> = {
  GraduationCap,
  Apple,
  Users,
  HeartHandshake,
};

export const Home = () => {
  const { t } = useTranslation();
  const { helloAssoUrl } = useAppStore();
  
  return (
    <>
      {/* Hero Section */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop" 
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
              {t('home.hero.overline')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-brand-brown mb-8 leading-[1] md:leading-[0.95] text-balance tracking-[-0.02em]">
              <Trans i18nKey="home.hero.title">
                Une main <span className="text-brand-terracotta">tendue</span>, <br className="hidden md:block" /> 
                un cœur ouvert, <br className="hidden md:block" /> 
                un avenir changé.
              </Trans>
            </h1>
            <p className="max-w-xl mx-auto text-base md:text-xl text-brand-brown/70 mb-12 leading-relaxed italic border-l-4 border-brand-terracotta/20 pl-6 text-left h-[2.5em] md:h-[1.5em]">
              <Typewriter text={t('home.hero.quote')} />
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/soutenir" className="btn-primary w-full sm:w-auto gap-2">
                {t('home.hero.donateBtn')} <ArrowRight size={18} />
              </Link>
              <Link to="/a-propos" className="btn-outline w-full sm:w-auto">
                {t('home.hero.aboutBtn')}
              </Link>
            </div>
            <a
              href={helloAssoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('donate_click', {source: 'home_hero'})}
              className="inline-flex mt-5 text-xs uppercase tracking-wider font-bold text-brand-terracotta hover:text-brand-brown"
            >
              {t('home.hero.helloAsso')}
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
            <span className="text-overline">{t('home.mission.overline')}</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">{t('home.mission.title')}</h2>
            <div className="space-y-6 text-brand-brown/80 leading-relaxed">
              <p>
                <strong>Cœur and Care</strong> {t('home.mission.desc').replace('Cœur and Care ', '')}
              </p>
              <Link to="/a-propos" className="inline-flex items-center gap-2 text-brand-terracotta font-bold uppercase tracking-wider text-xs">
                {t('home.mission.link')} <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-video bg-brand-cream rounded-3xl overflow-hidden shadow-xl">
               <img 
                src="https://images.unsplash.com/photo-1520697222865-7c0e5f2c9c86?q=80&w=1000&auto=format&fit=crop" 
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
          <span className="text-overline mx-auto">{t('home.axis.overline')}</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">{t('home.axis.title')}</h2>
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
          <span className="text-overline text-brand-ochre mx-auto">{t('home.projectsCta.overline')}</span>
          <h2 className="text-3xl md:text-6xl font-serif mb-8 leading-tight">
            <Trans i18nKey="home.projectsCta.title">Découvrez nos actions <br/> sur le terrain</Trans>
          </h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto mb-12">
            {t('home.projectsCta.desc')}
          </p>
          <Link to="/projets" className="btn-primary bg-brand-ochre hover:bg-white hover:text-brand-brown">
            {t('home.projectsCta.btn')}
          </Link>
        </div>
      </section>

      {/* Quick stats / Transparency */}
      <section className="section-container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <p className="text-4xl md:text-5xl font-serif font-bold text-brand-terracotta mb-2">100%</p>
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">{t('home.stats.transparency')}</p>
          </div>
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <Globe size={40} className="mx-auto text-brand-terracotta mb-4" />
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">{t('home.stats.actions')}</p>
          </div>
          <div className="bg-brand-cream/30 p-10 rounded-3xl text-center">
            <HandHeart size={40} className="mx-auto text-brand-terracotta mb-4" />
            <p className="text-xs uppercase font-bold tracking-widest opacity-60">{t('home.stats.volunteers')}</p>
          </div>
        </div>
      </section>
    </>
  );
};
