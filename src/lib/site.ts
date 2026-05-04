import { SITE_URL } from '../data';

const FALLBACK_SITE_URL = SITE_URL;

export const getSiteUrl = () => {
  const configured = (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return FALLBACK_SITE_URL;
};

export const toAbsoluteUrl = (pathOrUrl: string) => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, `${getSiteUrl()}/`).toString();
};
