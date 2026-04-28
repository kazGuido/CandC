/**
 * Official content for Cœur and Care derived from the organization's PDF.
 */

export const NAV_LINKS = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos Projets', href: '/projets' },
  { name: 'Blog', href: '/blog' },
  { name: 'Qui sommes-nous', href: '/a-propos' },
  { name: 'Nous soutenir', href: '/soutenir' },
  { name: 'Contact', href: '/contact' },
];

export const ACTIONS = [
  {
    id: 1,
    title: 'Éducation',
    description: 'Soutien et parrainage pour la scolarité d’enfants défavorisés, fournitures scolaires.',
    icon: 'GraduationCap',
  },
  {
    id: 2,
    title: 'Nutrition',
    description: 'Financement de repas et apport de vivres aux cantines scolaires.',
    icon: 'Apple',
  },
  {
    id: 3,
    title: 'Inclusion sociale',
    description: 'Centre d’éducation spécialisé pour enfants souffrant de handicap et autisme.',
    icon: 'Users',
  },
  {
    id: 4,
    title: 'Accompagnement',
    description: 'Aide aux mères vulnérables par des kits alimentaires et des soutiens concrets.',
    icon: 'HeartHandshake',
  },
];

export const PROJECTS = [
  {
    id: 'mesanges',
    title: 'Ecole Les Mésanges',
    location: 'Adjamé, Côte d’Ivoire',
    description: 'Subvention de scolarité, parrainage et fournitures scolaires.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Subvention partielle (75€)',
      'Parrainage total (180€)',
      'Fournitures scolaires (55€)',
    ],
  },
  {
    id: 'padre-pio',
    title: 'Orphelinat Padre Pio',
    location: 'Bonoua, Côte d’Ivoire',
    description: 'Dons de vêtements, jouets et livres pour les orphelins.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    details: ['Une voix pour Padre Pio', 'Collectes régulières de produits de nécessité'],
  },
  {
    id: 'yamoussoukro',
    title: 'Complexe socio-éducatif',
    location: 'Yamoussoukro, Côte d’Ivoire',
    description: 'Éducation spécialisée pour autisme et handicap, centre social.',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Centre d’éducation spécialisé',
      'Lutte contre les violences conjugales',
      'Soutien aux mamans vulnérables',
    ],
  },
];

export const CONTACT_INFO = {
  email: 'CœurandCare@gmail.com',
  phone: '+33 7 43 56 51 59',
  instagram: '@coeurandcare',
  address: 'Côte d’Ivoire & Diaspora',
};

// Replace with your public HelloAsso campaign URL.
export const HELLOASSO_URL = import.meta.env.VITE_HELLOASSO_URL || 'https://www.helloasso.com';
