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

export type Project = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  details: string[];
  helloAssoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'mesanges',
    title: 'Ecole Les Mésanges',
    location: 'Abidjan (Adjamé), Côte d’Ivoire',
    description: 'Subventions de scolarité, parrainage et fournitures scolaires pour des enfants vulnérables.',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Subvention partielle (90€)',
      'Subvention totale (195€)',
      'Fournitures scolaires (55€)',
      'Objectif 2026: financer 50 enfants minimum (et plus si possible)',
      'En 2025, 20 enfants ont déjà été financés en scolarité partielle',
      'Projet à venir: soutenir la bibliothèque de l’école (apport de livres)',
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
    description: 'Un même lieu, deux missions: centre éducatif spécialisé (autisme) et centre social.',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Centre éducatif spécialisé (enfants autistes)',
      'Centre social (accueil et accompagnement)',
      'Banque de vêtements: distribution aux enfants dans le besoin',
      'Distribution aussi en maternité (mamans vulnérables)',
    ],
  },
  {
    id: 'normandie',
    title: 'Partenariat solidaire en Normandie',
    location: 'Pont-l’Évêque (Normandie), France',
    description:
      'Mobilisation d’une école en France pour collecter livres, jouets et vêtements, acheminés ensuite vers la Côte d’Ivoire.',
    image: 'https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Mars–avril 2026: École du Bon Pasteur (Pont-l’Évêque)',
      'Livres: bibliothèque de l’École Les Mésanges',
      'Vêtements: centre social de Yamoussoukro + orphelinats partenaires',
      'Une partie livres/jeux sensoriels: centre éducatif spécialisé (autisme)',
    ],
  },
  {
    id: 'bethel',
    title: 'ONG Bethel Food Internationale',
    location: 'Côte d’Ivoire',
    description:
      'Un nouvel orphelinat né de l’histoire d’une femme devenue un soutien majeur pour des centaines d’enfants.',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
    details: [
      'Accueil et accompagnement d’enfants orphelins',
      'Priorité: répondre aux besoins essentiels (vêtements, fournitures, etc.)',
    ],
  },
  {
    id: 'bouake-noel',
    title: 'Arbre de Noël solidaire',
    location: 'Bouaké, Côte d’Ivoire',
    description:
      'Participation à l’organisation d’un arbre de Noël pour 1000 enfants, une initiative que nous souhaitons reconduire chaque fin d’année.',
    image: 'https://images.unsplash.com/photo-1542315192-1f61a1796d00?q=80&w=1200&auto=format&fit=crop',
    details: ['Noël: 1000 enfants', 'Objectif: reconduire l’action chaque fin d’année'],
  },
];

export const CONTACT_INFO = {
  email: 'CœurandCare@gmail.com',
  phone: '+33 7 43 56 51 59',
  instagram: '@coeurandcare',
  facebook: '',
  address: 'France & Côte d’Ivoire',
};

// Replace with your public HelloAsso campaign URL.
const viteEnv = (import.meta as { env?: Record<string, string | undefined> }).env;
export const HELLOASSO_URL = viteEnv?.VITE_HELLOASSO_URL || 'https://www.helloasso.com';
export const SITE_URL = viteEnv?.VITE_SITE_URL || 'https://coeurandcare.org';

