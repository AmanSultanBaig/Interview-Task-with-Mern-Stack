const express = require('express');
const router = express.Router();
const { evaluateFlags } = require('../controllers/flagsController');

router.get('/flags', (req, res) => {
  const { user, region } = req.query;

  if (!user || !region) {
    return res.status(400).send({ message: 'User and region are required' });
  }

  const flags = evaluateFlags(user, region);
  res.json(flags);
});

module.exports = router;