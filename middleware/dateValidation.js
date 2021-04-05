const { StatusCodes } = require('http-status-codes');

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
  const ServerTime = Math.round(Date.now() / 1000);
  let Temp = 0;
  if (ValidationHeader === null && ValidationQuery === null) {
    res.status(StatusCodes.UNAUTHORIZED).send('Both header and query are invalid');
  } else if (ValidationHeader === null) {
    Temp = Number.parseInt(ValidationQuery, 10);
    if ((Temp >= (ServerTime - 300)) && (Temp <= (ServerTime + 300))) {
      req.dateValidation = Temp;
      req.serverTime = ServerTime;
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Header epoch is out of spec');
    }
  } else if (ValidationQuery === null) {
    Temp = Number.parseInt(ValidationHeader, 10);
    if ((Temp >= (ServerTime - 300)) && Temp <= ((ServerTime + 300))) {
      req.dateValidation = Temp;
      req.serverTime = ServerTime;
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Query is out of spec');
    }
  } else {
    const TempHeader = Number.parseInt(ValidationHeader, 10);
    const TempQuery = Number.parseInt(ValidationQuery, 10);
    if (TempHeader === TempQuery) {
      if ((TempHeader >= (ServerTime - 300)) && (TempHeader <= (ServerTime + 300))) {
        if ((TempQuery >= (ServerTime - 300)) && (TempQuery <= (ServerTime + 300))) {
          req.dateValidation = TempHeader;
          req.serverTime = ServerTime;
          next();
        } else {
          res.status(StatusCodes.UNAUTHORIZED).send('Query is out of spec');
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).send('Header epoch is out of spec');
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Header and Query do not match');
    }
  }
};
