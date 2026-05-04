import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE_NAME = 'Cœur and Care';
const DEFAULT_DESCRIPTION = 'Association Cœur and Care.';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop';
const SITE_URL = (process.env.VITE_SITE_URL || 'https://coeurandcare.org').replace(/\/$/, '');

const routeMeta = new Map([
  ['/', { title: 'Accueil', description: 'Association Cœur and Care: education, nutrition et accompagnement en Côte d’Ivoire.' }],
  ['/projets', { title: 'Nos Projets', description: 'Decouvrez les projets de terrain portes par Cœur and Care.' }],
  ['/blog', { title: 'Blog', description: "Actualites et retours d'impact de l'association Cœur and Care." }],
  ['/a-propos', { title: 'Qui sommes-nous', description: 'Mission, valeurs et histoire de Cœur and Care.' }],
  ['/soutenir', { title: 'Nous soutenir', description: 'Contribuez aux actions de Cœur and Care via don, benevolat ou parrainage.' }],
  ['/contact', { title: 'Contact', description: "Contactez l'equipe Cœur and Care." }],
  ['/mentions-legales', { title: 'Mentions legales', description: 'Informations legales de Cœur and Care.' }],
  ['/confidentialite', { title: 'Confidentialite', description: 'Politique de confidentialite de Cœur and Care.' }],
]);

const rootDir = resolve(process.cwd());
const distDir = resolve(rootDir, 'dist');
const indexHtmlPath = resolve(distDir, 'index.html');
const routesJsonPath = resolve(rootDir, 'scripts', 'prerender-routes.json');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const toAbsolute = (pathOrUrl) => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, `${SITE_URL}/`).toString();
};

const injectMeta = (html, meta) => {
  const fullTitle = `${meta.title} | ${SITE_NAME}`;
  const canonical = toAbsolute(meta.path);
  const image = toAbsolute(meta.image || FALLBACK_IMAGE);
  const cardType = meta.image ? 'summary_large_image' : 'summary';
  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description || DEFAULT_DESCRIPTION)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description || DEFAULT_DESCRIPTION)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.type || 'website')}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="${escapeHtml(cardType)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description || DEFAULT_DESCRIPTION)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join('\n    ');

  return html.replace(/<title>[\s\S]*?<\/title>/i, tags);
};

const staticRoutes = Array.from(routeMeta.keys());
const staticRouteSet = new Set(staticRoutes);

const getMetaForRoute = (route, routeEntries) => {
  const fromEntries = routeEntries.find((entry) => entry.path === route);
  if (fromEntries) {
    return {
      path: route,
      title: fromEntries.title,
      description: fromEntries.description,
      image: fromEntries.image,
      type: fromEntries.type,
    };
  }
  const predefined = routeMeta.get(route);
  return {
    path: route,
    title: predefined?.title || SITE_NAME,
    description: predefined?.description || DEFAULT_DESCRIPTION,
  };
};

const run = async () => {
  const htmlTemplate = await readFile(indexHtmlPath, 'utf8');
  let routeEntries = [];
  try {
    routeEntries = JSON.parse(await readFile(routesJsonPath, 'utf8'));
  } catch {
    routeEntries = [];
  }
  const dynamicRoutes = routeEntries.map((entry) => entry.path);
  const filteredDynamicRoutes = dynamicRoutes.filter((route) => !staticRouteSet.has(route));
  const allRoutes = [...staticRoutes, ...filteredDynamicRoutes];

  for (const route of allRoutes) {
    const routeDir = route === '/' ? distDir : resolve(distDir, route.slice(1));
    await mkdir(routeDir, { recursive: true });
    const routeHtml = injectMeta(htmlTemplate, getMetaForRoute(route, routeEntries));
    await writeFile(resolve(routeDir, 'index.html'), routeHtml, 'utf8');
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
