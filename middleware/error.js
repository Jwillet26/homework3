const status = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.status(status.INTERNAL_SERVER_ERROR).send(`Your error was: ${err.message}`);
};
