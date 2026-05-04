import {useEffect} from 'react';

type SeoProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
};

export const Seo = ({title, description, image, url, type = 'website'}: SeoProps) => {
  useEffect(() => {
    const fullTitle = `${title} | Cœur and Care`;
    document.title = fullTitle;

    const upsertMeta = (selector: string, key: 'name' | 'property', value: string) => {
      let tag = document.querySelector(`meta[${key}="${selector}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(key, selector);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    const upsertLink = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    upsertMeta('description', 'name', description);
    upsertMeta('og:title', 'property', fullTitle);
    upsertMeta('og:description', 'property', description);
    upsertMeta('og:type', 'property', type);
    upsertMeta('twitter:card', 'name', image ? 'summary_large_image' : 'summary');
    upsertMeta('twitter:title', 'name', fullTitle);
    upsertMeta('twitter:description', 'name', description);

    if (url) {
      upsertMeta('og:url', 'property', url);
      upsertLink('canonical', url);
    }

    if (image) {
      upsertMeta('og:image', 'property', image);
      upsertMeta('twitter:image', 'name', image);
    }
  }, [description, image, title, type, url]);

  return null;
};