export type BlogCategory = 'Événements' | 'Campagnes' | 'Histoires';
export type BlogStatus = 'passé' | 'à venir';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  author: string;
  category: BlogCategory;
  status: BlogStatus;
  coverImage: string;
  instagramUrl?: string;
  contactCta?: {
    label: string;
    subject: string;
    message: string;
  };
  content: Array<
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'quote'; text: string }
  >;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'collect-and-connect-aout-2025',
    title: "Collect & Connect : notre lancement (août 2025)",
    excerpt:
      "Un pique-nique participatif, kids friendly, pour faire connaître l'association et collecter des dons. Retour sur notre tout premier Collect & Connect.",
    dateLabel: 'Août 2025',
    author: "Équipe Cœur and Care",
    category: 'Événements',
    status: 'passé',
    coverImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop',
    content: [
      { type: 'p', text: "Le lancement de Cœur and Care s’est fait autour d’un moment simple : un pique-nique participatif." },
      {
        type: 'p',
        text: "L’idée : rassembler, échanger, faire découvrir nos valeurs, et permettre à chacun de contribuer (fonds ou dons matériels) dans une ambiance chaleureuse et familiale.",
      },
      { type: 'h2', text: 'Le concept Collect & Connect' },
      {
        type: 'ul',
        items: [
          "Faire connaître l’association et rencontrer de nouvelles personnes",
          'Recolter des fonds ou des dons matériels',
          'Créer un événement kids friendly pour transmettre nos valeurs dès le plus jeune âge',
        ],
      },
      { type: 'quote', text: "Des liens réels, des actions concrètes — c’est comme ça qu’on avance." },
    ],
  },
  {
    slug: 'collect-and-connect-juin-2026',
    title: "Collect & Connect : rendez-vous en juin 2026",
    excerpt:
      "Nous préparons un nouvel événement Collect & Connect en juin 2026. Vous souhaitez participer, aider à l’organisation ou proposer un lieu ?",
    dateLabel: 'Juin 2026',
    author: "Équipe Cœur and Care",
    category: 'Événements',
    status: 'à venir',
    coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop',
    contactCta: {
      label: "Je veux m'inscrire / aider",
      subject: 'Collect & Connect — Juin 2026',
      message:
        "Bonjour Cœur and Care,\n\nJe souhaite participer au Collect & Connect de juin 2026.\n\nNom:\nVille:\nJe viens avec (adultes/enfants):\nJe peux aider sur (organisation/collecte/communication/autre):\n\nMerci !",
    },
    content: [
      { type: 'p', text: "Les événements Collect & Connect sont des moments de rencontre et de mobilisation, ouverts à tous." },
      { type: 'p', text: "En juin 2026, nous souhaitons organiser un nouveau rendez-vous pour rassembler notre communauté et soutenir nos actions." },
      { type: 'h2', text: 'Comment participer ?' },
      {
        type: 'ul',
        items: [
          "Venir à l’événement (solo, entre amis, en famille)",
          "Aider à l’organisation (logistique, accueil, animation kids)",
          "Soutenir la collecte (fonds, dons matériels, relais auprès de partenaires)",
        ],
      },
      { type: 'p', text: "Cliquez sur le bouton en bas de page pour nous écrire : on vous répond rapidement." },
    ],
  },
  {
    slug: 'histoire-malika',
    title: "Histoire d’impact : Malika et le retour à l’école",
    excerpt:
      "Malika a perdu la vue d’un œil après un accident. Nous avons pris en charge ses frais d’opticien et des lunettes pour qu’elle puisse poursuivre sa scolarité.",
    dateLabel: '2026',
    author: 'Équipe Terrain',
    category: 'Histoires',
    status: 'passé',
    coverImage: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?q=80&w=1600&auto=format&fit=crop',
    content: [
      { type: 'p', text: "Derrière chaque action, il y a une histoire. Celle de Malika nous rappelle pourquoi nous faisons tout cela." },
      {
        type: 'p',
        text: "Après un accident en jouant avec un pied de biche, Malika a perdu la vue d’un œil. Sans prise en charge, son quotidien et sa scolarité étaient menacés.",
      },
      { type: 'h2', text: 'Notre intervention' },
      { type: 'ul', items: ["Financement des frais d’opticien", 'Achat de lunettes adaptées', "Accompagnement pour qu’elle puisse continuer l’école"] },
      { type: 'quote', text: "Aider un enfant à rester sur les bancs de l’école, c’est préserver son avenir." },
    ],
  },
  {
    slug: 'arbre-de-noel-bouake',
    title: "Campagne : Arbre de Noël solidaire à Bouaké",
    excerpt:
      "À Noël, nous avons participé à l’organisation d’un arbre de Noël pour 1000 enfants à Bouaké. Une action que nous souhaitons renouveler chaque année.",
    dateLabel: 'Noël',
    author: "Équipe Cœur and Care",
    category: 'Campagnes',
    status: 'passé',
    coverImage: 'https://images.unsplash.com/photo-1543946603-0f7b0f2b0e0d?q=80&w=1600&auto=format&fit=crop',
    content: [
      { type: 'p', text: "Les fêtes de fin d’année sont un moment clé pour créer des souvenirs et redonner le sourire." },
      { type: 'p', text: "Nous avons participé à l’organisation d’un arbre de Noël pour 1000 enfants à Bouaké." },
      { type: 'h2', text: 'Et ensuite ?' },
      { type: 'p', text: "Nous souhaitons reconduire cette action à l’approche de chaque fin d’année, en lien avec nos partenaires locaux." },
    ],
  },
];
