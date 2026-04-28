type Entry = {
  count: number;
  resetAt: number;
};

const requests = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

export const getClientIp = (req: any) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
};

export const isRateLimited = (key: string) => {
  const now = Date.now();
  const current = requests.get(key);

  if (!current || current.resetAt < now) {
    requests.set(key, {count: 1, resetAt: now + WINDOW_MS});
    return false;
  }

  current.count += 1;
  requests.set(key, current);
  return current.count > MAX_REQUESTS;
};
