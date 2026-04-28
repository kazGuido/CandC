type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const trackEvent = (event: string, payload: AnalyticsPayload = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const eventData = {
    event,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  // Helpful in environments where analytics tooling is not wired yet.
  if (import.meta.env.DEV) {
    console.info('[analytics]', eventData);
  }
};
