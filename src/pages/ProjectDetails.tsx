import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { useAppStore } from '../store';
import { SocialShare } from '../components/SocialShare';
import { toAbsoluteUrl } from '../lib/site';

export const ProjectDetails = () => {
  const { projectId } = useParams();
  const { projects, helloAssoUrl } = useAppStore();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="pt-24 min-h-screen">
        <section className="section-container">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-brown mb-6">Projet introuvable</h1>
            <p className="text-brand-brown/60 mb-10">Ce projet n’existe pas (ou a été déplacé).</p>
            <Link to="/projets" className="btn-primary inline-flex gap-2 items-center">
              <ArrowLeft size={18} /> Retour aux projets
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const donateUrl =
    project.helloAssoUrl || `${helloAssoUrl}?utm_source=site&utm_medium=project&utm_campaign=${project.id}`;
  const projectUrl = toAbsoluteUrl(`/projets/${project.id}`);

  return (
    <div className="pt-24 min-h-screen bg-brand-cream/20">
      <section className="section-container">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/projets"
            onClick={() => trackEvent('project_back_to_list', { projectId: project.id })}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-brown/60 hover:text-brand-terracotta transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux projets
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-brand-brown leading-tight mb-6">{project.title}</h1>
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-brown/40 mb-10">
              <MapPin size={14} /> {project.location}
            </p>

            <SocialShare
              url={projectUrl}
              title={project.title}
              text={project.description}
              trackingId={`project_details_${project.id}`}
              className="mb-10"
            />

            <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-brown mb-12">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-95" />
            </div>

            <p className="text-brand-brown/80 text-lg leading-relaxed mb-10">{project.description}</p>
            <div className="space-y-4 mb-12">
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

            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('donate_click', { source: `project_details_${project.id}` })}
              className="btn-primary inline-flex justify-center"
            >
              Soutenir ce projet
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
