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
  const validationHeader = findHeader('date-validation', req.headers);
  const validationQuery = findHeader('date-validation', req.query);
  const serverTime = Math.round(Date.now() / 1000);
  let temp = 0;
  if (validationHeader === null && validationQuery === null) {
    res.status(StatusCodes.UNAUTHORIZED).send('Both header and query do not exist');
  } else if (validationHeader === null) {
    temp = Number.parseInt(validationQuery, 10);
    if ((temp >= (serverTime - 300)) && (temp <= (serverTime + 300))) {
      req.dateValidation = temp;
      req.serverTime = serverTime;
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Header epoch is out of spec');
    }
  } else if (validationQuery === null) {
    temp = Number.parseInt(validationHeader, 10);
    if ((temp >= (serverTime - 300)) && temp <= ((serverTime + 300))) {
      req.dateValidation = temp;
      req.serverTime = serverTime;
      next();
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send('Query is out of spec');
    }
  } else {
    const tempHeader = Number.parseInt(validationHeader, 10);
    const tempQuery = Number.parseInt(validationQuery, 10);
    if (tempHeader === tempQuery) {
      if ((tempHeader >= (serverTime - 300)) && (tempHeader <= (serverTime + 300))) {
        if ((tempQuery >= (serverTime - 300)) && (tempQuery <= (serverTime + 300))) {
          req.dateValidation = tempHeader;
          req.serverTime = serverTime;
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
