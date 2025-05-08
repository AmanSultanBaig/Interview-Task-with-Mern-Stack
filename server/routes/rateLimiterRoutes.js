const express = require('express');
const { handleRateLimitedRequest } = require('../controllers/rateLimiterController');
const slidingWindowRateLimiter = require('../middlewares/rateLimiterMiddleware');

const router = express.Router();

router.get('/resource', slidingWindowRateLimiter, handleRateLimitedRequest);

module.exports = router;
