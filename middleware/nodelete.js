const status = require('http-status-codes');

module.exports = (request, response, next) => {
  if (request.method === 'DELETE') {
    response.sendStatus(status.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
};
