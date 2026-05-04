import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { BLOG_POSTS, PROJECTS } from '../src/data';

const entries = [
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    type: 'article',
  })),
  ...PROJECTS.map((project) => ({
    path: `/projets/${project.id}`,
    title: project.title,
    description: project.description,
    image: project.image,
    type: 'article',
  })),
];

const outputPath = resolve(process.cwd(), 'scripts', 'prerender-routes.json');
await writeFile(outputPath, JSON.stringify(entries, null, 2), 'utf8');
