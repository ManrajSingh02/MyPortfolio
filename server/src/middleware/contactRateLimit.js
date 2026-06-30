const requests = new Map();
const windowMs = 15 * 60 * 1000;
const maxRequests = 5;

export const contactRateLimit = (request, response, next) => {
  const key = request.ip || 'unknown';
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < windowMs);

  if (recent.length >= maxRequests) {
    return response.status(429).json({ message: 'Too many messages. Please try again later.' });
  }

  recent.push(now);
  requests.set(key, recent);
  return next();
};
