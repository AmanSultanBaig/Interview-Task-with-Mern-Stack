const handleRateLimitedRequest = (req, res) => {
  res.status(200).json({ message: 'Request successful' });
};

module.exports = {
  handleRateLimitedRequest,
};
