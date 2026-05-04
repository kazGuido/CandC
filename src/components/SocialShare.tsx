import { Facebook, Link2, MessageCircle, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { trackEvent } from '../lib/analytics';

type SocialShareProps = {
  url: string;
  title: string;
  text?: string;
  className?: string;
  trackingId: string;
};

export const SocialShare = ({ url, title, text, className, trackingId }: SocialShareProps) => {
  const [copyLabel, setCopyLabel] = useState('Copier le lien');
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
  const encodedText = useMemo(() => encodeURIComponent(text || title), [text, title]);

  const whatsappHref = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const onCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setCopyLabel('Impossible de copier');
      window.setTimeout(() => setCopyLabel('Copier le lien'), 2200);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel('Lien copie');
      trackEvent('share_copy_link', { source: trackingId });
      window.setTimeout(() => setCopyLabel('Copier le lien'), 2200);
    } catch {
      setCopyLabel('Impossible de copier');
      window.setTimeout(() => setCopyLabel('Copier le lien'), 2200);
    }
  };

  const onNativeShare = async () => {
    if (!canNativeShare) {
      return;
    }
    try {
      await navigator.share({ title, text, url });
      trackEvent('share_native', { source: trackingId });
    } catch {
      // Share cancellation should stay silent.
    }
  };

  return (
    <div className={className}>
      <p className="text-[11px] uppercase tracking-widest font-bold text-brand-brown/40 mb-3">Partager</p>
      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare ? (
          <button
            type="button"
            onClick={onNativeShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-terracotta/15 text-xs font-bold uppercase tracking-wider hover:border-brand-terracotta/35 transition-colors"
          >
            <Share2 size={13} />
            Partager
          </button>
        ) : null}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('share_whatsapp', { source: trackingId })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-terracotta/15 text-xs font-bold uppercase tracking-wider hover:border-brand-terracotta/35 transition-colors"
        >
          <MessageCircle size={13} />
          WhatsApp
        </a>
        <a
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('share_facebook', { source: trackingId })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-terracotta/15 text-xs font-bold uppercase tracking-wider hover:border-brand-terracotta/35 transition-colors"
        >
          <Facebook size={13} />
          Facebook
        </a>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-terracotta/15 text-xs font-bold uppercase tracking-wider hover:border-brand-terracotta/35 transition-colors"
        >
          <Link2 size={13} />
          {copyLabel}
        </button>
      </div>
    </div>
  );
};
