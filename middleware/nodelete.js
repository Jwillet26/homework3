const status = require('http-status-codes');

module.exports = (req, res, next) => {
  if (req.method === 'DELETE') {
    res.sendStatus(status.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
};
