import {useEffect} from 'react';

type SeoProps = {
  title: string;
  description: string;
};

export const Seo = ({title, description}: SeoProps) => {
  useEffect(() => {
    document.title = `${title} | Cœur and Care`;

    const upsertMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    upsertMeta('description', description);
  }, [description, title]);

  return null;
};
