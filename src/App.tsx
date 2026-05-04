/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Privacy } from './pages/Privacy';
import { Admin } from './pages/Admin';
import { Seo } from './components/Seo';
import { BLOG_POSTS, PROJECTS } from './data';
import { toAbsoluteUrl } from './lib/site';

const routeSeo: Record<string, {title: string; description: string}> = {
  '/': {
    title: 'Accueil',
    description: 'Association Cœur and Care: education, nutrition et accompagnement en Côte d’Ivoire.',
  },
  '/projets': {
    title: 'Nos Projets',
    description: 'Decouvrez les projets de terrain portes par Cœur and Care.',
  },
  '/projets/:id': {
    title: 'Projet',
    description: 'Decouvrez un projet soutenu par Cœur and Care.',
  },
  '/blog': {
    title: 'Blog',
    description: "Actualites et retours d'impact de l'association Cœur and Care.",
  },
  '/blog/:slug': {
    title: 'Blog',
    description: "Article du blog Cœur and Care.",
  },
  '/a-propos': {
    title: 'Qui sommes-nous',
    description: 'Mission, valeurs et histoire de Cœur and Care.',
  },
  '/soutenir': {
    title: 'Nous soutenir',
    description: 'Contribuez aux actions de Cœur and Care via don, benevolat ou parrainage.',
  },
  '/contact': {
    title: 'Contact',
    description: "Contactez l'equipe Cœur and Care.",
  },
};

const AppContent = () => {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, '') || '/';
  const canonicalUrl = toAbsoluteUrl(normalizedPath);

  let seo =
    routeSeo[normalizedPath] ?? {
      title: 'Cœur and Care',
      description: 'Association Cœur and Care.',
    };
  let image: string | undefined;
  let type: 'website' | 'article' = 'website';
  if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.slice('/blog/'.length);
    const post = BLOG_POSTS.find((item) => item.slug === slug);
    if (post) {
      seo = { title: post.title, description: post.excerpt };
      image = post.coverImage;
      type = 'article';
    } else {
      seo = routeSeo['/blog/:slug'];
      type = 'article';
    }
  } else if (normalizedPath.startsWith('/projets/') && normalizedPath !== '/projets') {
    const projectId = normalizedPath.slice('/projets/'.length);
    const project = PROJECTS.find((item) => item.id === projectId);
    if (project) {
      seo = { title: project.title, description: project.description };
      image = project.image;
      type = 'article';
    } else {
      seo = routeSeo['/projets/:id'];
      image = PROJECTS[0]?.image;
    }
  } else if (normalizedPath === '/projets') {
    image = PROJECTS[0]?.image;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={seo.title} description={seo.description} image={image} url={canonicalUrl} type={type} />
      <Navigation />
      <main className="flex-grow bg-brand-cream">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/projets/:projectId" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/soutenir" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
