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
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Privacy } from './pages/Privacy';
import { Seo } from './components/Seo';

const routeSeo: Record<string, {title: string; description: string}> = {
  '/': {
    title: 'Accueil',
    description: 'Association Cœur and Care: education, nutrition et accompagnement en Côte d’Ivoire.',
  },
  '/projets': {
    title: 'Nos Projets',
    description: 'Decouvrez les projets de terrain portes par Cœur and Care.',
  },
  '/blog': {
    title: 'Blog',
    description: "Actualites et retours d'impact de l'association Cœur and Care.",
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
  const seo = routeSeo[location.pathname] ?? {
    title: 'Cœur and Care',
    description: 'Association Cœur and Care.',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={seo.title} description={seo.description} />
      <Navigation />
      <main className="flex-grow bg-brand-cream">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/soutenir" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/confidentialite" element={<Privacy />} />
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
