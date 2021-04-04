const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const findHeader = (epochDate, dateValidation) => {
  let result = null;
  Object.keys(dateValidation).forEach((key) => {
    if (key.toLowerCase() === 'date-validation') {
      result = dateValidation[key];
    }
  });
  return result;
};

module.exports = (req, res, next) => {
  const ValidationHeader = findHeader('date-validation', req.headers);
  const ValidationQuery = findHeader('date-validation', req.query);

  if (ValidationHeader === null && ValidationQuery === null) {
    res.status(StatusCodes.UNAUTHORIZED).send('Both are invalid');
  } else if (ValidationHeader === null || ValidationQuery === null) {
    res.status(StatusCodes.UNAUTHORIZED).send('one is not invalid');
  } else {
    const TempHeader = Number.parseInt(ValidationHeader, 10);
    const TempQuery = Number.parseInt(ValidationQuery, 10);

    const ServerTime = Math.round(Date.now() / 1000);
    const EpochTime = TempHeader;
    if (TempHeader === TempQuery) {
      if (EpochTime > (ServerTime - 300) && EpochTime < (ServerTime + 300)) {
        req.dateValidation = EpochTime;
        req.serverTime = ServerTime;
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
  }
};
