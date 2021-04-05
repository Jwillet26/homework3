const { StatusCodes } = require('http-status-codes');
const Router = require('express').Router();
const CoinFlip = require('coinflip');

Router.all('/', (request, response) => {
  if (CoinFlip()) {
    response.status(StatusCodes.OK).send('Hello World');
  } else {
    throw new Error('Oops');
  }
});

module.exports = Router;
