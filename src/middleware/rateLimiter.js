const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

module.exports = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const timestamps = hits.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  next();
};
