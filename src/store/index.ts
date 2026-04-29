import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost, Project, BLOG_POSTS, PROJECTS, HELLOASSO_URL } from '../data';

interface AppState {
  projects: Project[];
  blogPosts: BlogPost[];
  helloAssoUrl: string;
  addProject: (p: Project) => void;
  updateProject: (id: string, update: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addBlogPost: (b: BlogPost) => void;
  updateBlogPost: (slug: string, update: Partial<BlogPost>) => void;
  removeBlogPost: (slug: string) => void;
  setHelloAssoUrl: (url: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: PROJECTS,
      blogPosts: BLOG_POSTS,
      helloAssoUrl: HELLOASSO_URL,
      addProject: (p) => set((state) => ({ projects: [...state.projects, p] })),
      updateProject: (id, update) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...update } : p)
      })),
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
      addBlogPost: (b) => set((state) => ({ blogPosts: [...state.blogPosts, b] })),
      updateBlogPost: (slug, update) => set((state) => ({
        blogPosts: state.blogPosts.map((b) => b.slug === slug ? { ...b, ...update } : b)
      })),
      removeBlogPost: (slug) => set((state) => ({
        blogPosts: state.blogPosts.filter(b => b.slug !== slug)
      })),
      setHelloAssoUrl: (url) => set({ helloAssoUrl: url }),
    }),
    {
      name: 'coeur-and-care-storage',
    }
  )
);
