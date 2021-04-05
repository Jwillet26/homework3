const Winston = require('winston');

const winstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});

module.exports = (req, res, next) => {
  winstonLogger.log({
    level: 'info',
    serverTime: req.serverTime,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    query: req.query,
    headers: req.headers,
    dateValidation: req.dateValidation,
  });
  next();
};
