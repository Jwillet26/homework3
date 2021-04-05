const status = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  res.status(status.INTERNAL_SERVER_ERROR).send(`we're sorry, your error was: ${err.message}`);
};
