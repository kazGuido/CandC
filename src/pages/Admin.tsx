import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Project, BlogPost, BlogCategory, BlogStatus } from '../data';
import { Plus, Trash, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export const Admin = () => {
  const { 
    projects, addProject, removeProject, 
    blogPosts, addBlogPost, removeBlogPost,
    helloAssoUrl, setHelloAssoUrl 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'settings'>('projects');

  return (
    <div className="pt-32 pb-20 section-container min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-serif text-brand-brown">Administration</h1>
      </div>

      <div className="flex gap-4 mb-8 border-b border-brand-terracotta/20 pb-4">
        <button 
          className={`font-bold uppercase tracking-wider text-sm ${activeTab === 'projects' ? 'text-brand-terracotta' : 'text-brand-brown/50 hover:text-brand-brown'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projets ({projects.length})
        </button>
        <button 
          className={`font-bold uppercase tracking-wider text-sm ${activeTab === 'blog' ? 'text-brand-terracotta' : 'text-brand-brown/50 hover:text-brand-brown'}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog ({blogPosts.length})
        </button>
        <button 
          className={`font-bold uppercase tracking-wider text-sm ${activeTab === 'settings' ? 'text-brand-terracotta' : 'text-brand-brown/50 hover:text-brand-brown'}`}
          onClick={() => setActiveTab('settings')}
        >
          Paramètres
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-brand-terracotta/10 shadow-sm">
        {activeTab === 'projects' && <ProjectsAdmin projects={projects} addProject={addProject} removeProject={removeProject} />}
        {activeTab === 'blog' && <BlogAdmin blogPosts={blogPosts} addBlogPost={addBlogPost} removeBlogPost={removeBlogPost} />}
        {activeTab === 'settings' && (
          <div className="max-w-xl">
            <h2 className="text-xl font-serif mb-6">Lien Global HelloAsso</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-brown/70 mb-2 uppercase tracking-wide">URL de don HelloAsso</label>
                <input 
                  type="url" 
                  value={helloAssoUrl}
                  onChange={(e) => setHelloAssoUrl(e.target.value)}
                  className="w-full p-3 bg-brand-cream/50 rounded-xl border border-brand-terracotta/20 focus:outline-none focus:border-brand-terracotta transition-colors" 
                  placeholder="https://www.helloasso.com/..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ================= PROJECTS ADMIN =================
const ProjectsAdmin = ({ projects, addProject, removeProject }: { projects: Project[], addProject: (p: Project) => void, removeProject: (id: string) => void }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const detailsText = formData.get('details') as string;
    const details = detailsText.split('\n').filter(d => d.trim());
    
    addProject({
      id: formData.get('id') as string || `project-${Date.now()}`,
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80',
      helloAssoUrl: formData.get('helloAssoUrl') as string || undefined,
      details,
    });
    setIsAdding(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Gestion des Projets</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary py-2 px-4 flex items-center gap-2">
          {isAdding ? 'Annuler' : <><Plus size={16}/> Ajouter un projet</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-10 bg-brand-cream/30 p-6 rounded-2xl space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="title" required placeholder="Titre du projet" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            <input name="location" required placeholder="Lieu (ex: Abidjan)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            <input name="id" placeholder="ID unique (optionnel)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            <input name="image" placeholder="URL de l'image (Unsplash)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            <div className="col-span-full">
              <input name="helloAssoUrl" placeholder="Lien HelloAsso Spécifique à ce projet (optionnel)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            </div>
            <div className="col-span-full">
              <textarea name="description" required placeholder="Description courte (1-2 phrases)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" rows={2} />
            </div>
            <div className="col-span-full">
              <textarea name="details" required placeholder="Détails (un point par ligne)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" rows={4} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Enregistrer le projet</button>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-brand-cream/10 rounded-xl border border-brand-terracotta/10">
            <div className="flex items-center gap-4">
              {p.image && <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />}
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm text-brand-brown/60">{p.location}</p>
                {p.helloAssoUrl && <span className="text-xs bg-brand-terracotta/10 text-brand-terracotta px-2 py-1 rounded inline-block mt-1">Lien HelloAsso personnalisé</span>}
              </div>
            </div>
            <button onClick={() => removeProject(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================= BLOG ADMIN =================
const BlogAdmin = ({ blogPosts, addBlogPost, removeBlogPost }: { blogPosts: BlogPost[], addBlogPost: (b: BlogPost) => void, removeBlogPost: (s: string) => void }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contentText = formData.get('content') as string;
    const contentParagraphs = contentText.split('\n\n').filter(c => c.trim());
    
    const content: BlogPost['content'] = contentParagraphs.map(p => ({
      type: 'p',
      text: p.trim()
    }));

    addBlogPost({
      slug: (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      dateLabel: formData.get('dateLabel') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as BlogCategory,
      status: formData.get('status') as BlogStatus,
      coverImage: formData.get('coverImage') as string || 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80',
      content,
    });
    setIsAdding(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif">Gestion du Blog / Actus</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="btn-primary py-2 px-4 flex items-center gap-2">
          {isAdding ? 'Annuler' : <><Plus size={16}/> Ajouter un article</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-10 bg-brand-cream/30 p-6 rounded-2xl space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="title" required placeholder="Titre de l'article" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            <input name="dateLabel" required placeholder="Date visible (ex: Août 2025)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            
            <select name="category" required className="p-3 rounded-xl border border-brand-terracotta/20 w-full bg-white">
              <option value="Événements">Événements</option>
              <option value="Campagnes">Campagnes</option>
              <option value="Histoires">Histoires</option>
            </select>
            
            <select name="status" required className="p-3 rounded-xl border border-brand-terracotta/20 w-full bg-white">
              <option value="passé">Passé</option>
              <option value="à venir">À venir</option>
            </select>
            
            <input name="author" required placeholder="Auteur (ex: Équipe Cœur and Care)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" defaultValue="Équipe Cœur and Care" />
            <input name="coverImage" placeholder="URL Image de couverture" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" />
            
            <div className="col-span-full">
              <textarea name="excerpt" required placeholder="Résumé (3-4 lignes max)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" rows={3} />
            </div>
            <div className="col-span-full">
              <textarea name="content" required placeholder="Contenu de l'article (Double saut de ligne pour créer de nouveaux paragraphes)" className="p-3 rounded-xl border border-brand-terracotta/20 w-full" rows={8} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Publier l'article</button>
        </form>
      )}

      <div className="grid gap-4">
        {blogPosts.map(b => (
          <div key={b.slug} className="flex items-center justify-between p-4 bg-brand-cream/10 rounded-xl border border-brand-terracotta/10">
            <div className="flex items-center gap-4">
              {b.coverImage && <img src={b.coverImage} alt={b.title} className="w-16 h-16 rounded-lg object-cover" />}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-terracotta/10 text-brand-terracotta px-2 py-0.5 rounded">
                    {b.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${b.status === 'à venir' ? 'bg-brand-ochre/20 text-brand-ochre' : 'bg-gray-100 text-gray-500'}`}>
                    {b.status}
                  </span>
                </div>
                <h3 className="font-bold">{b.title}</h3>
                <p className="text-sm text-brand-brown/60">{b.dateLabel}</p>
              </div>
            </div>
            <button onClick={() => removeBlogPost(b.slug)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
