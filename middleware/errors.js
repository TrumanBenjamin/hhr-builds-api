exports.notFound = (req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
};

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: err.message || 'Server error',
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
};