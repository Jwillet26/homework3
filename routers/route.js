const status = require('http-status-codes');
const router = require('express').Router();
const coinflip = require('coinflip');

router.all('/', (request, response) => {
  if (coinflip()) {
    response.status(status.OK).send('Hello World');
  } else {
    throw new Error('Oops');
  }
});

module.exports = router;
