const redisClient = require('../config/redis');

const slidingWindowRateLimiter = async (req, res, next) => {
  const { apiKey } = req.headers;

  if (!apiKey) {
    return res.status(400).json({ message: 'API key is required' });
  }

  const limit = 200;
  const windowSize = 60 * 1000;

  const currentTime = Date.now();
  const windowStart = currentTime - windowSize;

  try {
    await redisClient.zAdd(apiKey, { score: currentTime, value: currentTime.toString() });

    await redisClient.zRemRangeByScore(apiKey, '-inf', windowStart);

    const requestCount = await redisClient.zCount(apiKey, windowStart, currentTime);

    if (requestCount > limit) {
      return res.status(429).json({ message: 'Too many requests' });
    }

    next();
  } catch (err) {
    console.error('Error during rate limiting:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = slidingWindowRateLimiter;
