const winston = require('winston');

const winstonlogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = (req, res, next) => {
  winstonlogger.log({
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
