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
    time: req.time,
    method: req.method,
    body: req.body,
    query: req.query.params,
    headers: req.headers,
  });
  next();
};
